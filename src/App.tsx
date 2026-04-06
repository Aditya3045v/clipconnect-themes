import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './legacy_pages/Home';
import { Features } from './legacy_pages/Features';
import { Pricing } from './legacy_pages/Pricing';
import { About } from './legacy_pages/About';
import { Contact } from './legacy_pages/Contact';
import { Templates } from './legacy_pages/Templates';
import { Privacy, Terms, Refund } from './legacy_pages/Legal';
import { Auth } from './legacy_pages/Auth';
import { PaymentStatus } from './legacy_pages/PaymentStatus';
import { AuthProvider, useAuth } from './lib/auth-context';

// ScrollToTop component to reset scroll position on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-dark text-white selection:bg-white selection:text-dark font-inter">
          <ConditionalNavbar />
          
          <main>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <ConditionalFooter />
      </div>
    </Router>
    </AuthProvider>
  );
}

const ConditionalNavbar = () => {
  const { pathname } = useLocation();
  const hideOn = ['/login', '/register'];
  if (hideOn.includes(pathname)) return null;
  return <Navbar />;
};

const ConditionalFooter = () => {
  const { pathname } = useLocation();
  const hideOn = ['/login', '/register'];
  if (hideOn.includes(pathname)) return null;
  return <Footer />;
};

export default App;
