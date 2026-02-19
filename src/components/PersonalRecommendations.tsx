import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaHeart, FaArrowRight } from 'react-icons/fa';
import { Product } from '../types/index';

interface PersonalRecommendationsProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const PersonalRecommendations: React.FC<PersonalRecommendationsProps> = ({ products, onProductClick }) => {
  // Show top 4 products as recommendations
  const recommendedProducts = products.slice(0, 4);

  return (
    <Container className="py-5">
      <div className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="fw-bold mb-0">Recommended Just For You</h2>
          <small className="text-primary fw-bold cursor-pointer">View All <FaArrowRight size={14} className="ms-1" /></small>
        </div>
        <p className="text-muted">Based on your shopping preferences and history</p>
      </div>

      <Row className="g-4 slide-up">
        {recommendedProducts.map((product) => (
          <Col md={6} lg={3} key={product.id}>
            <Card className="h-100 border-0 shadow-sm hover-lift transition-all position-relative product-card">
              <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: '100%', objectFit: 'cover' }}
                />
                <Badge bg="danger" className="position-absolute top-0 start-0 m-2 px-3 py-2">
                  <FaHeart size={12} className="me-1" />
                  Personal Pick
                </Badge>
              </div>

              <Card.Body className="d-flex flex-column p-3">
                <small className="text-primary fw-bold small mb-1">{product.brand}</small>
                <Card.Title className="fw-bold small mb-2" style={{ fontSize: '14px' }}>
                  {product.name}
                </Card.Title>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="h6 mb-0 text-primary fw-bold">₹{product.price.toLocaleString('en-IN')}</span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-pill px-3 fw-medium"
                    onClick={() => onProductClick(product)}
                  >
                    View
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PersonalRecommendations;
