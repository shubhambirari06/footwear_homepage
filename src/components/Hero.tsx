import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToFeatured = () => {
    const element = document.getElementById('featured-products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCategories = () => {
    const element = document.getElementById('categories-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-neutral-100">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1653868250450-b83e6263d427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbGVhdGhlciUyMGZvb3R3ZWFyJTIwbGlmZXN0eWxlJTIwd2Fsa2luZyUyMGx1eHVyeXxlbnwxfHx8fDE3NzExMzgyMzl8MA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Premium Footwear Lifestyle"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-neutral-900/30" />
      </div>

      <div className="container relative z-10 h-full flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <span className="inline-block px-3 py-1 bg-amber-700/90 text-[10px] font-bold uppercase tracking-widest mb-6">
            New Collection 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Walk With <br />
            <span className="text-amber-100 italic">Confidence</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-neutral-100 font-light max-w-lg">
            Experience the perfect blend of timeless craftsmanship and modern innovation. Designed for those who never stop moving.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button onClick={scrollToCategories} className="px-10 py-4 bg-neutral-900 text-white font-medium text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all transform hover:-translate-y-1">
              Shop Now
            </button>
            <button onClick={scrollToFeatured} className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-medium text-sm uppercase tracking-widest hover:bg-white/20 transition-all transform hover:-translate-y-1 flex items-center gap-2">
              Explore Collection <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/60 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
};
