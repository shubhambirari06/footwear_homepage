import React, { useState, useEffect, useRef } from 'react';
import Pagination from './Pagination';

const ProductList = () => {
  // Sample products data with working image URLs
  const products = [
    {
      id: 1,
      name: "Nike Men's Casual Blue Sneaker",
      price: 120,
      image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      description: "Comfortable blue casual sneaker for everyday wear."
    },
    {
      id: 2,
      name: "Adidas Men's Classic White Shoe",
      price: 150,
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Classic white casual sneaker for men."
    },
    {
      id: 3,
      name: "Puma Men's Brown Casual Shoes",
      price: 90,
      image: "https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Brown casual shoes for men with comfortable sole."
    },
    {
      id: 4,
      name: "Reebok Men's Black Casual Sneaker",
      price: 60,
      image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Modern black casual sneaker designed for comfort."
    },
    {
      id: 5,
      name: "Cole Haan Men's Oxford Formal Shoe",
      price: 180,
      image: "https://images.pexels.com/photos/293405/pexels-photo-293405.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Premium leather oxford shoe perfect for business."
    },
    {
      id: 6,
      name: "Havaianas Men's Flip Flop",
      price: 30,
      image: "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Lightweight and comfortable flip flop for casual wear."
    },
    {
      id: 7,
      name: "Nike Women's Casual Pink Sneaker",
      price: 110,
      image: "https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Trendy pink casual sneaker designed for women."
    },
    {
      id: 8,
      name: "Manolo Blahnik Women's Formal Heel",
      price: 250,
      image: "https://images.pexels.com/photos/3735651/pexels-photo-3735651.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Luxurious formal heel for special occasions."
    },
    {
      id: 9,
      name: "Jimmy Choo Women's Evening Heel",
      price: 220,
      image: "https://images.pexels.com/photos/3735652/pexels-photo-3735652.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Glamorous evening heel for formal events."
    },
    {
      id: 10,
      name: "Havaianas Women's Flip Flop",
      price: 25,
      image: "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Comfortable and colorful flip flop for women."
    },
    {
      id: 11,
      name: "Nike Kids' Colorful Casual Sneaker",
      price: 55,
      image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Fun and colorful casual sneaker for kids."
    },
    {
      id: 12,
      name: "Adidas Kids' Blue Casual Shoe",
      price: 50,
      image: "https://images.pexels.com/photos/3945684/pexels-photo-3945684.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Comfortable blue casual shoe for children."
    },
    {
      id: 13,
      name: "Nike Kids' Running Sports Shoe",
      price: 70,
      image: "https://images.pexels.com/photos/3945687/pexels-photo-3945687.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Performance running shoe designed for active kids."
    },
    {
      id: 14,
      name: "Crocs Kids' Classic Flip",
      price: 25,
      image: "https://images.pexels.com/photos/6046184/pexels-photo-6046184.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Classic flip flops for kids. Easy to clean."
    },
    {
      id: 15,
      name: "Nike Men's Running Sports Shoe",
      price: 130,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "High-performance running shoe with advanced cushioning."
    },
    {
      id: 16,
      name: "Adidas Women's Stylish White Shoe",
      price: 95,
      image: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Elegant white casual sneaker for women."
    },
    {
      id: 17,
      name: "Puma Women's Running Shoe",
      price: 85,
      image: "https://images.pexels.com/photos/60735/pexels-photo-60735.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "High performance running shoe for women."
    },
    {
      id: 18,
      name: "Reebok Classics Men's Sneaker",
      price: 75,
      image: "https://images.pexels.com/photos/2759783/pexels-photo-2759783.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Timeless design meets modern comfort."
    },
    {
      id: 19,
      name: "New Balance Men's 574",
      price: 80,
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Iconic style with premium materials."
    },
    {
      id: 20,
      name: "Vans Kids' Classic Slip-On",
      price: 45,
      image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Classic slip-on canvas shoe for kids."
    },
    {
      id: 21,
      name: "Converse Chuck Taylor All Star",
      price: 60,
      image: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "The definitive sneaker, redesigned for comfort."
    },
    {
      id: 22,
      name: "Timberland Men's Premium Boot",
      price: 160,
      image: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Waterproof leather boots for any weather."
    },
    {
      id: 23,
      name: "Skechers Kids' Light-Up Sneaker",
      price: 55,
      image: "https://images.pexels.com/photos/40662/shoes-footwear-hiking-shoes-walking-40662.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Fun light-up shoes for active kids."
    },
    {
      id: 24,
      name: "Under Armour Men's Curry",
      price: 140,
      image: "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Basketball shoes built for speed and agility."
    },
    {
      id: 25,
      name: "Fila Women's Disruptor II",
      price: 70,
      image: "https://images.pexels.com/photos/137603/pexels-photo-137603.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Chunky retro sneaker style."
    },
    {
      id: 26,
      name: "Balenciaga Triple S",
      price: 950,
      image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Oversized sneakers for a bold look."
    },
    {
      id: 27,
      name: "Gucci Ace Embroidered Sneaker",
      price: 650,
      image: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Luxury leather sneaker with signature details."
    },
    {
      id: 28,
      name: "Adidas Yeezy Boost 350",
      price: 300,
      image: "https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Popular lifestyle sneaker designed by Kanye West."
    },
    {
      id: 29,
      name: "Nike Air Jordan 1 Retro",
      price: 200,
      image: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "The shoe that started it all."
    },
    {
      id: 30,
      name: "Asics Men's Gel-Kayano",
      price: 160,
      image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      description: "High mileage running shoe with stability."
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const topRef = useRef(null);

  // Scroll to top when the component mounts or page changes
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="product-list-page" ref={topRef} tabIndex={-1} style={{ outline: 'none' }}>
      <h1>All Products</h1>
      
      <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px 0' }}>
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <div key={product.id} className="product-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No+Image'; }}
              />
              <h3>{product.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductList;