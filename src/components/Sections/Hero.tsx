import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen md:h-[600px] overflow-hidden bg-neutral-900 flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1653868250450-b83e6263d427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbGVhdGhlciUyMGZvb3R3ZWFyJTIwbGlmZXN0eWxlJTIwd2Fsa2luZyUyMGx1eHVyeXxlbnwxfHx8fDE3NzExMzgyMzl8MA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Premium Footwear"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/40" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-amber-700/80 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6"
          >
            New Collection 2025
          </motion.span>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Step Forward with
            <span className="text-amber-400 block">Confidence</span>
          </h1>

          <p className="text-xl text-neutral-200 mb-8 max-w-lg leading-relaxed">
            Discover the perfect blend of innovation, comfort, and style. Every step tells a story.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-amber-700 text-white font-bold rounded-lg hover:bg-amber-800 transition-all flex items-center gap-2"
            >
              Shop Now
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-bold rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
            >
              Explore Collection
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Scroll to explore</p>
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};
