import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form, Badge, Card, ListGroup } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaMinus, FaPlus, FaStar, FaShareAlt } from 'react-icons/fa';
import { Product } from '../types/index';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: number) => void;
  onSaveForLater: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart, onSaveForLater }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const sizes = [6, 7, 8, 9, 10, 11];
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, user: 'Rahul K.', rating: 5, comment: 'Excellent quality and very comfortable!', date: '2024-03-10' },
    { id: 2, user: 'Priya S.', rating: 4, comment: 'Looks great, but delivery was a bit late.', date: '2024-02-25' }
  ]);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewName, setNewReviewName] = useState('');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: `Check out this ${product?.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;
    
    const review: Review = {
      id: reviews.length + 1,
      user: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    
    setReviews([review, ...reviews]);
    setNewReviewComment('');
    setNewReviewName('');
    setNewReviewRating(5);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} color={i < rating ? '#ffc107' : '#e4e5e9'} size={14} />
    ));
  };

  if (!product) {
    return null;
  }

  return (
    <Modal show={product !== null} onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton className="border-0">
      </Modal.Header>
      <Modal.Body className="pb-5 px-4">
        <Row className="mb-5">
          <Col md={6} className="d-flex align-items-center justify-content-center bg-light rounded-3 p-4">
            <img src={product.image} alt={product.name} className="img-fluid" style={{ maxHeight: '400px', objectFit: 'contain' }} />
          </Col>
          <Col md={6} className="ps-md-4 mt-3 mt-md-0">
            <div className="text-muted small mb-2 text-uppercase fw-bold">{product.brand}</div>
            <h2 className="fw-bold mb-2">{product.name}</h2>
            <div className="mb-3">
              <Badge bg="secondary" className="me-2">{product.gender}</Badge>
              <Badge bg="info">{product.category}</Badge>
            </div>
            <h3 className="text-primary mb-4">₹{product.price.toLocaleString('en-IN')}</h3>
            
            <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>{product.description}</p>
            
            <div className="mb-4">
              <label className="form-label fw-bold">Select Size (UK)</label>
              <div className="d-flex gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'dark' : 'outline-secondary'}
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px' }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Quantity</label>
              <div className="input-group" style={{ width: '140px' }}>
                <Button variant="outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <FaMinus />
                </Button>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-center border-secondary"
                />
                <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)}>
                  <FaPlus />
                </Button>
              </div>
            </div>
            <div className="d-grid gap-2">
              <Button variant="dark" size="lg" onClick={() => {
                if (!selectedSize) {
                  alert('Please select a size');
                  return;
                }
                onAddToCart(product, quantity, selectedSize);
              }}>
                <FaShoppingCart className="me-2" /> Add to Cart
              </Button>
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="lg" className="flex-grow-1" onClick={() => onSaveForLater(product)}>
                  <FaHeart className="me-2" /> Save
                </Button>
                <Button variant="outline-primary" size="lg" className="flex-grow-1" onClick={handleShare}>
                  <FaShareAlt className="me-2" /> Share
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Reviews Section */}
        <div className="mt-4 pt-4 border-top">
          <h4 className="fw-bold mb-4">Customer Reviews ({reviews.length})</h4>
          
          <Card className="mb-4 border-0 bg-light">
            <Card.Body>
              <h6 className="fw-bold mb-3">Write a Review</h6>
              <Form onSubmit={handleAddReview}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="text" 
                        placeholder="Your Name" 
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <div className="d-flex align-items-center mb-3">
                      <span className="me-2 text-muted">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar 
                          key={star} 
                          size={20} 
                          color={star <= newReviewRating ? '#ffc107' : '#e4e5e9'} 
                          style={{ cursor: 'pointer', marginRight: '5px' }}
                          onClick={() => setNewReviewRating(star)}
                        />
                      ))}
                    </div>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Share your thoughts about this product..." 
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" size="sm" className="px-4">Submit Review</Button>
              </Form>
            </Card.Body>
          </Card>

          <ListGroup variant="flush">
            {reviews.map((review) => (
              <ListGroup.Item key={review.id} className="border-bottom py-4 px-0">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-bold mb-1">{review.user}</h6>
                    <div className="mb-2">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <small className="text-muted">{review.date}</small>
                </div>
                <p className="text-muted mb-0 small">{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetail;
