import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

type Status = 'verifying' | 'success' | 'failed';

export const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>('verifying');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    if (!orderId) {
      setStatus('failed');
      setMessage('No order ID found. Please contact support.');
      return;
    }

    const verify = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/verify-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ orderId })
        });

        const data = await response.json();

        if (response.ok && data.isPaid) {
          // Update local user state to reflect paid status
          const stored = localStorage.getItem('user');
          if (stored) {
            const user = JSON.parse(stored);
            user.hasPaid = true;
            localStorage.setItem('user', JSON.stringify(user));
            window.dispatchEvent(new Event('storage'));
          }
          setStatus('success');
          setMessage('Payment confirmed! You now have full access to all remix links.');
        } else {
          setStatus('failed');
          setMessage(data.message || 'Payment could not be verified. If you were charged, please contact support.');
        }
      } catch {
        setStatus('failed');
        setMessage('Connection error during verification. Please try again or contact support.');
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[140px] rounded-full pointer-events-none transition-all duration-1000 ${
        status === 'success' ? 'bg-emerald-500/10' : status === 'failed' ? 'bg-red-500/10' : 'bg-white/5'
      }`} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-8">
          {status === 'verifying' && (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}>
              <Loader2 className="w-20 h-20 text-white/40" />
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <CheckCircle className="w-20 h-20 text-emerald-400" />
            </motion.div>
          )}
          {status === 'failed' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <XCircle className="w-20 h-20 text-red-400" />
            </motion.div>
          )}
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-inter font-bold mb-4">
          {status === 'verifying' && 'Verifying Payment'}
          {status === 'success' && 'You\'re In! 🎉'}
          {status === 'failed' && 'Payment Failed'}
        </h1>

        {/* Message */}
        <p className="text-white/50 text-lg mb-10 leading-relaxed">{message}</p>

        {/* CTA */}
        {status === 'success' && (
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 bg-white text-dark px-8 py-4 rounded-full font-cabin font-extrabold text-lg hover:scale-105 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Access Remix Links <ArrowRight className="w-5 h-5" />
          </Link>
        )}

        {status === 'failed' && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white text-dark px-8 py-4 rounded-full font-cabin font-extrabold text-lg hover:scale-105 transition-all"
            >
              Try Again
            </Link>
            <a
              href="mailto:support@clipconnect.in"
              className="inline-flex items-center justify-center gap-2 glass border-white/10 text-white px-8 py-4 rounded-full font-cabin font-bold text-lg hover:bg-white/10 transition-all"
            >
              Contact Support
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};
