import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers, Lock, Unlock, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth-context';

const categories = ["All", "Dashboards", "SaaS", "E-commerce", "Portfolio", "Marketing"];

const templates = [
  { name: "Background Gallery", category: "SaaS", image: "/templates/background-gallery.png" },
  { name: "Michael Smith Portfolio", category: "Portfolio", image: "/templates/michael-smith-portfolio.png" },
  { name: "Radiant", category: "Marketing", image: "/templates/radiant.png" },
  { name: "Forma.co", category: "SaaS", image: "/templates/forma-co.png" },
  { name: "Electric", category: "Dashboards", image: "/templates/electric.png" },
  { name: "Documentation", category: "SaaS", image: "/templates/documentation.jpg" },
  { name: "Strat", category: "Marketing", image: "/templates/strat.png" },
  { name: "Wealth Builder", category: "E-commerce", image: "/templates/wealth-builder.jpg" },
  { name: "Codezilla", category: "SaaS", image: "/templates/codezilla.jpg" },
  { name: "AI Automation", category: "SaaS", image: "/templates/ai-automation.jpg" },
  { name: "Analytics Platform", category: "Dashboards", image: "/templates/analytics-platform.jpg" },
  { name: "Nexora", category: "Marketing", image: "/templates/nexora.png" },
  { name: "Next Level Innovation", category: "Marketing", image: "/templates/next-level-innovation.png" },
  { name: "Ship Products", category: "E-commerce", image: "/templates/ship-products.png" },
  { name: "Full Agency Template", category: "Marketing", image: "/templates/full-agency-template.png" },
  { name: "Platform Rocket", category: "SaaS", image: "/templates/platform-rocket.png" },
  { name: "Design Rocket", category: "Portfolio", image: "/templates/design-rocket.png" },
  { name: "Datacore", category: "Dashboards", image: "/templates/datacore.png" },
  { name: "MotionAI", category: "Marketing", image: "/templates/motionai.png" },
  { name: "Vertex Template", category: "Marketing", image: "/templates/vertex-template.png" },
  { name: "Prism", category: "Dashboards", image: "/templates/prism.jpg" },
  { name: "Insight", category: "Dashboards", image: "/templates/insight.jpg" },
  { name: "Forge", category: "SaaS", image: "/templates/forge.png" },
  { name: "Lumen", category: "Marketing", image: "/templates/lumen.png" },
  { name: "Nebula Glow", category: "Marketing", image: "/templates/nebula-glow.png" },
  { name: "BuildAI", category: "SaaS", image: "/templates/buildai.png" },
  { name: "Nova Template", category: "Marketing", image: "/templates/nova-template.png" },
  { name: "Glow", category: "Marketing", image: "/templates/glow.png" },
  { name: "E-commerce System", category: "E-commerce", image: "/templates/e-commerce-system.png" },
  { name: "Shift", category: "Marketing", image: "/templates/shift.png" },
  { name: "Simple Start", category: "Marketing", image: "/templates/simple-start.png" },
  { name: "Neon", category: "Marketing", image: "/templates/neon.png" },
  { name: "Agency Template", category: "Marketing", image: "/templates/agency-template.png" },
  { name: "Maestro Vision", category: "Marketing", image: "/templates/maestro-vision.png" },
  { name: "Converse", category: "Portfolio", image: "/templates/converse.png" },
  { name: "Motion Portfolio", category: "Portfolio", image: "/templates/motion-portfolio.png" },
  { name: "Design Rocket Motion", category: "Marketing", image: "/templates/design-rocket-motion.jpg" },
  { name: "Serein - Minimal Hero", category: "Marketing", image: "/templates/serein-minimal-hero.png" }
];

export const Templates = () => {
  const { user, profile } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleRemix = async (templateName: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!profile?.has_paid) {
      navigate('/pricing');
      return;
    }

    setIsProcessing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      
      const response = await fetch(`/api/secure-link?template=${encodeURIComponent(templateName)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        window.open(data.link, '_blank');
      } else if (response.status === 404) {
        alert(`The remix link for "${templateName}" is coming soon. Check back shortly!`);
      } else {
        alert("Unexpected error fetching secure link.");
      }
    } catch {
      alert("Failed to fetch secure link. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section with Video */}
      <section className="relative pt-40 pb-32 px-6 min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-dark overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-dark/50 z-10 opacity-70" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dark via-dark/80 to-transparent z-10" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark to-transparent z-10" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_074327_a4d6275d-82d9-4c83-bfbe-f1fb2213c17c.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto text-center w-full">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-inter font-bold tracking-tight mb-6 md:mb-8"
          >
            A Universe of <span className="text-gradient font-instrument italic font-normal">Themes</span>.
          </motion.h1>
          <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-10 md:mb-16">
            Access the world's most comprehensive library of premium components and templates. Built for performance.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all border ${
                  activeCategory === category 
                    ? "bg-white text-dark border-white" 
                    : "bg-white/5 backdrop-blur-md text-white/70 border-white/20 hover:border-white/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 pb-20 -mt-10 md:-mt-20">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
          {filteredTemplates.map((template, i) => (
            <motion.div
              layout
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group glass border-white/10 rounded-[3rem] overflow-hidden hover:border-white/30 transition-all flex flex-col p-2 h-full relative"
            >
               <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-8">
                  <img src={template.image} alt={template.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-dark/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center pointer-events-none group-hover:pointer-events-auto">
                    {!profile?.has_paid ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 border border-white/20">
                          <Lock size={24} className="text-secondary" />
                        </div>
                        <h4 className="font-bold text-white text-lg">Premium Template</h4>
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate('/pricing'); }}
                          className="bg-secondary text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                        >
                          <CreditCard size={16} />
                          Unlock Now
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRemix(template.name); }}
                        disabled={isProcessing}
                        className="bg-white text-dark px-8 py-3 rounded-full font-bold hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        <Unlock size={20} />
                        {isProcessing ? 'Processing...' : 'Remix Template'}
                      </button>
                    )}
                  </div>

                  <div className="absolute top-6 right-6">
                    <span className="bg-white/10 backdrop-blur-md text-white/70 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">{template.category}</span>
                  </div>
               </div>

               <div className="px-10 pb-10">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors">{template.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/30 font-medium text-sm">
                      <Layers size={16} />
                      <span>Next.js + Vite</span>
                    </div>
                    
                    {profile?.has_paid ? (
                      <button
                        onClick={() => handleRemix(template.name)}
                        className="text-secondary font-bold text-sm flex items-center gap-2"
                      >
                        Remix <ArrowRight size={14} />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-white/20 text-xs font-bold uppercase tracking-wider">
                        <Lock size={12} />
                        Locked
                      </div>
                    )}
                  </div>
               </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-32 md:mt-40 p-10 md:p-20 glass border-white/10 rounded-[3rem] md:rounded-[4rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 -z-10" />
          <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 text-white">Can't Find What You Need?</h2>
          <p className="text-lg md:text-xl text-white/50 mb-10 md:mb-12 max-w-2xl mx-auto">We build custom templates for enterprise clients. Let's discuss your specific requirements.</p>
          <button className="bg-white text-dark px-10 py-5 rounded-full font-inter font-extrabold text-xl hover:scale-105 transition-all shadow-2xl">
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};
