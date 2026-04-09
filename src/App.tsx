import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
const Home = React.lazy(() => import('./legacy_pages/Home').then(m => ({ default: m.Home })));
const Features = React.lazy(() => import('./legacy_pages/Features').then(m => ({ default: m.Features })));
const Pricing = React.lazy(() => import('./legacy_pages/Pricing').then(m => ({ default: m.Pricing })));
const About = React.lazy(() => import('./legacy_pages/About').then(m => ({ default: m.About })));
const Contact = React.lazy(() => import('./legacy_pages/Contact').then(m => ({ default: m.Contact })));
const Templates = React.lazy(() => import('./legacy_pages/Templates').then(m => ({ default: m.Templates })));
const Privacy = React.lazy(() => import('./legacy_pages/Legal').then(m => ({ default: m.Privacy })));
const Terms = React.lazy(() => import('./legacy_pages/Legal').then(m => ({ default: m.Terms })));
const Refund = React.lazy(() => import('./legacy_pages/Legal').then(m => ({ default: m.Refund })));
const PricingAndServices = React.lazy(() => import('./legacy_pages/Legal').then(m => ({ default: m.PricingAndServices })));
const Auth = React.lazy(() => import('./legacy_pages/Auth').then(m => ({ default: m.Auth })));
const PaymentStatus = React.lazy(() => import('./legacy_pages/PaymentStatus').then(m => ({ default: m.PaymentStatus })));
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
            <React.Suspense fallback={<div className="min-h-screen bg-dark flex items-center justify-center text-white/50">Loading...</div>}>
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
                <Route path="/pricing-services" element={<PricingAndServices />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Auth />} />
                <Route path="/payment-status" element={<PaymentStatus />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </React.Suspense>
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
