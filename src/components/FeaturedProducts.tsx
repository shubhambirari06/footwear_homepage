import React from 'react';
import { ProductCard, Product } from './ProductCard';
import { motion } from 'motion/react';

const products: Product[] = [
  {
    id: '1',
    name: "CloudRunner Pro Z1",
    price: 8999,
    rating: 5,
    image: "https://images.unsplash.com/photo-1768647417374-5a31c61dc5d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBydW5uaW5nJTIwc2hvZXMlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3MTQxNDAxMHww&ixlib=rb-4.1.0&q=80&w=800",
    category: "Running",
    isNew: true
  },
  {
    id: '2',
    name: "Classic Oxford Leather",
    price: 12450,
    rating: 4,
    image: "https://images.unsplash.com/photo-1573498945275-98751e3f605f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBsdXh1cnklMjBmb3JtYWwlMjBsZWF0aGVyJTIwc2hvZXMlMjBicm93bnxlbnwxfHx8fDE3NzExMzkzOTd8MA&ixlib=rb-4.1.0&q=80&w=800",
    category: "Formal"
  },
  {
    id: '3',
    name: "Minimalist Urban Sneaker",
    price: 6899,
    rating: 5,
    image: "https://images.unsplash.com/photo-1725271741216-743c37073437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBsdXh1cnklMjBmb3JtYWwlMjBsZWF0aGVyJTIwc2hvZXMlMjBicm93bnxlbnwxfHx8fDE3NzExMzkzOTd8MA&ixlib=rb-4.1.0&q=80&w=800",
    category: "Sneakers"
  },
  {
    id: '4',
    name: "Peak Performance Hiker",
    price: 15750,
    rating: 5,
    image: "https://images.unsplash.com/photo-1763661300203-aa3e2702f510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwbGVhdGhlciUyMGJvb3RzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzExMzkyOTN8MA&ixlib=rb-4.1.0&q=80&w=800",
    category: "Boots",
    isNew: true
  }
];

export const FeaturedProducts: React.FC<{ onViewAll?: () => void }> = ({ onViewAll }) => {
  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      alert('All products page coming soon!');
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes buttonGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(180, 83, 9, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(180, 83, 9, 0.6);
          }
        }

        .featured-container {
          animation: slideUp 0.8s ease-out;
        }

        .view-all-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .view-all-btn:hover {
          background-color: #1f2937;
          color: #fcd34d;
          animation: buttonGlow 1.5s ease-in-out infinite;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .view-all-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }

        .view-all-btn:hover::before {
          left: 100%;
        }
      `}</style>

      <section className="py-24 bg-neutral-50">
        <div className="container featured-container">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-amber-700 text-sm font-bold uppercase tracking-widest mb-3 block"
            >
              Selected for you
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold text-neutral-900 tracking-tight mb-4"
            >
              Featured Collection
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-20 h-1 bg-amber-700 mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <button 
              onClick={handleViewAll}
              className="px-12 py-4 border-2 border-neutral-900 text-neutral-900 font-bold text-xs uppercase tracking-widest view-all-btn"
            >
              View All Products
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};
