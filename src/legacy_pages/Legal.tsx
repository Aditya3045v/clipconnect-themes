import React from 'react';
import { motion } from 'motion/react';

const LegalLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="pt-40 pb-20 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-5xl md:text-8xl font-inter font-bold tracking-tight mb-16 text-center"
      >
        {title}
      </motion.h1>
      <div className="glass border-white/10 rounded-[3rem] p-12 md:p-20 prose prose-invert max-w-none text-white/50 text-lg leading-relaxed space-y-8">
        {children}
      </div>
    </div>
  </div>
);

export const Privacy = () => (
  <LegalLayout title="Privacy Policy">
    <p>Last updated: April 2026</p>
    <h2 className="text-2xl font-bold text-white">Introduction</h2>
    <p>Welcome to Lovable Themes. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.</p>
    <h2 className="text-2xl font-bold text-white">Data We Collect</h2>
    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data, Contact Data, Financial Data, and Transaction Data.</p>
    <h2 className="text-2xl font-bold text-white">How We Use Your Data</h2>
    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: where we need to perform the contract we are about to enter into or have entered into with you.</p>
  </LegalLayout>
);

export const Terms = () => (
  <LegalLayout title="Terms of Service">
    <p>Last updated: April 2026</p>
    <h2 className="text-2xl font-bold text-white">Terms of Use</h2>
    <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
    <h2 className="text-2xl font-bold text-white">License</h2>
    <p>Permission is granted to import a copy of the templates (remix link) directly into your personal Lovable account.</p>
    <h2 className="text-2xl font-bold text-white">Disclaimer</h2>
    <p>The materials on Lovable Themes's website are provided "as is". Lovable Themes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability.</p>
  </LegalLayout>
);

export const Refund = () => (
  <LegalLayout title="Refund Policy">
    <p>Last updated: April 2026</p>
    <h2 className="text-2xl font-bold text-white">30-Day Money Back Guarantee</h2>
    <p>If you're not satisfied with the product quality, you can request a full refund within 30 days of purchase.</p>
    <h2 className="text-2xl font-bold text-white">How to Request</h2>
    <p>To request a refund, please contact us at support@lovable.com with your order details. Once your request is received and inspected, we will notify you of the approval or rejection of your refund.</p>
    <h2 className="text-2xl font-bold text-white">Exceptions</h2>
    <p>Refunds are not available for users who have already cloned or remixed more than 5 distinct themes into their Lovable accounts or have shared their login credentials with unauthorized third parties.</p>
  </LegalLayout>
);
