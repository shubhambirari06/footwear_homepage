import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShoppingBag, FaStar, FaTrophy } from 'react-icons/fa';
import { User } from '../types/index';

interface UserStatsCardProps {
  user: User | null;
}

const UserStatsCard: React.FC<UserStatsCardProps> = ({ user }) => {
  const formatJoinDate = (joinDate?: string) => {
    if (!joinDate) return 'Recently';
    const date = new Date(joinDate);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const stats = [
    { icon: FaShoppingBag, label: 'Total Orders', value: '0', color: 'info' },
    { icon: FaShoppingBag, label: 'Total Spent', value: '₹0', color: 'success' },
    { icon: FaStar, label: 'Loyalty Points', value: '0', color: 'warning' },
    { icon: FaTrophy, label: 'Member Since', value: formatJoinDate(user?.joinDate), color: 'danger' },
  ];

  return (
    <Container className="my-5">
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Your Member Activity</h3>
        <p className="text-muted">Keep track of your shopping journey</p>
      </div>

      <Row className="g-3 slide-up">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Col md={6} lg={3} key={index}>
              <Card className="h-100 border-0 shadow-sm hover-lift transition-all" style={{ background: `linear-gradient(135deg, rgba(13, 110, 253, 0.05), rgba(13, 110, 253, 0.02))` }}>
                <Card.Body className="text-center p-4">
                  <div className={`bg-${stat.color} bg-opacity-10 rounded-circle p-3 mb-3 d-inline-block`} style={{ width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={28} className={`text-${stat.color}`} />
                  </div>
                  <h6 className="text-muted small fw-medium mb-2">{stat.label}</h6>
                  <h3 className={`fw-bold text-${stat.color} mb-0`}>{stat.value}</h3>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default UserStatsCard;
