import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { Cashfree, CFEnvironment } from 'cashfree-pg';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

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

// Initialize Supabase Admin (Service Role)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // === Template Remix Links (server-side only) ===
  const templateLinks: Record<string, string> = {
    // Initial links can go here or be set via admin API
  };

  // Helper to verify user and get paid status from Supabase
  const getUserProfile = async (authHeader: string | undefined) => {
    const token = authHeader?.split(' ')[1];
    if (!token) return { error: 'No token provided', status: 401 };

    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) return { error: 'Invalid token', status: 401 };

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('has_paid')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) return { error: 'Profile not found', status: 404 };

      return { user, hasPaid: profile.has_paid };
    } catch {
      return { error: 'Auth failed', status: 401 };
    }
  };

  // API Routes
  app.get('/api/auth/me', async (req, res) => {
    const { user, hasPaid, error, status } = await getUserProfile(req.headers.authorization);
    if (error) return res.status(status!).json({ error });
    res.json({ user: { email: user!.email, hasPaid } });
  });

  // Admin endpoint to set/update remix links
  app.post('/api/admin/set-links', (req, res) => {
    const secret = req.headers['x-admin-secret'];
    if (secret !== (process.env.ADMIN_SECRET || 'dev_admin_secret')) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { links } = req.body;
    if (!links || typeof links !== 'object') return res.status(400).json({ error: 'Invalid payload' });
    Object.assign(templateLinks, links);
    res.json({ success: true, count: Object.keys(templateLinks).length });
  });

  app.get('/api/templates', (req, res) => {
    res.json({ templates: Object.keys(templateLinks) });
  });

  // Secure remix link — requires valid Supabase JWT + hasPaid === true
  app.get('/api/secure-link', async (req, res) => {
    const { user, hasPaid, error, status } = await getUserProfile(req.headers.authorization);
    if (error) return res.status(status!).json({ error });

    if (!hasPaid) return res.status(403).json({ error: 'Premium access required. Please purchase a plan.' });

    const { template } = req.query;
    if (template) {
      const link = templateLinks[template as string];
      if (!link) return res.status(404).json({ error: 'Template link not yet available' });
      return res.json({ template, link });
    }
    res.json({ links: templateLinks });
  });

  app.post('/api/create-order', async (req, res) => {
    try {
      const { customerId, customerPhone, customerEmail, amount } = req.body;
      const { user } = await getUserProfile(req.headers.authorization);
      
      const request = {
        order_amount: amount || 499,
        order_currency: "INR",
        customer_details: {
          customer_id: user?.id || customerId || "guest",
          customer_phone: customerPhone || "9999999999",
          customer_email: user?.email || customerEmail || "test@example.com"
        },
        order_meta: {
          return_url: `${process.env.APP_URL || 'http://localhost:3000'}/payment-status?order_id={order_id}`
        }
      };

      const response = await cashfree.PGCreateOrder(request as any);
      
      // Store order mapping in Supabase for verification later
      if (user) {
        await supabase.from('orders').insert({
          id: response.data.order_id,
          user_id: user.id,
          amount: amount,
          status: 'PENDING'
        });
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
        // Find user by orderId
        const { data: orderRecord } = await supabase
          .from('orders')
          .select('user_id')
          .eq('id', orderId)
          .single();

        if (orderRecord) {
          // Update profile hasPaid status
          await supabase
            .from('profiles')
            .update({ has_paid: true })
            .eq('id', orderRecord.user_id);
          
          // Update order status
          await supabase
            .from('orders')
            .update({ status: 'SUCCESS' })
            .eq('id', orderId);
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
