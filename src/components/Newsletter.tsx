import React from 'react';

export const Newsletter: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-900 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Join the Inner Circle</h2>
          <p className="text-neutral-400 mb-10 text-lg max-w-2xl mx-auto">
            Subscribe to receive updates on new arrivals, exclusive offers, and styling tips directly in your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow bg-white/10 border border-white/20 px-6 py-4 outline-none focus:border-amber-500 transition-colors text-white placeholder-white/50"
            />
            <button className="px-8 py-4 bg-amber-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-amber-600 transition-colors">
              Subscribe Now
            </button>
          </form>
          
          <p className="mt-6 text-[10px] text-neutral-500 uppercase tracking-widest">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </section>
  );
};
