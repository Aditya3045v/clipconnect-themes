import React from 'react';
import { Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Layout className="text-dark w-5 h-5" />
          </div>
          <span className="font-manrope font-bold text-lg tracking-tight">Lovable</span>
        </Link>
        
        <div className="flex gap-8 text-sm text-white/40">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <p className="text-sm text-white/20">
          © 2026 Lovable Themes. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
