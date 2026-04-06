import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        isScrolled ? "top-4" : "top-6"
      )}
    >
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Layout className="text-dark w-5 h-5" />
          </div>
          <span className="font-manrope font-bold text-lg tracking-tight">Lovable</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === item.path ? "text-white" : "text-white/70 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="hidden md:block text-sm font-medium text-white/70 hover:text-white">
                Log out
              </button>
              <Link to="/templates" className="bg-white text-dark px-5 py-2 rounded-full text-sm font-cabin font-bold hover:bg-white/90 transition-all active:scale-95">
                Remix Link
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:block text-sm font-medium text-white/70 hover:text-white">
                Log in
              </Link>
              <Link to="/pricing" className="bg-white text-dark px-5 py-2 rounded-full text-sm font-cabin font-bold hover:bg-white/90 transition-all active:scale-95">
                Get Started
              </Link>
            </>
          )}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 glass rounded-3xl p-6 md:hidden flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="text-lg font-medium text-white/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <hr className="border-white/10" />
            <Link to={isAuthenticated ? "/templates" : "/pricing"} onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center bg-white text-dark py-3 rounded-xl font-cabin font-bold">
              {isAuthenticated ? "Remix Link" : "Get Started"}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
