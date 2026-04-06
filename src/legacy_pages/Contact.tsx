import React from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Mail, Twitter, Github, Linkedin, MessageSquare } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-inter font-bold tracking-tight mb-8"
          >
            Let's <span className="text-gradient font-instrument italic font-normal">Connect</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/50 max-w-2xl mx-auto"
          >
            Have a question or need assistance? Reach out to our dedicated support team or join our community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-40">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="p-12 rounded-[4rem] glass border-white/10"
           >
              <h2 className="text-3xl font-bold mb-10">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition-all" />
                  <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition-all" />
                </div>
                <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition-all" />
                <textarea placeholder="Tell us about your project..." rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition-all"></textarea>
                <button type="submit" className="w-full bg-white text-dark py-5 rounded-2xl font-cabin font-black text-xl hover:bg-white/90 transition-all flex items-center justify-center gap-3">
                  <Send size={20} />
                  Send Message
                </button>
              </form>
           </motion.div>

           <div className="flex flex-col gap-8 justify-center">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-10 rounded-[3.5rem] glass border-white/10 flex items-center gap-8 group hover:border-white/20 transition-all"
              >
                  <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Mail className="text-blue-500" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-white/50 text-lg">support@lovable.com</p>
                  </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-10 rounded-[3.5rem] glass border-white/10 flex items-center gap-8 group hover:border-white/20 transition-all"
              >
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <MessageSquare className="text-emerald-500" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Discord Support</h3>
                    <p className="text-white/50 text-lg">discord.gg/lovable</p>
                  </div>
              </motion.div>

              <div className="flex justify-center md:justify-start gap-6 mt-8">
                 {[Twitter, Github, Linkedin].map((Icon, i) => (
                   <button key={i} className="w-14 h-14 rounded-2xl glass border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                      <Icon size={24} />
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
