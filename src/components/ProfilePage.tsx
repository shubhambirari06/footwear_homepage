import React from 'react';
import { Container, Row, Col, Card, Nav, Tab, Badge, Button } from 'react-bootstrap';
import { FaUser, FaShoppingBag, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { User } from '../types/index';

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
  defaultTab?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, onBack, defaultTab = 'orders' }) => {
  // Mock Orders Data
  const mockOrders: Order[] = [
    {
      id: 'ORD-2403-001',
      date: '2024-03-15',
      total: 12999,
      status: 'Delivered',
      items: [
        { name: 'Nike Men\'s Running Shoe', quantity: 1, price: 12999, image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600' }
      ]
    },
    {
      id: 'ORD-2402-045',
      date: '2024-02-28',
      total: 4598,
      status: 'Shipped',
      items: [
        { name: 'Puma Casual Shoes', quantity: 1, price: 4598, image: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=600' }
      ]
    }
  ];

  return (
    <Container className="py-5 fade-in">
      <div className="mb-4 d-flex align-items-center gap-3">
        <Button variant="light" className="rounded-circle p-2 border" onClick={onBack}>
          <FaArrowLeft size={20} className="text-dark" />
        </Button>
        <h2 className="fw-bold mb-0">My Account</h2>
      </div>

      <Tab.Container id="profile-tabs" defaultActiveKey={defaultTab}>
        <Row className="g-4">
          <Col lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-0">
                <div className="p-4 text-center border-bottom">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '32px' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h5 className="fw-bold mb-1">{user.name}</h5>
                  <small className="text-muted">{user.email}</small>
                </div>
                <Nav variant="pills" className="flex-column p-2">
                  <Nav.Item>
                    <Nav.Link eventKey="info" className="py-3 px-3 d-flex align-items-center gap-3 fw-medium">
                      <FaUser className="text-muted" /> Personal Info
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders" className="py-3 px-3 d-flex align-items-center gap-3 fw-medium">
                      <FaShoppingBag className="text-muted" /> Order History
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mt-2 pt-2 border-top">
                    <Nav.Link className="py-3 px-3 d-flex align-items-center gap-3 fw-medium text-danger" onClick={onLogout} style={{ cursor: 'pointer' }}>
                      <FaSignOutAlt /> Logout
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={9}>
            <Tab.Content>
              <Tab.Pane eventKey="info">
                <Card className="border-0 shadow-sm p-4">
                  <h4 className="fw-bold mb-4">Personal Information</h4>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Member Since:</strong> {user.joinDate}</p>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="orders">
                <Card className="border-0 shadow-sm p-4">
                  <h4 className="fw-bold mb-4">Order History</h4>
                  {mockOrders.map(order => (
                    <Card key={order.id} className="mb-3 border-light bg-light">
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="fw-bold">#{order.id}</span>
                          <Badge bg={order.status === 'Delivered' ? 'success' : 'warning'}>{order.status}</Badge>
                        </div>
                        <div className="text-muted small mb-2">{order.date}</div>
                        <div className="d-flex gap-3 mt-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="d-flex align-items-center gap-2">
                              <img src={item.image} alt={item.name} width="50" height="50" className="rounded" style={{ objectFit: 'cover' }} />
                              <div>
                                <div className="small fw-bold">{item.name}</div>
                                <div className="small text-muted">Qty: {item.quantity}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-2 border-top d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Total: ₹{order.total.toLocaleString('en-IN')}</span>
                          <Button variant="outline-primary" size="sm">View Details</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default ProfilePage;