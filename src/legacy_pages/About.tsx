import React from 'react';
import { motion } from 'motion/react';
import { Users, Shield, Zap, Layout } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-inter font-bold tracking-tight mb-8"
          >
            Built for <span className="text-gradient font-instrument italic font-normal">Developers</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/50 max-w-3xl mx-auto"
          >
            We're a small team of designers and developers obsessed with creating the world's most premium UI components and templates. 
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40 items-center">
          <div className="aspect-square glass rounded-[4rem] border-white/10 flex items-center justify-center p-12">
             <div className="w-full h-full rounded-[3.5rem] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center overflow-hidden">
                <Layout size={160} className="text-white/10" />
             </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-white/50 text-xl leading-relaxed mb-8">
              We started Lovable because we were tired of generic, bloated dashboard templates that were hard to customize and slow to load. We believe that professional tools should be beautiful, fast, and easy to use.
            </p>
            <p className="text-white/50 text-xl leading-relaxed">
              Our mission is to empower developers to build masterpieces effortlessly, providing the highest quality UI foundations so they can focus on their core business logic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Craftsmanship", desc: "Every pixel is placed with purpose. We don't cut corners." },
             { title: "Speed", desc: "No bloat. No useless dependencies. Just clean, optimized code." },
             { title: "Reliability", desc: "Tested in production environments globally by thousands of devs." }
           ].map((val, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-12 rounded-[3.5rem] glass border-white/10"
             >
                <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
                <p className="text-white/50 text-lg">{val.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};
