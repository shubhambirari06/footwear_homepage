import React from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { motion } from 'motion/react';
import { APP_CONFIG } from '../../config/app.config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      "Men's Collection",
      "Women's Collection",
      "Kids' Collection",
      'New Arrivals',
      'Sale',
    ],
    Support: ['Track Order', 'Returns', 'FAQ', 'Size Guide', 'Contact Us'],
    Company: ['About Us', 'Careers', 'Blog', 'Press', 'Sustainability'],
    Legal: ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', 'Refund Policy'],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: 'Connaught Place, New Delhi - 110001',
    },
    { icon: Phone, label: 'Phone', value: '+91 8800 567 890' },
    { icon: Mail, label: 'Email', value: 'support@urbansteps.in' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">URBAN</span>
              <span className="text-amber-500">STEPS</span>
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Premium footwear designed for every step of your journey. Quality, comfort, and
              style in every pair.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2, y: -4 }}
                  className="p-2 bg-neutral-800 rounded-full text-neutral-400 hover:text-amber-500 hover:bg-amber-500/20 transition-all"
                  title={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-neutral-400 text-sm hover:text-amber-500 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-neutral-800"
        >
          {contactInfo.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <Icon className="text-amber-500 mt-1 shrink-0" size={20} />
              <div>
                <p className="text-sm text-neutral-400 mb-1">{label}</p>
                <p className="text-white font-medium">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-400 text-sm"
        >
          <p>© {currentYear} {APP_CONFIG.APP_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a
                key={link}
                href="#"
                className="hover:text-amber-500 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
