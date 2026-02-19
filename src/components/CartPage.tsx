import React from 'react';
import { Container, Row, Col, Card, Button, Image, Badge, Alert } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingBag, FaTruck, FaGift, FaLock } from 'react-icons/fa';
import { Product } from '../types/index';

interface CartPageProps {
  cart: (Product & { quantity: number; size?: number })[];
  onRemove: (productId: number, size?: number) => void;
  onUpdateQuantity: (productId: number, quantity: number, size?: number) => void;
  onCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onRemove, onUpdateQuantity, onCheckout }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 499 ? 0 : 99;
  const discountAmount = Math.floor(subtotal * 0.05);
  const total = subtotal + shippingCost - discountAmount;

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center py-5">
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
          <h2 className="fw-bold mb-3">Your cart is empty</h2>
          <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
          <Button variant="primary" className="rounded-pill px-5 py-2 fw-medium">
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
        <Button variant="light" className="rounded-circle p-2 border">
          <FaArrowLeft size={20} className="text-dark" />
        </Button>
        <h1 className="fw-bold mb-0" style={{ fontSize: '32px' }}>Shopping Cart</h1>
        <Badge bg="primary" pill className="ms-auto fw-bold px-3 py-2" style={{ fontSize: '14px' }}>
          {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
        </Badge>
      </div>

      {subtotal > 5000 && (
        <Alert variant="success" className="d-flex align-items-center gap-2 mb-4" style={{ background: '#e8f5e9', borderColor: '#81c784', color: '#2e7d32' }}>
          <FaGift size={18} />
          <span className="fw-medium">🎉 Great! You qualify for FREE SHIPPING on this order</span>
        </Alert>
      )}

      <Row className="g-4">
        {/* Cart Items */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              {cart.map((item, index) => (
                <div key={item.id} className={`p-4 d-flex gap-4 align-items-start ${index !== cart.length - 1 ? 'border-bottom' : ''}`}>
                  {/* Product Image */}
                  <div style={{ position: 'relative' }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    {item.isNew && (
                      <Badge bg="success" className="position-absolute top-0 end-0 m-2">NEW</Badge>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <small className="text-primary fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                          {item.brand}
                        </small>
                        <h6 className="fw-bold mb-1" style={{ fontSize: '16px' }}>{item.name}</h6>
                        <small className="text-muted d-block">{item.category} | {item.gender} {item.size && `| Size: ${item.size}`}</small>
                      </div>
                      <Button
                        variant="link"
                        className="text-danger p-0 text-decoration-none"
                        onClick={() => onRemove(item.id, item.size)}
                        title="Remove item"
                      >
                        <FaTrash size={18} />
                      </Button>
                    </div>

                    {/* Quantity & Price */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="d-flex align-items-center gap-2 bg-light rounded-pill p-2" style={{ width: 'fit-content' }}>
                        <Button
                          variant="link"
                          className="text-dark p-1 text-decoration-none"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.size)}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={12} />
                        </Button>
                        <span className="fw-bold" style={{ width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                        <Button
                          variant="link"
                          className="text-dark p-1 text-decoration-none"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.size)}
                        >
                          <FaPlus size={12} />
                        </Button>
                      </div>

                      <div className="text-end">
                        <div className="text-muted small mb-1">
                          ₹{item.price.toLocaleString('en-IN')} × {item.quantity}
                        </div>
                        <div className="fw-bold h6 mb-0" style={{ color: '#0d6efd' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 pb-3 border-bottom">Order Summary</h5>

              {/* Price Breakdown */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Shipping</span>
                  <span className={shippingCost === 0 ? 'text-success fw-medium' : 'fw-medium'}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Discount (5%)</span>
                    <span className="text-success fw-medium">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              <div className="bg-light p-3 rounded-3 mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-dark" style={{ fontSize: '16px' }}>Total Amount</span>
                  <span className="fw-bold text-primary" style={{ fontSize: '22px' }}>
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-100 fw-bold rounded-pill mb-3 py-3"
                style={{ fontSize: '16px' }}
                onClick={onCheckout}
              >
                <FaLock className="me-2" size={16} />
                Proceed to Checkout
              </Button>

              {/* Continue Shopping */}
              <Button
                variant="outline-secondary"
                size="lg"
                className="w-100 fw-bold rounded-pill py-3"
                style={{ fontSize: '16px' }}
              >
                <FaShoppingBag className="me-2" size={16} />
                Continue Shopping
              </Button>

              {/* Benefits */}
              <div className="mt-4 pt-3 border-top">
                <h6 className="fw-bold mb-3" style={{ fontSize: '14px' }}>Why shop with us?</h6>

                <div className="d-flex gap-2 mb-2">
                  <FaTruck className="text-primary mt-1" size={16} style={{ flexShrink: 0 }} />
                  <div>
                    <small className="fw-bold d-block">Free Shipping on orders above ₹499</small>
                    <small className="text-muted"> For all members</small>
                  </div>
                </div>

                <div className="d-flex gap-2 mb-2">
                  <FaGift className="text-success mt-1" size={16} style={{ flexShrink: 0 }} />
                  <div>
                    <small className="fw-bold d-block">Earn Loyalty Points</small>
                    <small className="text-muted">On every purchase</small>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <FaLock className="text-danger mt-1" size={16} style={{ flexShrink: 0 }} />
                  <div>
                    <small className="fw-bold d-block">100% Secure</small>
                    <small className="text-muted">Verified payments</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
