import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaFire, FaGift, FaPercent, FaMedal } from 'react-icons/fa';

const ExclusiveMemberOffers: React.FC = () => {
  const offers = [
    {
      title: 'Exclusive 30% Off',
      description: 'On all premium footwear',
      icon: FaPercent,
      color: 'danger',
      code: 'MEMBER30'
    },
    {
      title: 'Free Premium Shipping',
      description: 'On orders over ₹299',
      icon: FaGift,
      color: 'success',
      code: 'FREESHIP'
    },
    {
      title: 'Double Loyalty Points',
      description: 'Valid this month only',
      icon: FaMedal,
      color: 'warning',
      code: 'DOUBLE2X'
    },
    {
      title: 'Flash Sale Access',
      description: '24 hours early access',
      icon: FaFire,
      color: 'info',
      code: 'FLASH24'
    },
  ];

  return (
    <Container className="py-5">
      <div className="mb-5">
        <div className="d-flex align-items-center gap-2 mb-2">
    
          <h2 className="fw-bold mb-0">Exclusive Member Offers</h2>
        </div>
        <p className="text-muted">Special deals available only for our valued members</p>
      </div>

      <Row className="g-4 slide-up">
        {offers.map((offer, index) => {
          const Icon = offer.icon;
          return (
            <Col md={6} lg={3} key={index}>
              <Card className="h-100 border-0 shadow-sm hover-lift transition-all overflow-hidden" style={{ borderTop: `4px solid var(--bs-${offer.color})` }}>
                <Card.Body className="d-flex flex-column p-4">
                  <div className={`bg-${offer.color} bg-opacity-10 rounded-circle p-3 mb-3 d-inline-block`} style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={24} className={`text-${offer.color}`} />
                  </div>

                  <h5 className="fw-bold mb-2">{offer.title}</h5>
                  <p className="text-muted small mb-3 flex-grow-1">{offer.description}</p>

                  <div className="d-flex gap-2 align-items-center">
                    <Badge bg={offer.color} className="fw-bold">{offer.code}</Badge>
                    <Button variant="outline-secondary" size="sm" className="ms-auto fw-medium">Copy</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ExclusiveMemberOffers;
