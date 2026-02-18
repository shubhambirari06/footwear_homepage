import React from 'react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1710668908762-7a380246d98e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZW5kJTIwbHV4dXJ5JTIwc25lYWtlciUyMGJsYWNrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzExMzk3NDR8MA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Sports Promo"
          className="w-full h-full object-cover grayscale brightness-50"
        />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-16 text-white">
          <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Limited Time Offer</span>
          <h2 className="text-5xl font-bold mb-6 tracking-tighter leading-tight">
            Flat 30% Off on <br />
            <span className="italic font-light">Sports Collection</span>
          </h2>
          <p className="text-neutral-300 mb-10 text-lg">
            Elevate your training session with our high-performance gear. Use code <span className="text-white font-bold">SPEED2026</span> at checkout.
          </p>
          <button className="px-10 py-4 bg-white text-neutral-900 font-bold text-xs uppercase tracking-widest hover:bg-amber-100 transition-colors">
            Shop Sports Now
          </button>
        </div>
      </div>
    </section>
  );
};
