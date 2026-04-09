import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, CreditCard, ChevronDown, HelpCircle, Globe } from 'lucide-react';
import { load } from '@cashfreepayments/cashfree-js';

const pricingOptions = [
  {
    name: "Standard",
    price: { INR: "499", USD: "6" },
    period: "month",
    description: "Perfect for freelancers and individual developers.",
    features: [
      "Access to all 12+ themes",
      "1 Year of weekly updates",
      "Instant Lovable Themes remix link",
      "Personal license (1 project)",
      "Standard Discord support"
    ],
    buttonText: "Get Standard",
    highlight: true,
    popular: true
  },
  {
    name: "Enterprise",
    price: { INR: "3999", USD: "48" },
    period: "year",
    description: "The ultimate bundle for teams and agencies.",
    features: [
      "Everything in Standard",
      "Lifetime updates forever",
      "Commercial license (Unlimited projects)",
      "Dedicated Slack channel support",
      "Custom UI component design",
      "Figma design assets"
    ],
    buttonText: "Get Enterprise",
    highlight: false
  }
];

const faq = [
  { question: "What do I get with my purchase?", answer: "You will receive an instant remix link to quickly import all the themes and components directly into your Lovable Themes project, along with lifetime access to all future updates and templates." },
  { question: "Can I use themes for commercial work?", answer: "Yes! Both plans include commercial licenses. The Enterprise plan allows for unlimited projects." },
  { question: "Do you offer refunds?", answer: "We offer a 30-day money-back guarantee if you're not satisfied with the product quality." }
];

export const Pricing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  React.useEffect(() => {
    // Auto-detect if user is outside India to default to USD
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && !tz.includes('Calcutta') && !tz.includes('Kolkata') && !tz.includes('Asia/Colombo')) {
        setCurrency('USD');
      }
    } catch(e) {}
  }, []);

  const handlePayment = async (amount: number, selectedCurrency: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: selectedCurrency,
          customerId: `user_${Math.floor(Math.random() * 1000000)}`,
          customerPhone: "9999999999",
          customerEmail: "customer@example.com",
          returnUrl: window.location.origin
        })
      });

      const order = await response.json();

      if (!response.ok || !order.payment_session_id) {
        throw new Error(order.error || order.message || 'Failed to initialize payment session.');
      }

      const cashfree = await load({ mode: "production" });
      const checkoutOptions = {
        paymentSessionId: order.payment_session_id,
        redirectTarget: "_self",
      };
      await cashfree.checkout(checkoutOptions);
    } catch (error: any) {
      console.error('Payment failed:', error);
      alert(`Payment initialization failed: ${error.message || 'Please try again.'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-40 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-inter font-bold tracking-tight mb-8"
          >
            Invest in <span className="text-gradient font-instrument italic font-normal">Quality</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/50 max-w-2xl mx-auto mb-10"
          >
            Pay once, build forever. Transparent pricing with no hidden fees or monthly lock-ins.
          </motion.p>
          
          <div className="flex justify-center items-center gap-4">
            <div className="glass p-2 rounded-full inline-flex border border-white/10 items-center justify-center relative">
              <button 
                onClick={() => setCurrency('INR')}
                className={`relative px-6 py-2 rounded-full text-sm font-bold transition-colors z-10 ${currency === 'INR' ? 'text-dark' : 'text-white/50 hover:text-white'}`}
              >
                {currency === 'INR' && <motion.div layoutId="currency-pill" className="absolute inset-0 bg-white rounded-full -z-10" />}
                ₹ INR
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`relative px-6 py-2 rounded-full text-sm font-bold transition-colors z-10 ${currency === 'USD' ? 'text-dark' : 'text-white/50 hover:text-white'}`}
              >
                {currency === 'USD' && <motion.div layoutId="currency-pill" className="absolute inset-0 bg-white rounded-full -z-10" />}
                $ USD
              </button>
            </div>
            <p className="text-white/30 text-xs flex items-center gap-1"><Globe size={12}/> Auto-localized</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-40">
          {pricingOptions.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={plan.highlight ? "p-12 rounded-[4rem] bg-white text-dark shadow-3xl relative overflow-hidden" : "p-12 rounded-[4rem] glass border-white/10 relative overflow-hidden"}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-dark text-white px-6 py-2 rounded-bl-3xl font-black text-xs tracking-tighter">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={plan.highlight ? "text-dark/50 mb-8" : "text-white/50 mb-8"}>{plan.description}</p>
              
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-6xl md:text-8xl font-extrabold tracking-tighter">{currency === 'INR' ? '₹' : '$'}{plan.price[currency]}</span>
                <span className={plan.highlight ? "text-dark/40 text-xl" : "text-white/40 text-xl"}>/{plan.period}</span>
              </div>

              <div className="space-y-6 mb-16 text-left">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-4">
                    <div className={plan.highlight ? "w-6 h-6 rounded-full bg-dark/10 flex items-center justify-center flex-shrink-0" : "w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"}>
                      <Check className={plan.highlight ? "text-dark w-4 h-4" : "text-white w-4 h-4"} />
                    </div>
                    <span className={plan.highlight ? "text-dark font-medium" : "text-white font-medium"}>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handlePayment(parseInt(plan.price[currency]), currency)}
                disabled={isProcessing}
                className={plan.highlight ? "w-full bg-dark text-white py-6 rounded-3xl font-cabin font-black text-2xl" : "w-full bg-white text-dark py-6 rounded-3xl font-cabin font-black text-2xl"}
              >
                {isProcessing ? 'Processing...' : plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-white/50">Everything you need to know about our themes and licensing.</p>
          </div>
          
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="glass border-white/10 rounded-3xl p-8 group overflow-hidden transition-all hover:border-white/20">
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg marker:hidden">
                  {item.question}
                  <ChevronDown className="group-open:rotate-180 transition-transform text-white/50" />
                </summary>
                <p className="mt-6 text-white/50 leading-relaxed max-w-2xl">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
