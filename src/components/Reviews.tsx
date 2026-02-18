import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Alexander Reed",
    role: "Professional Runner",
    content: "The CloudRunner Pro series is a game changer. The support and responsiveness are unmatched by any other brand I've tried.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Fashion Designer",
    content: "Minimalist, elegant, and incredibly comfortable. I wear my Urban Sneakers to work and out for dinner. Truly versatile.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Architect",
    content: "Quality craftsmanship that you can feel. The leather formal shoes I bought are not only stylish but built to last years.",
    rating: 4
  }
];

export const Reviews: React.FC = () => {
  return (
    <section className="py-24 bg-white border-y border-neutral-100">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-amber-700 text-sm font-bold uppercase tracking-widest mb-3 block">Testimonials</span>
          <h2 className="text-4xl font-bold text-neutral-900 tracking-tight">Voices of Our Community</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((review, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-6 text-amber-700/20">
                <Quote size={40} fill="currentColor" />
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < review.rating ? "fill-amber-500 text-amber-500" : "text-neutral-200"} 
                  />
                ))}
              </div>
              <p className="text-neutral-600 italic mb-8 leading-relaxed">
                "{review.content}"
              </p>
              <div>
                <h4 className="font-bold text-neutral-900 uppercase tracking-widest text-sm">{review.name}</h4>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
