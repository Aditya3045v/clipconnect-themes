import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mail, Lock, ArrowRight, CheckCircle2, Star, Quote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Content Creator",
    content: "ClipConnect themes completely changed my workflow. I used to spend hours on design, now it's just minutes.",
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Sarah Chen",
    role: "Agency Owner",
    content: "The premium themes are worth every rupee. My clients are consistently impressed by the quality of my output.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "James Wilson",
    role: "Social Media Manager",
    content: "Fast, reliable, and stunning. The best investment I've made for my editing toolkit this year.",
    avatar: "https://i.pravatar.cc/150?u=james"
  }
];

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) throw loginError;

        // Fetch user profile for payment status
        const { data: profile } = await supabase
          .from('profiles')
          .select('has_paid')
          .eq('id', data.user.id)
          .single();

        localStorage.setItem('user', JSON.stringify({ 
          email: data.user.email, 
          hasPaid: profile?.has_paid || false 
        }));
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (signUpError) throw signUpError;
        
        localStorage.setItem('user', JSON.stringify({ 
          email: data.user?.email, 
          hasPaid: false 
        }));
        
        if (!data.session) {
          setError('Please check your email for the confirmation link.');
          setLoading(false);
          return;
        }
      }
      
      navigate('/templates');
      window.dispatchEvent(new Event('storage'));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row overflow-hidden italic-none">
      {/* Left Side: Auth & Video BG */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_143803_f635b644-d959-4f16-9d29-cedaeb5c6de0.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-dark/70 backdrop-blur-[2px]" />
        </div>

        <div className="absolute top-8 left-8 z-20">
          <Link to="/" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-inter font-bold tracking-tight text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-white/60">
              {isLogin ? 'Log in to manage your premium themes.' : 'Join 2,000+ creators building with ClipConnect.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass border-white/5 p-8 rounded-3xl shadow-2xl">
            <div className="space-y-5">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label className="block text-sm font-medium text-white/50 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs"
              >
                {error}
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-dark py-4 rounded-xl font-bold mt-8 flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="mt-6 text-center">
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/40 hover:text-white transition-colors text-sm"
              >
                {isLogin ? "New here? Create an account" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Right Side: User Stories & Testimonials */}
      <div className="hidden md:flex w-1/2 bg-white flex-col justify-between p-12 lg:p-20 relative">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none">
          <Quote className="w-64 h-64 text-dark" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-12">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-dark/10" />
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-dark/30">Trusted by 2k+ Users</p>
          </div>

          <h2 className="text-5xl font-inter font-bold leading-tight text-dark mb-8">
            Create high-converting content with <span className="text-secondary">premium themes.</span>
          </h2>
          
          <div className="space-y-6 max-w-lg">
            <div className="flex gap-4 p-4 rounded-2xl bg-dark/5 border border-dark/5">
              <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <h3 className="font-bold text-dark">One-time payment, lifetime access</h3>
                <p className="text-dark/50 text-sm">No recurring fees for individual templates. Buy once, use forever.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-dark/5 border border-dark/5">
              <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <h3 className="font-bold text-dark">Remix in one click</h3>
                <p className="text-dark/50 text-sm">Direct links to Remix. No complex setup or technical knowledge needed.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={isLogin ? 'login-test' : 'signup-test'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 rounded-[2.5rem] bg-dark text-white relative overflow-hidden"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />)}
                </div>
                <p className="text-lg font-medium leading-relaxed mb-6">
                  "{isLogin ? testimonials[0].content : testimonials[1].content}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={isLogin ? testimonials[0].avatar : testimonials[1].avatar} className="w-12 h-12 rounded-full" alt="avatar" />
                  <div>
                    <p className="font-bold">{isLogin ? testimonials[0].name : testimonials[1].name}</p>
                    <p className="text-white/40 text-sm">{isLogin ? testimonials[0].role : testimonials[1].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
