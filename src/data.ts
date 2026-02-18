import { Product } from './types';

export const categories = [
  { name: 'Casual', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Casual', image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Formal', image: 'https://images.pexels.com/photos/293405/pexels-photo-293405.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Sports', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Flip Flops', image: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Sandals', image: 'https://images.pexels.com/photos/33853/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600' }
];

export const logo = '/logo.png';

export const products: Product[] = [
  // ===== MEN'S CASUAL SHOES =====
  {
    id: 1,
    name: 'Nike Men\'s Casual Blue Sneaker',
    brand: 'Nike',
    price: 9999,
    description: 'Comfortable blue casual sneaker for everyday wear. Perfect for street style.',
    image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Casual',
    isNew: true
  },
  {
    id: 2,
    name: 'Adidas Men\'s Classic White Shoe',
    brand: 'Adidas',
    price: 8999,
    description: 'Classic white casual sneaker for men. Versatile for any occasion.',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Casual'
  },
  {
    id: 3,
    name: 'Puma Men\'s Brown Casual Shoes',
    brand: 'Puma',
    price: 7899,
    description: 'Brown casual shoes for men with comfortable sole. Premium quality construction.',
    image: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Casual'
  },
  {
    id: 4,
    name: 'Reebok Men\'s Black Casual Sneaker',
    brand: 'Reebok',
    price: 6599,
    description: 'Black casual sneaker for men. Modern design with excellent comfort.',
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Casual'
  },

  // ===== MEN'S SPORTS SHOES =====
  {
    id: 101,
    name: 'Nike Men\'s Running Shoe Black',
    brand: 'Nike',
    price: 12999,
    description: 'Professional running shoe for men. High performance design with advanced cushioning.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    gender: 'Men',
    category: 'Sports',
    isNew: true
  },
  {
    id: 102,
    name: 'Adidas Men\'s Training Shoe',
    brand: 'Adidas',
    price: 11999,
    description: 'Durable sports training shoe for men. Perfect for gym and fitness training.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    gender: 'Men',
    category: 'Sports'
  },
  {
    id: 103,
    name: 'Puma Men\'s Sports Athletic Shoe',
    brand: 'Puma',
    price: 10999,
    description: 'Athletic sports shoe for men. Excellent support for sports activities.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    gender: 'Men',
    category: 'Sports'
  },
  {
    id: 104,
    name: 'Reebok Men\'s Running Athletic Shoe',
    brand: 'Reebok',
    price: 9999,
    description: 'Running athletic shoe for men. Lightweight with responsive cushioning.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    gender: 'Men',
    category: 'Sports'
  },

  // ===== MEN'S FORMAL SHOES =====
  {
    id: 201,
    name: 'Red Tape Men\'s Black Oxford',
    brand: 'Red Tape',
    price: 8999,
    description: 'Classic black oxford shoe for men. Perfect for formal occasions and business wear.',
    image: 'https://images.pexels.com/photos/293405/pexels-photo-293405.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Formal'
  },
  {
    id: 202,
    name: 'Clarks Men\'s Leather Formal Brown',
    brand: 'Clarks',
    price: 9999,
    description: 'Premium leather formal shoe for men. Elegant design for professional settings.',
    image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Formal'
  },
  {
    id: 203,
    name: 'Lee Cooper Men\'s Black Derby',
    brand: 'Lee Cooper',
    price: 7999,
    description: 'Stylish derby shoe for men. Suitable for business and formal occasions.',
    image: 'https://images.pexels.com/photos/1306248/pexels-photo-1306248.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Formal'
  },
  {
    id: 204,
    name: 'Bata Men\'s Formal Black Shoe',
    brand: 'Bata',
    price: 6999,
    description: 'Classic black formal shoe for men. Durable and comfortable for daily professional wear.',
    image: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Formal'
  },
  {
    id: 205,
    name: 'Louis Philippe Men\'s Tan Monk Strap',
    brand: 'Louis Philippe',
    price: 9499,
    description: 'Sophisticated tan monk strap shoes. Crafted from premium leather for a refined look.',
    image: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Formal',
    isNew: true
  },
  {
    id: 206,
    name: 'Hush Puppies Men\'s Formal Slip-On',
    brand: 'Hush Puppies',
    price: 5999,
    description: 'Comfortable and stylish slip-on formal shoes. Perfect for daily office wear.',
    image: 'https://images.pexels.com/photos/1306249/pexels-photo-1306249.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Formal'
  },

  // ===== MEN'S ETHNIC SHOES =====
  {
    id: 301,
    name: 'Desi Roots Men\'s Kolhapuri Chappal',
    brand: 'Desi Roots',
    price: 2999,
    description: 'Traditional brown Kolhapuri chappal for men. Handcrafted authentic leather.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
    gender: 'Men',
    category: 'Ethnic',
    isNew: true
  },
  {
    id: 302,
    name: 'Manyavar Men\'s Gold Mojari',
    brand: 'Manyavar',
    price: 3999,
    description: 'Royal gold mojari for men. Perfect for traditional Indian wedding events.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
    gender: 'Men',
    category: 'Ethnic'
  },
  {
    id: 303,
    name: 'FabIndia Men\'s Ethnic Brown Shoe',
    brand: 'FabIndia',
    price: 3499,
    description: 'Traditional brown ethnic shoe for men. Handcrafted with quality materials.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
    gender: 'Men',
    category: 'Ethnic'
  },
  {
    id: 304,
    name: 'Tanishq Men\'s Black Formal Ethnic',
    brand: 'Tanishq',
    price: 4499,
    description: 'Black formal ethnic shoe for men. Elegant design for festive occasions.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
    gender: 'Men',
    category: 'Ethnic'
  },

  // ===== WOMEN'S CASUAL SHOES =====
  {
    id: 401,
    name: 'Nike Women\'s Pink Casual Sneaker',
    brand: 'Nike',
    price: 9999,
    description: 'Stylish pink casual sneaker for women. Perfect for everyday wear and casual outings.',
    image: 'https://images.pexels.com/photos/637076/pexels-photo-637076.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Casual'
  },
  {
    id: 402,
    name: 'Adidas Women\'s White Canvas Shoe',
    brand: 'Adidas',
    price: 7499,
    description: 'Classic white canvas shoe for women. Lightweight and comfortable for daily wear.',
    image: 'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Casual'
  },
  {
    id: 403,
    name: 'Puma Women\'s Grey Casual Sneaker',
    brand: 'Puma',
    price: 8499,
    description: 'Trendy grey casual sneaker for women. Modern design with excellent comfort.',
    image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Casual'
  },
  {
    id: 404,
    name: 'Reebok Women\'s Black Casual Shoe',
    brand: 'Reebok',
    price: 6999,
    description: 'Sleek black casual shoe for women. Perfect for daily wear and street style.',
    image: 'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Casual'
  },

  // ===== WOMEN'S SPORTS SHOES =====
  {
    id: 501,
    name: 'Nike Women\'s Running Shoe Pink',
    brand: 'Nike',
    price: 12999,
    description: 'Stylish running shoe for women. Lightweight and responsive for active fitness.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Sports'
  },
  {
    id: 502,
    name: 'Adidas Women\'s Training Athletic Shoe',
    brand: 'Adidas',
    price: 11499,
    description: 'Women\'s training shoe for gym and fitness. Excellent support and comfort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Sports'
  },
  {
    id: 503,
    name: 'Puma Women\'s Sports Running Shoe',
    brand: 'Puma',
    price: 10999,
    description: 'Professional sports running shoe for women. High performance with great cushioning.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Sports'
  },
  {
    id: 504,
    name: 'Reebok Women\'s Athletic Training Shoe',
    brand: 'Reebok',
    price: 9999,
    description: 'Athletic training shoe for women. Perfect for workouts and sports activities.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Sports'
  },

  // ===== WOMEN'S FORMAL SHOES =====
  {
    id: 601,
    name: 'Steve Madden Women\'s Black Formal Heel',
    brand: 'Steve Madden',
    price: 9999,
    description: 'Elegant black formal heel for women. Perfect for professional and formal occasions.',
    image: 'https://images.unsplash.com/photo-1540551643147-cd189367d53f?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Formal'
  },
  {
    id: 602,
    name: 'ALDO Women\'s Nude Formal Pump',
    brand: 'ALDO',
    price: 8999,
    description: 'Classic nude formal pump for women. Versatile and elegant for business wear.',
    image: 'https://images.unsplash.com/photo-1548062328-c9454d53b558?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Formal'
  },
  {
    id: 603,
    name: 'Clarks Women\'s Brown Formal Shoe',
    brand: 'Clarks',
    price: 8499,
    description: 'Premium brown formal shoe for women. Comfortable for all-day professional wear.',
    image: 'https://images.unsplash.com/photo-1548062328-c9454d53b558?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Formal'
  },
  {
    id: 604,
    name: 'Bata Women\'s Black Formal Pump',
    brand: 'Bata',
    price: 7999,
    description: 'Elegant black formal pump for women. Durable and comfortable for daily office wear.',
    image: 'https://images.unsplash.com/photo-1548062328-c9454d53b558?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Formal'
  },

  // ===== WOMEN'S HEELS =====
  {
    id: 701,
    name: 'Nine West Women\'s Red Party Heel',
    brand: 'Nine West',
    price: 8499,
    description: 'Stunning red party heel for women. Perfect for special occasions and celebrations.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Heels',
    isNew: true
  },
  {
    id: 702,
    name: 'ALDO Women\'s Gold Strappy Heel',
    brand: 'ALDO',
    price: 8999,
    description: 'Glamorous gold strappy heel. Perfect for evening wear and special events.',
    image: 'https://images.unsplash.com/photo-1540551643147-cd189367d53f?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Heels'
  },
  {
    id: 703,
    name: 'Steve Madden Women\'s Black Block Heel',
    brand: 'Steve Madden',
    price: 7999,
    description: 'Comfortable black block heel for women. Perfect for all-day wear with style.',
    image: 'https://images.unsplash.com/photo-1548062328-c9454d53b558?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Heels'
  },
  {
    id: 704,
    name: 'Clarks Women\'s Nude Heel Pump',
    brand: 'Clarks',
    price: 8599,
    description: 'Classic nude heel pump for women. Elegant and versatile for various occasions.',
    image: 'https://images.unsplash.com/photo-1548062328-c9454d53b558?w=600&h=400&fit=crop',
    gender: 'Women',
    category: 'Heels'
  },

  // ===== KIDS' CASUAL SHOES =====
  {
    id: 801,
    name: 'Nike Kids\' Red Casual Shoe',
    brand: 'Nike',
    price: 4999,
    description: 'Bright red casual shoe for kids. Comfortable and durable for active play.',
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Kids',
    category: 'Casual'
  },
  {
    id: 802,
    name: 'Adidas Kids\' Blue Casual Sneaker',
    brand: 'Adidas',
    price: 4499,
    description: 'Fun blue casual sneaker for kids. Lightweight design for everyday wear.',
    image: 'https://images.pexels.com/photos/39369/shoes-sneakers-children-s-shoes-fashion-39369.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Kids',
    category: 'Casual'
  },
  {
    id: 803,
    name: 'Puma Kids\' White Casual Shoe',
    brand: 'Puma',
    price: 3999,
    description: 'Classic white casual shoe for kids. Perfect for school and casual outings.',
    image: 'https://images.pexels.com/photos/47220/shoes-pregnancy-pregnancy-shoes-mens-shoes-47220.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Kids',
    category: 'Casual'
  },
  {
    id: 804,
    name: 'Reebok Kids\' Black Casual Sneaker',
    brand: 'Reebok',
    price: 3599,
    description: 'Stylish black casual sneaker for kids. Comfortable for active play and sports.',
    image: 'https://images.pexels.com/photos/159672/school-shoes-back-to-school-black-shoes-159672.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Kids',
    category: 'Casual'
  },

  // ===== KIDS' SPORTS SHOES =====
  {
    id: 901,
    name: 'Nike Kids\' Running Shoe Blue',
    brand: 'Nike',
    price: 7999,
    description: 'Kids running shoe with bright blue color. Lightweight design for sports activities.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'Sports'
  },
  {
    id: 902,
    name: 'Adidas Kids\' Sports Athletic Shoe',
    brand: 'Adidas',
    price: 7499,
    description: 'Sports shoe for kids with excellent support. Perfect for sports and training.',
    image: 'https://images.unsplash.com/photo-1539655519266-724c6a9d1414?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'Sports'
  },
  {
    id: 903,
    name: 'Puma Kids\' Running Athletic Shoe',
    brand: 'Puma',
    price: 6999,
    description: 'Athletic running shoe for kids. Lightweight and responsive for active play.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'Sports'
  },
  {
    id: 904,
    name: 'Reebok Kids\' Sports Training Shoe',
    brand: 'Reebok',
    price: 6499,
    description: 'Training shoe for kids. Designed for sports activities and physical training.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'Sports'
  },

  // ===== KIDS' SCHOOL SHOES =====
  {
    id: 1001,
    name: 'Bata Kids\' Black School Shoe',
    brand: 'Bata',
    price: 2999,
    description: 'Formal black school shoe for kids. Durable for daily school wear.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'School Shoes'
  },
  {
    id: 1002,
    name: 'Liberty Kids\' White Canvas School Shoe',
    brand: 'Liberty',
    price: 2499,
    description: 'Classic white canvas school shoe for kids. Easy to maintain and comfortable.',
    image: 'https://images.unsplash.com/photo-1539655519266-724c6a9d1414?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'School Shoes'
  },
  {
    id: 1003,
    name: 'Clarks Kids\' Navy School Shoe',
    brand: 'Clarks',
    price: 3499,
    description: 'Premium navy school shoe for kids. Ergonomic design for comfort.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'School Shoes',
    isNew: true
  },
  {
    id: 1004,
    name: 'Campus Kids\' Black Formal School Shoe',
    brand: 'Campus',
    price: 2199,
    description: 'Formal black school shoe for kids. Affordable and durable for daily school.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'School Shoes'
  },

  // ===== KIDS' ETHNIC SHOES =====
  {
    id: 1101,
    name: 'Desi Roots Kids\' Ethnic Brown Shoe',
    brand: 'Desi Roots',
    price: 2499,
    description: 'Traditional ethnic brown shoe for kids. Perfect for festive occasions.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'Ethnic'
  },
  {
    id: 1102,
    name: 'FabIndia Kids\' Red Ethnic Shoe',
    brand: 'FabIndia',
    price: 2799,
    description: 'Red ethnic shoe for kids. Handcrafted for traditional wear and celebrations.',
    image: 'https://images.unsplash.com/photo-1539655519266-724c6a9d1414?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'Ethnic'
  },
  {
    id: 1103,
    name: 'Manyavar Kids\' Gold Ethnic Shoe',
    brand: 'Manyavar',
    price: 3299,
    description: 'Gold ethnic shoe for kids. Perfect for traditional festivals and weddings.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'Ethnic'
  },
  {
    id: 1104,
    name: 'Tanishq Kids\' Black Ethnic Shoe',
    brand: 'Tanishq',
    price: 2899,
    description: 'Black ethnic shoe for kids. Formal ethnic wear for special occasions.',
    image: 'https://images.unsplash.com/photo-1539655519266-724c6a9d1414?w=600&h=400&fit=crop',
    gender: 'Kids',
    category: 'Ethnic'
  },

  // ===== WOMEN'S SANDALS =====
  {
    id: 1201,
    name: 'Bata Women\'s Beige Sandals',
    brand: 'Bata',
    price: 1999,
    description: 'Comfortable beige sandals for daily wear. Soft sole for extra comfort.',
    image: 'https://images.pexels.com/photos/33853/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Sandals',
    isNew: true
  },
  {
    id: 1202,
    name: 'Clarks Women\'s Leather Strap Sandals',
    brand: 'Clarks',
    price: 3499,
    description: 'Premium leather strap sandals. Durable and stylish for summer.',
    image: 'https://images.pexels.com/photos/137603/pexels-photo-137603.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Sandals'
  },
  {
    id: 1203,
    name: 'Catwalk Women\'s Black Fashion Sandals',
    brand: 'Catwalk',
    price: 2499,
    description: 'Stylish black fashion sandals. Perfect for casual outings and parties.',
    image: 'https://images.pexels.com/photos/267206/pexels-photo-267206.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Sandals'
  },
  {
    id: 1204,
    name: 'Mochi Women\'s Ethnic Sandals',
    brand: 'Mochi',
    price: 2199,
    description: 'Ethnic design sandals for women. Great match for traditional wear.',
    image: 'https://images.pexels.com/photos/1456735/pexels-photo-1456735.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Sandals'
  },

  // ===== FLIP FLOPS =====
  {
    id: 1301,
    name: 'Bahamas Men\'s Printed Flip Flops',
    brand: 'Bahamas',
    price: 399,
    description: 'Casual printed flip flops for men. Perfect for beach and home wear.',
    image: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Flip Flops',
    isNew: true
  },
  {
    id: 1302,
    name: 'UCB Men\'s Rubber Flip Flops',
    brand: 'United Colors of Benetton',
    price: 799,
    description: 'Durable rubber flip flops with UCB branding. Comfortable for daily use.',
    image: 'https://images.pexels.com/photos/1287513/pexels-photo-1287513.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Flip Flops'
  },
  {
    id: 1303,
    name: 'Crocs Unisex Bayaband Flip',
    brand: 'Crocs',
    price: 2499,
    description: 'Sporty and lightweight flip flops. Iconic Crocs comfort.',
    image: 'https://images.pexels.com/photos/6046184/pexels-photo-6046184.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Flip Flops'
  },
  {
    id: 1304,
    name: 'Sparx Men\'s Casual Flip Flops',
    brand: 'Sparx',
    price: 599,
    description: 'Stylish and sturdy flip flops for men. Anti-slip sole.',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Flip Flops'
  },
  {
    id: 1305,
    name: 'Puma Unisex Plain Flip Flops',
    brand: 'Puma',
    price: 1299,
    description: 'Simple and classic plain flip flops. Soft footbed for comfort.',
    image: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Flip Flops'
  },
  {
    id: 1306,
    name: 'Adidas Men\'s Eezay Flip Flops',
    brand: 'Adidas',
    price: 1999,
    description: 'Lightweight flip flops with massage footbed. Relax your feet.',
    image: 'https://images.pexels.com/photos/1287513/pexels-photo-1287513.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Flip Flops'
  },
  {
    id: 1307,
    name: 'Nike Men\'s Solay Thong',
    brand: 'Nike',
    price: 2199,
    description: 'Modern thong flip flops with foam midsole. All-day comfort.',
    image: 'https://images.pexels.com/photos/6046184/pexels-photo-6046184.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Flip Flops'
  },
  {
    id: 1308,
    name: 'Havaianas Women\'s Slim Flip Flops',
    brand: 'Havaianas',
    price: 1499,
    description: 'Slim strap flip flops for women. Elegant and comfortable.',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Flip Flops',
    isNew: true
  },
  {
    id: 1309,
    name: 'Roxy Women\'s Tahiti Flip Flops',
    brand: 'Roxy',
    price: 1299,
    description: 'Beach-ready flip flops for women. Soft rubber sole.',
    image: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Flip Flops'
  },
  {
    id: 1310,
    name: 'Clarks Women\'s Breeze Sea',
    brand: 'Clarks',
    price: 2999,
    description: 'Adjustable strap flip flops. Cloudsteppers technology for cushioning.',
    image: 'https://images.pexels.com/photos/1287513/pexels-photo-1287513.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Flip Flops'
  },
  {
    id: 1311,
    name: 'Skechers Women\'s On-The-Go',
    brand: 'Skechers',
    price: 3499,
    description: 'Performance flip flops with Goga Mat technology. High rebound cushioning.',
    image: 'https://images.pexels.com/photos/6046184/pexels-photo-6046184.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Flip Flops'
  },
  {
    id: 1312,
    name: 'Reef Men\'s Fanning Flip Flops',
    brand: 'Reef',
    price: 3999,
    description: 'Flip flops with a bottle opener in the sole. Water friendly.',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Men',
    category: 'Flip Flops'
  },
  {
    id: 1313,
    name: 'Teva Women\'s Olowahu',
    brand: 'Teva',
    price: 2299,
    description: 'Strappy flip flops with elegant design. Mush topsole for comfort.',
    image: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Flip Flops'
  },
  {
    id: 1314,
    name: 'UGG Women\'s Poppy Flip Flops',
    brand: 'UGG',
    price: 4499,
    description: 'Playful flip flops with a pom pom. Sheepskin insole.',
    image: 'https://images.pexels.com/photos/1287513/pexels-photo-1287513.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Women',
    category: 'Flip Flops'
  },
  {
    id: 1315,
    name: 'Crocs Kids\' Classic Flip',
    brand: 'Crocs',
    price: 1999,
    description: 'Classic flip flops for kids. Easy to clean and quick to dry.',
    image: 'https://images.pexels.com/photos/6046184/pexels-photo-6046184.jpeg?auto=compress&cs=tinysrgb&w=600',
    gender: 'Kids',
    category: 'Flip Flops'
  }
];
