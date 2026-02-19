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
      'https://images.unsplash.com/photo-1768647417374-5a31c61dc5d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    gridSpan: 'col-span-1 md:col-span-2',
  },
  {
    name: 'Boots',
    image:
      'https://images.unsplash.com/photo-1763661300203-aa3e2702f510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
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

// Comprehensive product descriptions for realistic e-commerce data
const menDescriptions: Record<string, string[]> = {
  'Casual': [
    'Comfortable everyday casual shoe with breathable fabric and premium comfort cushioning',
    'Modern design casual sneaker perfect for street style and urban fashion',
    'Lightweight casual shoe for all-day comfort with responsive sole technology',
    'Premium casual footwear with enhanced arch support and durable construction',
    'Classic casual shoe with superior grip sole and long-lasting durability',
    'Sporty casual sneaker with responsive cushioning and breathable mesh lining',
    'Elegant casual shoe for professional settings with timeless design appeal',
    'Urban casual footwear with contemporary design and advanced materials',
  ],
  'Sports': [
    'High-performance running shoe with advanced cushioning technology and ankle support',
    'Professional training shoe for intense workouts with superior grip and stability',
    'Basketball shoe with ankle support and advanced grip technology for courts',
    'Running shoe designed for distance and speed with responsive midsole',
    'Cross-training shoe perfect for multiple workout types and fitness activities',
    'Athletic shoe with responsive midsole technology and breathable upper design',
    'Performance shoe for outdoor sports with waterproof and durable materials',
    'Lightweight athletics shoe designed for track and field competitions',
  ],
  'Formal': [
    'Classic formal shoe perfect for business occasions and corporate settings',
    'Premium leather formal shoe crafted for professional environments',
    'Elegant formal footwear designed for special occasions and formal events',
    'Sophisticated oxford shoe in rich brown leather with premium finishing',
    'Professional formal shoe with superior comfort for all-day wear',
    'Classic formal loafer perfect for business wear and formal gatherings',
    'Formal dress shoe with handcrafted details and premium leather construction',
    'Premium formal shoe with Italian leather and expert craftsmanship',
  ],
  'Sandals': [
    'Comfortable sandal with ergonomic design and cushioned footbed for all-day wear',
    'Lightweight sandal perfect for casual wear with breathable design',
    'Durable sandal with cushioned footbed and non-slip sole technology',
    'Water-friendly sandal perfect for beach and pool activities',
    'Casual sandal with stylish design and comfortable fit',
    'Comfortable slide sandal for everyday use with premium materials',
    'Premium sandal with excellent arch support and orthopedic design',
    'Breathable sandal perfect for summer wear with quick-dry properties',
  ],
  'Flip Flops': [
    'Lightweight flip flop for casual comfort with soft cushioned footbed',
    'Durable flip flop with premium soft sole and long-lasting materials',
    'Casual flip flop perfect for beach and poolside activities',
    'Comfortable flip flop for everyday wear with ergonomic design',
    'Premium flip flop with enhanced cushioning and arch support features',
    'Water-friendly flip flop ideal for pool and beach use',
    'Stylish flip flop with modern design and comfortable fit',
    'Comfort flip flop with non-slip sole and quick-dry capabilities',
  ],
  'Ethnic': [
    'Traditional ethnic shoe handcrafted with quality materials and authentic design',
    'Authentic ethnic footwear perfect for cultural occasions and celebrations',
    'Premium ethnic shoe designed for special celebrations and weddings',
    'Traditional design ethnic shoe with elegant and intricate details',
    'Formal ethnic footwear perfect for traditional wear and festivals',
    'Classic ethnic shoe crafted with authentic materials and techniques',
    'Premium ethnic footwear with traditional craftsmanship and style',
    'Elegant ethnic shoe with intricate embellishments and cultural authenticity',
  ],
};

const womenDescriptions: Record<string, string[]> = {
  'Casual': [
    'Trendy casual sneaker perfect for everyday wear and street fashion',
    'Comfortable casual shoe with stylish design and premium cushioning',
    'Modern casual footwear with excellent comfort and contemporary style',
    'Elegant casual shoe perfect for professional and casual settings',
    'Lightweight casual sneaker designed for active lifestyle and comfort',
    'Stylish casual shoe with contemporary design and fashion appeal',
    'Premium casual footwear with enhanced cushioning and breathable materials',
    'Versatile casual shoe perfect for any occasion with timeless design',
  ],
  'Sports': [
    'High-performance running shoe designed specifically for women athletes',
    'Professional training shoe perfect for gym workouts and fitness activities',
    'Lightweight sports shoe with responsive cushioning and ankle support',
    'Athletic shoe designed for intense sports activities and workouts',
    'Yoga and fitness shoe with flexibility support and comfort design',
    'Cross-training shoe perfect for multiple workout types and fitness needs',
    'Performance sports shoe with excellent ankle support and stability',
    'Women\'s running shoe with superior grip technology and cushioning',
  ],
  'Formal': [
    'Elegant formal heel perfect for special occasions and evening events',
    'Professional formal shoe designed for business wear and office settings',
    'Classic formal pump with sophisticated design and comfortable fit',
    'Premium formal footwear with superior comfort and elegant appearance',
    'Elegant formal shoe ideal for evening events and formal gatherings',
    'Professional formal loafer perfect for business settings and office wear',
    'Classic formal shoe crafted with premium materials and expert design',
    'Sophisticated formal heel perfect for special occasions and celebrations',
  ],
  'Heels': [
    'Stunning party heel perfect for special celebrations and fashion events',
    'Glamorous gold strappy heel ideal for evening wear and celebrations',
    'Elegant high heel designed for formal occasions and special events',
    'Stylish heel perfect for making statement looks and fashion statements',
    'Comfortable heels with cushioned footbed for extended wear',
    'Premium heels with superior arch support and stability design',
    'Modern heel with contemporary design and fashion-forward style',
    'Classic heel offering timeless elegance and sophisticated appeal',
  ],
  'Sandals': [
    'Iconic sandal with famous ergonomic footbed design for comfort',
    'Comfortable sandal perfect for all-day wear with cushioned support',
    'Stylish sandal designed for casual outings and beach activities',
    'Casual sandal with beach-ready design and quick-dry properties',
    'Lightweight sandal with modern style and comfortable fit',
    'Durable sandal with superior comfort and long-lasting materials',
    'Fashion sandal perfect for warm weather and casual wear',
    'Comfortable sandal with excellent arch support and cushioning',
  ],
  'Flip Flops': [
    'Comfortable flip flop designed for casual wear and everyday use',
    'Stylish flip flop with elegant design and fashion appeal',
    'Lightweight flip flop perfect for beach activities and vacations',
    'Durable flip flop with cushioned sole and premium materials',
    'Premium flip flop with enhanced comfort and quality construction',
    'Casual flip flop with modern style and comfortable fit',
    'Lightweight flip flop ideal for summer seasons and warm weather',
    'Comfortable flip flop perfect for everyday casual wear',
  ],
};

const kidsDescriptions = [
  'Fun and colorful shoe perfect for active play and outdoor activities',
  'Comfortable shoe with secure grip sole for safe outdoor play',
  'Lightweight shoe designed for kids\' activities with durable materials',
  'Durable shoe perfect for everyday play and sports activities',
  'Fun design shoe that kids love with vibrant colors and patterns',
  'Comfortable shoe with extra cushioning for protected play time',
  'Light-up shoe with exciting LED features that kids absolutely love',
  'Durable school shoe perfect for daily wear and school activities',
  'Colorful athletic shoe designed for active kids and sports',
  'Supportive shoe with arch support for developing feet',
];

const menBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Cole Haan', 'Clarks', 'Hush Puppies', 'Skechers', 'Crocs'];
const womenBrands = ['Nike', 'Adidas', 'Puma', 'Steve Madden', 'Jimmy Choo', 'ALDO', 'Clarks', 'Bata', 'Stuart Weitzman', 'Cole Haan'];
const kidsBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Skechers', 'Crocs', 'Bata', 'Liberty'];

const menCategories = ['Casual', 'Sports', 'Formal', 'Sandals', 'Flip Flops', 'Ethnic'];
const womenCategories = ['Casual', 'Sports', 'Formal', 'Heels', 'Sandals', 'Flip Flops'];
const kidsCategories = ['Casual', 'Sports', 'School Shoes', 'Flip Flops'];

const MEN_IMAGE_COUNT = 30;
const WOMEN_IMAGE_COUNT = 30;
const KIDS_IMAGE_COUNT = 15;

// Comprehensive product generator
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let id = 1;

  // Generate Men's Products (50 total)
  for (let i = 0; i < 50; i++) {
    const category = menCategories[i % menCategories.length];
    const brand = menBrands[i % menBrands.length];
    const descriptions = menDescriptions[category];
    const description = descriptions[i % descriptions.length];
    const price = Math.round(3000 + (i % 30) * 300 + Math.random() * 2000);
    const rating = parseFloat((3.5 + (i % 20) * 0.1).toFixed(1));
    const stock = Math.floor(Math.random() * 50) + 10;
    const imageIndex = Math.floor(Math.random() * MEN_IMAGE_COUNT) + 1;

    products.push({
      id,
      name: `${brand} Men's ${category} Shoe ${i + 1}`,
      brand,
      price,
      description,
      image: `/Images/Men/men_${imageIndex}.jpg`,
      gender: 'Men',
      category,
      isNew: i % 8 === 0,
      rating,
      stock,
    });
    id++;
  }

  // Generate Women's Products (45 total)
  for (let i = 0; i < 45; i++) {
    const category = womenCategories[i % womenCategories.length];
    const brand = womenBrands[i % womenBrands.length];
    const descriptions = womenDescriptions[category];
    const description = descriptions[i % descriptions.length];
    const price = Math.round(3500 + (i % 30) * 350 + Math.random() * 2500);
    const rating = parseFloat((3.6 + (i % 20) * 0.1).toFixed(1));
    const stock = Math.floor(Math.random() * 50) + 10;
    const imageIndex = Math.floor(Math.random() * WOMEN_IMAGE_COUNT) + 1;

    products.push({
      id,
      name: `${brand} Women's ${category} Shoe ${i + 1}`,
      brand,
      price,
      description,
      image: `/Images/Women/women_${imageIndex}.jpg`,
      gender: 'Women',
      category,
      isNew: i % 7 === 0,
      rating,
      stock,
    });
    id++;
  }

  // Generate Kids' Products (25 total)
  for (let i = 0; i < 25; i++) {
    const category = kidsCategories[i % kidsCategories.length];
    const brand = kidsBrands[i % kidsBrands.length];
    const description = kidsDescriptions[i % kidsDescriptions.length];
    const price = Math.round(2000 + (i % 20) * 250 + Math.random() * 1500);
    const rating = parseFloat((3.7 + (i % 15) * 0.1).toFixed(1));
    const stock = Math.floor(Math.random() * 40) + 5;
    const imageIndex = Math.floor(Math.random() * KIDS_IMAGE_COUNT) + 1;

    products.push({
      id,
      name: `${brand} Kids' ${category} Shoe ${i + 1}`,
      brand,
      price,
      description,
      image: `/Images/Kids/kids_${imageIndex}.jpg`,
      gender: 'Kids',
      category,
      isNew: i % 6 === 0,
      rating,
      stock,
    });
    id++;
  }

  return products;
};

export const products: Product[] = generateProducts();

// Backwards-compatible exports used across the app
export const categories = CATEGORIES;
export const logo = '/logo.png';
export const featuredCategories = FEATURED_CATEGORIES;
