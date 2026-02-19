import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { Product } from '../types/index';

interface ProductShowcaseProps {
  title?: string;
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ title = "Featured Products", products, onProductClick }) => {
  return (
    <Container className="py-5">
      <div className="mb-5 text-center">
        <h2 className="fw-bold display-6 mb-2">{title}</h2>
        <div className="d-inline-block bg-primary bg-opacity-10 rounded-pill px-4 py-2">
          <p className="text-primary fw-medium small mb-0">✨ {products.length} {products.length === 1 ? 'Product' : 'Products'} Available</p>
        </div>
      </div>

      <Row xs={1} sm={2} md={2} lg={3} className="g-4 slide-up">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm border-0 product-card position-relative">
              {/* Product Image Section */}
              <div className="position-relative overflow-hidden bg-light" style={{ height: '250px' }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />

                {/* Badges */}
                <div className="position-absolute top-0 end-0 p-3 d-flex flex-column gap-2">
                  <Badge bg="primary" className="px-3 py-2 rounded-pill small fw-medium">
                    {product.gender}
                  </Badge>
                  {product.isNew && (
                    <Badge bg="success" className="px-3 py-2 rounded-pill small fw-medium">
                      🆕 New
                    </Badge>
                  )}
                </div>

                {/* Overlay on Hover */}
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-0 d-flex align-items-center justify-content-center transition-all" style={{ opacity: 0 }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.1'; e.currentTarget.style.transition = 'opacity 0.3s ease'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}>
                </div>
              </div>

              {/* Product Body */}
              <Card.Body className="d-flex flex-column py-4">
                {/* Brand & Category */}
                <div className="d-flex gap-2 mb-2 justify-content-between align-items-center">
                  <small className="text-primary fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                    {product.brand}
                  </small>
                  {product.isNew && (
                    <small className="badge bg-warning text-dark fw-medium">Featured</small>
                  )}
                </div>

                {/* Product Name */}
                <Card.Title className="fw-bold text-truncate mb-2" style={{ fontSize: '16px', lineHeight: '1.4' }}>
                  {product.name}
                </Card.Title>

                {/* Product Description */}
                <Card.Text
                  className="text-muted small flex-grow-1 mb-3"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    fontSize: '13px',
                    lineHeight: '1.4'
                  }}
                >
                  {product.description}
                </Card.Text>

                {/* Price & Action */}
                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-light">
                  <div className="d-flex flex-column">
                    <span className="h5 mb-0 text-primary fw-bold">₹{product.price.toLocaleString('en-IN')}</span>
                    <small className="text-muted">Free Shipping</small>
                  </div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="rounded-pill px-3 fw-medium d-flex align-items-center gap-1"
                    onClick={() => onProductClick(product)}
                  >
                    <FaEye size={14} />
                    <span>View</span>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {products.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted mb-3">No products found</h4>
          <p className="text-muted">Try adjusting your filters or search terms</p>
        </div>
      )}
    </Container>
  );
};

export default ProductShowcase;