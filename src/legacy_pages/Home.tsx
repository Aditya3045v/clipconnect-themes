import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Users, DollarSign, BarChart3, MoreHorizontal, Check, CreditCard } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { load } from '@cashfreepayments/cashfree-js';

// --- Mock Data ---
const chartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const deals = [
  { id: 1, company: 'Acme Corp', status: 'Closed', amount: '$12,000' },
  { id: 2, company: 'Global Tech', status: 'In Progress', amount: '$8,500' },
  { id: 3, company: 'Starlight Inc', status: 'Lost', amount: '$4,200' },
];

const DashboardPreview = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="relative w-full max-w-5xl mx-auto mt-20 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl overflow-hidden glass"
    >
      <img 
        src="https://motionsites.ai/assets/hero-weblex-preview-BoIbrUHI.gif" 
        alt="Dashboard Preview" 
        className="w-full h-auto object-cover rounded-[2.5rem]" 
      />
    </motion.div>
  );
};

export const Home = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (amount: number) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          customerId: `user_${Math.floor(Math.random() * 1000000)}`,
          customerPhone: "9999999999",
          customerEmail: "customer@example.com"
        })
      });

      const order = await response.json();
      const cashfree = await load({ mode: "sandbox" });
      const checkoutOptions = {
        paymentSessionId: order.payment_session_id,
        redirectTarget: "_self",
      };
      await cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment flow is still being integrated in sandbox mode.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section with Video Background */}
      <section className="relative pt-52 pb-32 px-6 overflow-hidden min-h-screen flex items-center justify-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 bg-dark overflow-hidden flex items-center justify-center">
          {/* Fades to blend with rest of page */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark z-10 opacity-90" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-dark to-transparent z-10" />
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-dark to-transparent z-10" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 max-w-6xl mx-auto text-center -translate-y-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass mb-12 shadow-2xl border-white/10"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-white/20 overflow-hidden shadow-lg">
                  <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <span className="text-sm font-manrope font-bold text-white/90">
              Join +30,000 developers worldwide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-inter font-bold tracking-tight mb-8 leading-[1]"
          >
            Design <span className="font-instrument italic font-normal text-gradient">Masterpieces</span> <br />
            Effortlessly.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-16 font-manrope font-medium"
          >
            The world's most premium collection of dashboard kits, templates, and UI components built for developers who demand perfection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => handlePayment(499)}
              disabled={isProcessing}
              className="group relative bg-white text-dark px-6 md:px-10 py-4 md:py-5 rounded-full font-cabin font-extrabold text-lg md:text-xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_40px_rgba(255,255,255,0.2)] w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                {isProcessing ? 'Connecting...' : 'Get Full Access — ₹499/mo'}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => navigate('/templates')}
              className="px-6 md:px-10 py-4 md:py-5 rounded-full font-cabin font-bold text-lg md:text-xl glass hover:bg-white/10 transition-all border-white/20 w-full sm:w-auto"
            >
              Explore Library
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Dashboard - Pushing into Hero view */}
      <section className="relative z-30 -mt-40 mb-32 px-6">
        <DashboardPreview />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 px-6 bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">Unrivaled Performance.</h2>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">Every component is handcrafted with precision, optimized for speed, and tested across all major browsers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-amber-400" />,
                title: "Lightning Fast",
                desc: "Optimized for performance and SEO out of the box with zero boilerplate."
              },
              {
                icon: <Shield className="text-blue-400" />,
                title: "Secure by Design",
                desc: "Built with modern security best practices in mind, keeping your data safe."
              },
              {
                icon: <Users className="text-purple-400" />,
                title: "Team Ready",
                desc: "Collaborative features and multi-user support built-in for seamless scale."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[3rem] glass hover:border-white/20 transition-all group border-white/10"
              >
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {React.cloneElement(feature.icon as any, { size: 32 })}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-white/5 blur-[80px] md:blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8">Flexible Pricing. <br /> Unlimited Access.</h2>
          <p className="text-white/60 mb-12 md:mb-16 text-lg md:text-xl">Choose the plan that fits your scale.</p>

          <div className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] glass border-white/30 relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 bg-white text-dark px-6 md:px-10 py-2 md:py-3 rounded-bl-3xl md:rounded-bl-4xl font-black text-xs md:text-sm tracking-tighter">
              MOST POPULAR
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-white/50 font-black uppercase tracking-widest text-xs md:text-sm mb-4 md:mb-6">Standard Plan</span>
              <div className="flex items-baseline gap-2 mb-2 md:mb-3">
                <span className="text-5xl sm:text-6xl md:text-9xl font-extrabold tracking-tighter">₹499</span>
                <span className="text-white/40 text-lg md:text-2xl font-manrope">/month</span>
              </div>
              <p className="text-white/30 text-sm mb-8 md:mb-10">Save ₹2,000 with the annual plan — ₹3,999/yr</p>

              <div className="space-y-6 mb-16 text-left w-full max-w-sm mx-auto">
                {[
                  "Access to all 30+ Premium themes",
                  "Monthly new template drops",
                  "Commercial use license",
                  "24/7 Dedicated Discord support",
                  "Instant Lovable remix link"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="text-emerald-500 w-4 h-4" />
                    </div>
                    <span className="text-white/90 text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handlePayment(499)}
                disabled={isProcessing}
                className="w-full bg-white text-dark py-6 rounded-3xl font-cabin font-black text-2xl hover:bg-white/90 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl"
              >
                <CreditCard className="w-8 h-8" />
                {isProcessing ? 'Connecting...' : 'Get Access — ₹499/mo'}
              </button>
              <p className="mt-4 text-white/30 text-sm font-medium">Or save 33% — <button onClick={() => handlePayment(3999)} className="underline hover:text-white/60 transition-colors">get annual at ₹3,999/yr</button></p>
              <p className="mt-4 text-white/40 text-sm font-medium">100% Risk-Free. 30-Day Money Back Guarantee.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
