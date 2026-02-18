import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Image, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaShoppingBag, FaTrash, FaHeart } from 'react-icons/fa';
import { Product } from '../types';

interface WishlistPageProps {
  wishlist: Product[];
  onRemove: (productId: number) => void;
  onAddToCart: (product: Product, quantity: number, size: number) => void;
  onBack: () => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ 
  wishlist, 
  onRemove, 
  onAddToCart,
  onBack 
}) => {
  if (wishlist.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center py-5">
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>❤️</div>
          <h2 className="fw-bold mb-3">Your Wishlist is Empty</h2>
          <p className="text-muted mb-4">Save your favorite items to view them later</p>
          <Button variant="primary" className="rounded-pill px-5 py-2 fw-medium" onClick={onBack}>
            <FaShoppingBag className="me-2" />
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="mb-4 d-flex align-items-center gap-3">
        <Button variant="light" className="rounded-circle p-2 border" onClick={onBack}>
          <FaArrowLeft size={20} className="text-dark" />
        </Button>
        <h1 className="fw-bold mb-0" style={{ fontSize: '32px' }}>Your Wishlist</h1>
        <Badge bg="primary" pill className="ms-auto fw-bold px-3 py-2" style={{ fontSize: '14px' }}>
          {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
        </Badge>
      </div>

      <Alert variant="info" className="d-flex align-items-center gap-2 mb-4">
        <FaHeart size={18} className="text-danger" />
        <span className="fw-medium">💝 Move items to cart to purchase them. Items in wishlist are saved for 30 days.</span>
      </Alert>

      <Row className="g-4 slide-up">
        {wishlist.map((product) => (
          <Col md={6} lg={4} key={product.id}>
            <Card className="h-100 border-0 shadow-sm hover-lift transition-all position-relative product-card">
              {/* Image Container */}
              <div className="position-relative overflow-hidden" style={{ height: '250px', background: '#f8f9fa' }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                {product.isNew && (
                  <Badge bg="success" className="position-absolute top-2 end-2">
                    NEW
                  </Badge>
                )}
                <div className="position-absolute top-2 start-2">
                  <Button
                    variant="light"
                    size="sm"
                    className="rounded-circle p-2"
                    onClick={() => onRemove(product.id)}
                    title="Remove from wishlist"
                  >
                    <FaTrash size={16} className="text-danger" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <Card.Body className="d-flex flex-column p-4">
                <small className="text-primary fw-bold text-uppercase mb-2" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                  {product.brand}
                </small>
                <h6 className="fw-bold mb-2" style={{ fontSize: '16px', lineHeight: '1.4' }}>
                  {product.name}
                </h6>

                {/* Category Info */}
                <p className="text-muted small mb-3" style={{ fontSize: '12px' }}>
                  {product.category} • {product.gender}
                </p>

                {/* Description */}
                <p className="text-muted small flex-grow-1 mb-3" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                  {product.description}
                </p>

                {/* Price */}
                <div className="fw-bold text-primary mb-3" style={{ fontSize: '18px' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="primary"
                  size="sm"
                  className="w-100 fw-bold rounded-lg"
                  onClick={() => onAddToCart(product, 1, 8)}
                >
                  <FaShoppingBag className="me-2" />
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WishlistPage;
