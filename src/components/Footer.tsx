import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const indianAddresses = [
  "Connaught Place, New Delhi - 110001",
  "Fort, Mumbai - 400001",
  "Indiranagar, Bangalore - 560038",
  "Banjara Hills, Hyderabad - 500034",
  "Sector 18, Noida - 201301",
];

const getRandomAddress = () => {
  return indianAddresses[Math.floor(Math.random() * indianAddresses.length)];
};

export const Footer: React.FC = () => {
  const [selectedAddress] = useState(getRandomAddress());

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .footer-section {
          animation: fadeInUp 0.6s ease-out;
        }

        .footer-link {
          position: relative;
          transition: all 0.3s ease;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #b45309, #d97706);
          transition: left 0.3s ease;
        }

        .footer-link:hover {
          color: #b45309;
          transform: translateX(4px);
        }

        .footer-link:hover::before {
          left: 100%;
        }

        .social-icon {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-icon:hover {
          transform: translateY(-4px) rotate(5deg);
        }

        .address-box {
          animation: slideInLeft 0.8s ease-out;
          transition: all 0.3s ease;
          position: relative;
          padding: 16px;
          border-radius: 8px;
          border-left: 3px solid #b45309;
        }

        .address-box:hover {
          background: #f5f5f4;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateX(4px);
        }

        .footer-divider {
          animation: slideInLeft 1s ease-out 0.2s both;
        }
      `}</style>

      <footer className="bg-white pt-24 pb-12 border-t border-neutral-100">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
          >
            {/* Company Info */}
            <motion.div 
              className="footer-section flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <a href="/" className="text-2xl font-bold tracking-tighter text-neutral-900 hover:text-amber-700 transition-colors">
                URBAN<span className="text-amber-700">STEPS</span>
              </a>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Redefining movement through exceptional footwear design. We combine premium materials with innovative technology to create shoes that empower every step of your journey.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/urbansteps" },
                  { Icon: Instagram, href: "https://www.instagram.com/urbansteps" },
                  { Icon: Twitter, href: "https://twitter.com/urbansteps" },
                  { Icon: Youtube, href: "https://www.youtube.com/urbansteps" }
                ].map(({ Icon, href }, index) => (
                  <motion.a 
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="social-icon p-2 bg-neutral-100 rounded-full text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-neutral-900">Shop</h4>
              <ul className="flex flex-col gap-4 text-sm text-neutral-500">
                {['Men\'s Collection', 'Women\'s Collection', 'Kids\' Collection', 'Sports Gear', 'New Arrivals', 'Sale & Clearance'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="footer-link hover:text-amber-700 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Support */}
            <motion.div 
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-neutral-900">Support</h4>
              <ul className="flex flex-col gap-4 text-sm text-neutral-500">
                {['Order Status', 'Shipping & Delivery', 'Returns & Exchanges', 'Size Guide', 'Payment Options', 'FAQs'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="footer-link hover:text-amber-700 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div 
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-neutral-900">Get In Touch</h4>
              <ul className="flex flex-col gap-4 text-sm text-neutral-500 space-y-4">
                <li className="flex items-start gap-3 address-box">
                  <MapPin size={18} className="text-amber-700 shrink-0 mt-0.5" />
                  <span>{selectedAddress}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-amber-700 shrink-0" />
                  <span>+91 8800 567 890</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-amber-700 shrink-0" />
                  <span>support@urbansteps.in</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-12 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6 footer-divider"
          >
            <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em]">
              © 2026 UrbanSteps India. All rights reserved. Built for quality.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map((link, index) => (
                <a key={index} href="#" className="text-[10px] text-neutral-400 uppercase tracking-wider footer-link hover:text-neutral-900">
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};