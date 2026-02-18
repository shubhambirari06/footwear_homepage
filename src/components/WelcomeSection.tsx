import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSmile, FaTrophy, FaGift, FaHeart } from 'react-icons/fa';
import { User } from '../types';

interface WelcomeSectionProps {
  user: User | null;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
  const firstName = user?.name.split(' ')[0] || 'Guest';

  return (
    <div className="bg-gradient-primary py-5 text-white welcome-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="welcome-content slide-up">
              <h1 className="display-5 fw-bold mb-3">
                Welcome Back, <span className="text-warning">{firstName}!</span>
              </h1>
              <p className="lead mb-4 text-white-75">
                Discover our latest arrivals and exclusive offers specially curated for you.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <div className="d-flex align-items-center bg-white bg-opacity-10 px-3 py-2 rounded-pill">
                  <FaTrophy className="me-2 text-warning" />
                  <span className="fw-medium">Member Status</span>
                </div>
                <div className="d-flex align-items-center bg-white bg-opacity-10 px-3 py-2 rounded-pill">
                  <FaGift className="me-2 text-success" />
                  <span className="fw-medium">Exclusive Deals</span>
                </div>
                <div className="d-flex align-items-center bg-white bg-opacity-10 px-3 py-2 rounded-pill">
                  <FaHeart className="me-2 text-danger" />
                  <span className="fw-medium">Your Wishlist</span>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} className="text-center d-none d-lg-block">
            <div className="welcome-avatar-container">
              <div className="welcome-avatar bg-warning text-primary fw-bold display-1">
                {firstName.charAt(0).toUpperCase()}
              </div>
              <FaSmile className="welcome-smile-icon text-success" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WelcomeSection;
