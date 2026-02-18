import { Product } from '../types/index';

export const CATEGORIES = [
  'Casual',
  'Sports',
  'Formal',
  'Ethnic',
  'Heels',
  'Sandals',
  'Flip Flops',
  'School Shoes',
];

export const FEATURED_CATEGORIES = [
  {
    name: 'Running Shoes',
    image:
      'https://images.unsplash.com/photo-1768647417374-5a31c61dc5d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBydW5uaW5nJTIwc2hvZXMlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3MTQxNDAxMHww&ixlib=rb-4.1.0&q=80&w=800',
    gridSpan: 'col-span-1 md:col-span-2',
  },
  {
    name: 'Boots',
    image:
      'https://images.unsplash.com/photo-1763661300203-aa3e2702f510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwbGVhdGhlciUyMGJvb3RzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzExMzkyOTN8MA&ixlib=rb-4.1.0&q=80&w=800',
    gridSpan: 'col-span-1 md:col-span-2',
  },
  {
    name: 'Sneakers',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    gridSpan: 'col-span-1',
  },
  {
    name: 'Sandals',
    image:
      'https://images.unsplash.com/photo-1609689589569-4b7ae0e45348?w=600&h=400&fit=crop',
    gridSpan: 'col-span-1',
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Nike Revolution Running Shoe',
    brand: 'Nike',
    price: 4999,
    description: 'Comfortable running shoe for everyday fitness. Lightweight and supportive.',
    image:
      'https://images.unsplash.com/photo-1768647417374-5a31c61dc5d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Men',
    category: 'Sports',
    isNew: true,
    rating: 4.5,
    stock: 45,
  },
  {
    id: 2,
    name: 'Adidas Ultraboost Pro',
    brand: 'Adidas',
    price: 12999,
    description: 'Premium running shoe with advanced cushioning technology for maximum comfort.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Men',
    category: 'Sports',
    isNew: true,
    rating: 4.7,
    stock: 32,
  },
  {
    id: 3,
    name: 'Casual Canvas Sneaker - White',
    brand: 'Puma',
    price: 3499,
    description: 'Classic white canvas sneaker perfect for everyday casual wear.',
    image:
      'https://images.unsplash.com/photo-1595341888016-d21b0ea51f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Men',
    category: 'Casual',
    rating: 4.3,
    stock: 78,
  },
  {
    id: 4,
    name: 'Formal Office Shoe - Black',
    brand: 'Lee Cooper',
    price: 6999,
    description: 'Elegant black formal shoe suitable for office and business occasions.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Men',
    category: 'Formal',
    rating: 4.4,
    stock: 25,
  },
  {
    id: 5,
    name: 'Gold Heel Pumps',
    brand: 'Clarks',
    price: 7999,
    description: 'Stylish gold heels perfect for parties and formal events.',
    image:
      'https://images.unsplash.com/photo-1609689589569-4b7ae0e45348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Women',
    category: 'Heels',
    isNew: true,
    rating: 4.6,
    stock: 18,
  },
  {
    id: 6,
    name: 'Women\'s Sports Running Shoe',
    brand: 'Nike',
    price: 5999,
    description: 'Lightweight and breathable running shoe designed for women athletes.',
    image:
      'https://images.unsplash.com/photo-1540639484905-3a97ed2f4450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Women',
    category: 'Sports',
    rating: 4.5,
    stock: 56,
  },
  {
    id: 7,
    name: 'Casual Loafers - Brown',
    brand: 'Woodland',
    price: 5499,
    description: 'Comfortable brown loafers for casual everyday wear.',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Women',
    category: 'Casual',
    rating: 4.2,
    stock: 42,
  },
  {
    id: 8,
    name: 'Kids School Shoe',
    brand: 'Bata',
    price: 1999,
    description: 'Durable school shoe for kids with proper support and comfort.',
    image:
      'https://images.unsplash.com/photo-1596521626265-47f5fcd02b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Kids',
    category: 'School Shoes',
    rating: 4.3,
    stock: 89,
  },
  {
    id: 9,
    name: 'Premium Leather Boots',
    brand: 'Timberland',
    price: 14999,
    description: 'Premium quality leather boots ideal for rough terrain and all-weather use.',
    image:
      'https://images.unsplash.com/photo-1763661300203-aa3e2702f510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Men',
    category: 'Formal',
    isNew: true,
    rating: 4.8,
    stock: 15,
  },
  {
    id: 10,
    name: 'Comfortable Flip Flop - Blue',
    brand: 'Paragon',
    price: 799,
    description: 'Lightweight and comfortable flip flop for casual beach wear.',
    image:
      'https://images.unsplash.com/photo-1604671828674-2ae418e43e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Men',
    category: 'Flip Flops',
    rating: 4.1,
    stock: 120,
  },
  {
    id: 11,
    name: 'Women\'s Formal Black Shoe',
    brand: 'Clarks',
    price: 7499,
    description: 'Elegant black formal shoe with premium comfort for women professionals.',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Women',
    category: 'Formal',
    rating: 4.6,
    stock: 28,
  },
  {
    id: 12,
    name: 'Ethnic Juttis - Gold',
    brand: 'Mojri',
    price: 2499,
    description: 'Traditional ethnic juttis with gold embroidery for special occasions.',
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Women',
    category: 'Ethnic',
    rating: 4.4,
    stock: 22,
  },
  {
    id: 13,
    name: 'Kids Sport Sneaker',
    brand: 'Nike',
    price: 3999,
    description: 'Fun and colorful sports sneaker designed for active kids.',
    image:
      'https://images.unsplash.com/photo-1596521626265-47f5fcd02b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Kids',
    category: 'Sports',
    isNew: true,
    rating: 4.5,
    stock: 54,
  },
  {
    id: 14,
    name: 'Comfortable Sandals',
    brand: 'Bata',
    price: 1499,
    description: 'Easy-to-wear sandals perfect for summers and casual outings.',
    image:
      'https://images.unsplash.com/photo-1604671828674-2ae418e43e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Women',
    category: 'Sandals',
    rating: 4.2,
    stock: 95,
  },
  {
    id: 15,
    name: 'Premium Casual Loafer',
    brand: 'Skechers',
    price: 6499,
    description: 'Premium loafer with memory foam for ultimate comfort in casual settings.',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    gender: 'Men',
    category: 'Casual',
    rating: 4.5,
    stock: 38,
  },
];
