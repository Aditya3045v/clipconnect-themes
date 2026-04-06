import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Menu, X, LogOut, User, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/auth-context';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Templates', path: '/templates' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-300",
        isScrolled ? "top-4 scale-[0.98]" : "top-6"
      )}
    >
      <div className={cn(
        "glass rounded-full px-6 py-3 flex items-center justify-between border border-white/10 transition-all shadow-2xl",
        isScrolled && "bg-dark/80 backdrop-blur-2xl"
      )}>
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Layout className="text-dark w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-inter font-extrabold text-white text-lg tracking-tight leading-none">Lovable Themes</span>
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mt-0.5">Premium Marketplace</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                location.pathname === item.path ? "text-white" : "text-white/50 hover:text-white"
              )}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {profile?.has_paid && (
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest animate-pulse">
                  <Sparkles size={10} />
                  Premium
                </div>
              )}
              <div className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-default">
                <User size={16} />
                <span className="text-xs font-medium max-w-[100px] truncate">{user.email}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="p-2.5 rounded-xl glass hover:bg-white/10 text-white/50 hover:text-red-400 transition-all group"
                title="Sign Out"
              >
                <LogOut size={18} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden md:block text-sm font-bold text-white/50 hover:text-white transition-colors">
                Log in
              </Link>
              <Link to="/pricing" className="bg-white text-dark px-6 py-2.5 rounded-full text-sm font-inter font-extrabold hover:bg-white/90 transition-all active:scale-95 shadow-xl">
                Get Started
              </Link>
            </>
          )}
          <button 
            className="md:hidden text-white w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 glass rounded-[2.5rem] p-8 border border-white/10 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={cn(
                    "text-2xl font-bold transition-colors",
                    location.pathname === item.path ? "text-white" : "text-white/40"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-white/10" />
              {user ? (
                <div className="space-y-4">
                   <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                      <User className="text-white/40" size={20} />
                      <span className="text-white font-medium truncate">{user.email}</span>
                   </div>
                   <button onClick={handleLogout} className="w-full text-center text-red-400 font-bold py-4 rounded-2xl border border-red-500/10 hover:bg-red-500/5 transition-all">
                      Sign Out
                   </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-center glass rounded-2xl font-bold">Log In</Link>
                  <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-center bg-white text-dark rounded-2xl font-bold">Join Now</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
