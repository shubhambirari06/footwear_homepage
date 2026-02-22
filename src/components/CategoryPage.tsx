import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaArrowLeft, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import { Product } from '../types/index';

interface CategoryPageProps {
  products: Product[];
  gender: string;
  subcategory: string;
  onBack: () => void;
  onAddToCart: (product: Product, quantity?: number, size?: string | number) => void;
}

const ProductImage: React.FC<{ src: string; alt: string; className?: string; style?: React.CSSProperties }> = ({ src, alt, className, style }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="position-absolute top-0 start-0 w-100 h-100 bg-light" style={{ opacity: 0.5 }} />}
      <Card.Img
        variant="top"
        src={src}
        alt={alt}
        className={className}
        style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

const CategoryProductCard: React.FC<{ product: Product; onAddToCart: (p: Product, q: number, s: string | number) => void }> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const sizes = product.sizes || [6, 7, 8, 9, 10];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    onAddToCart(product, 1, selectedSize);
  };

  return (
    <Card className="product-card h-100 border-0 shadow-sm" style={{ cursor: 'pointer' }}>
      {/* Image Container */}
      <div className="position-relative overflow-hidden" style={{ height: '250px', background: '#f8f9fa' }}>
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-100"
          style={{ objectFit: 'cover' }}
        />
        {product.isNew && (
          <Badge bg="success" className="position-absolute top-2 end-2">
            NEW
          </Badge>
        )}
      </div>

      {/* Content */}
      <Card.Body className="d-flex flex-column">
        <small className="text-primary fw-bold text-uppercase mb-2" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
          {product.brand}
        </small>
        <h6 className="fw-bold mb-2" style={{ fontSize: '15px', lineHeight: '1.4' }}>
          {product.name}
        </h6>
        <p className="text-muted small mb-3" style={{ fontSize: '12px' }}>
          {product.category} • {product.gender}
        </p>

        {/* Size Selection */}
        <div className="mb-3">
          <small className="text-muted d-block mb-1" style={{ fontSize: '11px' }}>Select Size:</small>
          <div className="d-flex gap-1 flex-wrap">
            {sizes.map(size => (
              <Button
                key={size}
                variant={selectedSize === size ? "dark" : "outline-secondary"}
                size="sm"
                className="p-0"
                style={{ width: '28px', height: '28px', fontSize: '11px' }}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Price and Button */}
        <div className="mt-auto">
          <div className="fw-bold text-primary mb-2" style={{ fontSize: '18px' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          <Button
            variant="primary"
            size="sm"
            className="w-100 fw-bold rounded-lg"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const CategoryPage: React.FC<CategoryPageProps> = ({
  products,
  gender,
  subcategory,
  onBack,
  onAddToCart
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Filter products by gender and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const genderMatch = product.gender === gender;
      const categoryMatch = product.category === subcategory;
      return genderMatch && categoryMatch;
    });
  }, [products, gender, subcategory]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (filteredProducts.length === 0) {
    return (
      <Container className="py-5">
        <div className="mb-4">
          <Button variant="light" className="mb-3" onClick={onBack}>
            <FaArrowLeft className="me-2" /> Back to Categories
          </Button>
        </div>
        <div className="text-center py-5">
          <h2 className="text-muted mb-3">No products found</h2>
          <p className="text-muted">We don't have any {gender.toLowerCase()} {subcategory.toLowerCase()} in stock right now.</p>
          <Button variant="primary" className="mt-3" onClick={onBack}>
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="mb-4">
        <Button variant="light" className="mb-3 border" onClick={onBack}>
          <FaArrowLeft className="me-2" /> Back
        </Button>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div>
            <h1 className="fw-bold mb-2" style={{ fontSize: '32px' }}>
              {gender} {subcategory}
            </h1>
            <p className="text-muted mb-0">
              Showing {paginatedProducts.length} of {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-2">
              <FaFilter size={14} /> Filter
            </Button>
            <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-2">
              <FaSortAmountDown size={14} /> Sort
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <Row className="g-4">
        {paginatedProducts.map((product) => (
          <Col md={6} lg={3} xl={3} key={product.id} className="slide-up">
            <CategoryProductCard product={product} onAddToCart={onAddToCart} />
          </Col>
        ))}
      </Row>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-5 d-flex justify-content-center align-items-center gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <span className="text-muted small">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CategoryPage;
