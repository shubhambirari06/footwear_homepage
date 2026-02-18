import React from 'react';
import { motion } from 'motion/react';

const categories = [
  {
    name: "Running Shoes",
    image: "https://images.unsplash.com/photo-1768647417374-5a31c61dc5d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBydW5uaW5nJTIwc2hvZXMlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3MTQxNDAxMHww&ixlib=rb-4.1.0&q=80&w=800",
    gridSpan: "col-span-1 md:col-span-2"
  },
  {
    name: "Sneakers",
    image: "https://images.unsplash.com/photo-1725271741216-743c37073437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2hpdGUlMjBzbmVha2VycyUyMGZhc2hpb258ZW58MXx8fHwxNzcxNDE0MDEwfDA&ixlib=rb-4.1.0&q=80&w=800",
    gridSpan: "col-span-1"
  },
  {
    name: "Formal Shoes",
    image: "https://images.unsplash.com/photo-1573498945275-98751e3f605f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBsdXh1cnklMjBmb3JtYWwlMjBsZWF0aGVyJTIwc2hvZXMlMjBicm93bnxlbnwxfHx8fDE3NzExMzkzOTd8MA&ixlib=rb-4.1.0&q=80&w=800",
    gridSpan: "col-span-1"
  },
  {
    name: "Sandals",
    image: "https://images.unsplash.com/photo-1625318880107-49baad6765fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc3VtbWVyJTIwbGVhdGhlciUyMHNhbmRhbHN8ZW58MXx8fHwxNzcxNDE0MDEwfDA&ixlib=rb-4.1.0&q=80&w=800",
    gridSpan: "col-span-1"
  },
  {
    name: "Boots",
    image: "https://images.unsplash.com/photo-1763661300203-aa3e2702f510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwbGVhdGhlciUyMGJvb3RzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzExMzkyOTN8MA&ixlib=rb-4.1.0&q=80&w=800",
    gridSpan: "col-span-1 md:col-span-2"
  },
  {
    name: "Kids Footwear",
    image: "https://images.unsplash.com/photo-1662822936696-8d741bd3f527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGtpZHMlMjBzbmVha2VycyUyMHBsYXlncm91bmR8ZW58MXx8fHwxNzcxNDE0MDEwfDA&ixlib=rb-4.1.0&q=80&w=800",
    gridSpan: "col-span-1 md:col-span-3"
  }
];

export const CategorySection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-amber-700 text-sm font-bold uppercase tracking-widest mb-2 block">Categories</span>
            <h2 className="text-4xl font-bold text-neutral-900 tracking-tight">Shop By Category</h2>
          </div>
          <p className="text-neutral-500 max-w-sm">
            Discover our curated selection of high-quality footwear designed for every aspect of your life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${category.gridSpan} group relative h-[300px] overflow-hidden rounded-lg cursor-pointer`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <h3 className="text-2xl font-bold text-white tracking-tight">{category.name}</h3>
                <span className="text-white/80 text-sm font-medium underline underline-offset-4 decoration-amber-500/0 group-hover:decoration-amber-500 transition-all duration-300">
                  Shop Now
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
