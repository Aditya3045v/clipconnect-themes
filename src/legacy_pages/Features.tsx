import React from 'react';
import { motion } from 'motion/react';
import { Layout, Zap, Shield, Users, BarChart3, TrendingUp, DollarSign, Database, Move } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      title: "Real-time Monitoring",
      desc: "Watch your business metrics move in real-time with our WebSocket-powered dashboard components.",
      icon: <TrendingUp className="text-blue-500" />,
      color: "blue"
    },
    {
      title: "Dynamic Visualizations",
      desc: "Beautiful, interactive charts powered by Recharts, fully customizable and responsive by default.",
      icon: <BarChart3 className="text-purple-500" />,
      color: "purple"
    },
    {
      title: "Secure Authentication",
      desc: "Pre-built Auth flows with Supabase, Clerk, and NextAuth. Manage users with enterprise-grade security.",
      icon: <Shield className="text-emerald-500" />,
      color: "emerald"
    },
    {
      title: "Ultra-Light Performance",
      desc: "Blazing fast load times with zero layout shift, ensuring the best possible UX for your end users.",
      icon: <Zap className="text-amber-500" />,
      color: "amber"
    },
    {
      title: "Modular Architecture",
      desc: "Easily swap components and styles thanks to our Atomic Design philosophy and Tailwind CSS.",
      icon: <Layout className="text-indigo-500" />,
      color: "indigo"
    },
    {
      title: "Scalable Data Handling",
      desc: "Efficiently handle thousands of rows of data with our virtualization and pagination utilities.",
      icon: <Database className="text-rose-500" />,
      color: "rose"
    }
  ];

  return (
    <div className="pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-inter font-bold tracking-tight mb-8"
          >
            Capabilities That <span className="text-gradient font-instrument italic font-normal">Scale</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/50 max-w-2xl mx-auto"
          >
            Everything you need to build production-ready dashboards in days, not months.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] glass border-white/10 group hover:border-white/20 transition-all"
            >
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {React.cloneElement(feature.icon as any, { size: 32 })}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed text-lg">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature Showcase 1 */}
        <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block">Modern Stack</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Fully Typed Architecture.</h2>
            <p className="text-white/50 text-xl leading-relaxed mb-8">
              Built with TypeScript first, providing the best developer experience. Catch bugs early and enjoy full IDE support.
            </p>
            <ul className="space-y-4">
              {["Full TypeScript support", "Customizable theme tokens", "Optimized production builds"].map(item => (
                <li key={item} className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Move className="text-blue-500 w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-[3rem] glass border-white/10 aspect-square flex items-center justify-center">
            <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Database size={120} className="text-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
