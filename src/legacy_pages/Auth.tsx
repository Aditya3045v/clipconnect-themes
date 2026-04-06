import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/templates`
        }
      });
      if (googleError) throw googleError;
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) throw loginError;
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
        
        if (!data.session) {
          setError('Please check your email for the confirmation link.');
          setLoading(false);
          return;
        }
      }
      
      navigate('/templates');
    } catch (err: any) {
      if (err.message === 'Failed to fetch') {
        setError('Connection error: Please ensure your .env file has valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row overflow-hidden">
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-cabin"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-cabin"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-cabin"
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
                className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2"
              >
                <p>{error}</p>
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-dark py-4 rounded-xl font-bold mt-8 flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <hr className="w-full border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-dark/40 px-2 text-white/30 backdrop-blur-sm">Or continue with</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleAuth}
              className="w-full glass border-white/10 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>

            <div className="text-center">
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

      {/* Right Side: Cinematic Video BG */}
      <div className="hidden md:flex w-1/2 bg-black flex-col justify-center p-12 lg:p-20 relative">
        {/* Background Video Right Side */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260322_013248_a74099a8-be2b-4164-a823-eddd5e149fa1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-dark/10" />
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30">Trusted by 2k+ Users</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-6xl font-inter font-bold leading-tight text-white mb-8 max-w-md">
              Create viral content with <span className="text-secondary">premium themes.</span>
            </h2>
            
            <div className="space-y-6 max-w-lg">
              <div className="flex gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md">
                <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                <div>
                  <h3 className="font-bold text-white">One-time payment, lifetime access</h3>
                  <p className="text-white/50 text-sm">No recurring fees for individual templates. Buy once, use forever.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md">
                <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                <div>
                  <h3 className="font-bold text-white">Remix in one click</h3>
                  <p className="text-white/50 text-sm">Direct links to Remix. No complex setup or technical knowledge needed.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
