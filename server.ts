import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { Cashfree, CFEnvironment } from 'cashfree-pg';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Cashfree
const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID || "TEST10416954f9640478643809051845961401",
  process.env.CASHFREE_SECRET_KEY || "cfsk_ma_test_45348981440097103890251145_30026600",
  null, null, null, false // Disabling sentry for local dev
);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // === Mock DB ===
  const JWT_SECRET = process.env.JWT_SECRET || 'lovable_themes_secret';
  const users: any[] = [];
  const orders: any[] = []; // map orderId -> userId

  // API Routes
  app.post('/api/auth/register', (req, res) => {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already exists' });
    const user = { id: `u_${Date.now()}`, email, password, hasPaid: false };
    users.push(user);
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ token, user: { email: user.email, hasPaid: user.hasPaid } });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ token, user: { email: user.email, hasPaid: user.hasPaid } });
  });

  app.get('/api/auth/me', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = users.find(u => u.id === decoded.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ user: { email: user.email, hasPaid: user.hasPaid } });
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  });

  // === Template Remix Links (server-side only — never exposed before auth+payment check) ===
  // Populated via POST /api/admin/set-links with ADMIN_SECRET header
  const templateLinks: Record<string, string> = {};

  // Admin endpoint to set/update remix links (protected by ADMIN_SECRET env var)
  app.post('/api/admin/set-links', (req, res) => {
    const secret = req.headers['x-admin-secret'];
    if (secret !== (process.env.ADMIN_SECRET || 'dev_admin_secret')) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { links } = req.body; // { "Background Gallery": "https://lovable.dev/app/remix/...", ... }
    if (!links || typeof links !== 'object') return res.status(400).json({ error: 'Invalid payload' });
    Object.assign(templateLinks, links);
    res.json({ success: true, count: Object.keys(templateLinks).length });
  });

  // Get all template names (no links) — safe for unauthenticated users to see the catalog
  app.get('/api/templates', (req, res) => {
    res.json({ templates: Object.keys(templateLinks) });
  });

  // Secure remix link — requires valid JWT + hasPaid === true
  app.get('/api/secure-link', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { template } = req.query; // optional: specific template name
    
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = users.find(u => u.id === decoded.id);
      
      if (!user) return res.status(401).json({ error: 'User not found' });
      if (!user.hasPaid) return res.status(403).json({ error: 'Premium access required. Please purchase a plan.' });
      
      // Return specific template link or indicate all are accessible
      if (template) {
        const link = templateLinks[template as string];
        if (!link) return res.status(404).json({ error: 'Template link not yet available' });
        return res.json({ template, link });
      }
      
      // Return all links if no specific template requested
      res.json({ links: templateLinks });
    } catch {
      res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
    }
  });

  app.post('/api/create-order', async (req, res) => {
    try {
      const { customerId, customerPhone, customerEmail, amount } = req.body;
      const token = req.headers.authorization?.split(' ')[1];
      let userId = null;
      if (token) {
        try {
           const decoded: any = jwt.verify(token, JWT_SECRET);
           userId = decoded.id;
        } catch {}
      }

      const request = {
        order_amount: amount || 299,
        order_currency: "INR",
        customer_details: {
          customer_id: customerId || "user_123",
          customer_phone: customerPhone || "9999999999",
          customer_email: customerEmail || "test@example.com"
        },
        order_meta: {
          return_url: `${process.env.APP_URL || 'http://localhost:3000'}/payment-status?order_id={order_id}`
        }
      };

      // API version "2023-08-01" is used internally, PGCreateOrder takes the request object
      const response = await cashfree.PGCreateOrder(request as any);
      
      // Store order mapping
      if (userId) {
        orders.push({ orderId: response.data.order_id, userId });
      }

      res.json(response.data);
    } catch (error: any) {
      console.error('Cashfree Error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  app.post('/api/verify-order', async (req, res) => {
    try {
      const { orderId } = req.body;
      const response = await cashfree.PGOrderFetchPayments("2023-08-01", orderId);
      
      // Look for a SUCCESS payment
      const payments = response.data;
      const isPaid = payments?.some((p: any) => p.payment_status === "SUCCESS");

      if (isPaid) {
        const orderRecord = orders.find(o => o.orderId === orderId);
        if (orderRecord) {
          const user = users.find(u => u.id === orderRecord.userId);
          if (user) user.hasPaid = true;
        }
      }
      res.json({ success: true, isPaid });
    } catch (error: any) {
      console.error('Payment verify error:', error.message);
      res.status(500).json({ error: 'Verification failed' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
