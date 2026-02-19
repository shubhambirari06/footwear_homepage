import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaBox, FaHeart, FaCog, FaShare } from 'react-icons/fa';
import { User } from '../types/index';

interface UserDashboardProps {
  user: User | null;
  onOrderClick: () => void;
  onWishlistClick: () => void;
  onProfileClick: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onOrderClick, onWishlistClick, onProfileClick }) => {
  const dashboardItems = [
    {
      icon: FaBox,
      title: 'Your Orders',
      description: 'Track and manage your orders',
      color: 'info',
      link: '#orders'
    },
    {
      icon: FaHeart,
      title: 'Your Wishlist',
      description: 'View your saved items',
      color: 'danger',
      link: '#wishlist'
    },
    {
      icon: FaCog,
      title: 'Account Settings',
      description: 'Manage your profile',
      color: 'primary',
      link: '#account'
    },
    {
      icon: FaShare,
      title: 'Referral Program',
      description: 'Earn rewards with friends',
      color: 'success',
      link: '#referral'
    }
  ];

  return (
    <Container className="py-5">
      <div className="mb-5">
        <h2 className="fw-bold mb-2">Quick Access</h2>
        <p className="text-muted">Manage your account and shopping experience</p>
      </div>

      <Row className="g-4 slide-up">
        {dashboardItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Col md={6} lg={3} key={index}>
              <Card className="h-100 border-0 shadow-sm dashboard-card hover-lift transition-all">
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className={`bg-${item.color} bg-opacity-10 rounded-circle p-4 mb-3`} style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={32} className={`text-${item.color}`} />
                  </div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted small mb-3 flex-grow-1">{item.description}</p>
                  <Button 
                    variant={item.color} 
                    size="sm" 
                    className="rounded-pill px-4 fw-medium"
                    onClick={
                      item.link === '#orders' ? onOrderClick : 
                      item.link === '#wishlist' ? onWishlistClick : 
                      item.link === '#account' ? onProfileClick : undefined
                    }
                  >
                    View
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default UserDashboard;
