import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import { User } from '../types';
import { validateEmail, validatePassword } from '../utils/validators';

interface LoginModalProps {
  show: boolean;
  onHide: () => void;
  onLoginSuccess: (user: User, rememberMe: boolean) => void;
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void;
  onGuestLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onHide, onLoginSuccess, onRegisterClick, onForgotPasswordClick, onGuestLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError('');
    setEmailError(value.trim() && !validateEmail(value) ? 'Please enter a valid email address' : '');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setError('');
    setPasswordError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      onLoginSuccess(user, rememberMe);
      setEmail('');
      setPassword('');
      setRememberMe(false);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold text-dark" style={{ fontSize: '20px' }}>
          Login to Your Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pt-3 pb-4">
        {error && (
          <Alert variant="danger" className="d-flex align-items-center gap-2 mb-3">
            <FaTimes size={16} />
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleLogin} autoComplete="off">
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold mb-2">
              Email Address <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              isInvalid={!!emailError}
              autoComplete="off"
              required
              className="py-3"
              style={{
                background: '#f8f9fa',
                border: emailError ? '1px solid #dc3545' : '1px solid #dee2e6',
              }}
            />
            {emailError && (
              <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                <FaTimes size={14} /> {emailError}
              </div>
            )}
            {email && !emailError && validateEmail(email) && (
              <div className="text-success small mt-2 d-flex align-items-center gap-1">
                <FaCheck size={14} /> Valid email
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold mb-2">
              Password <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
            </Form.Label>
            <div className="mb-2 text-success small fw-bold">
              Criteria: Min 8 chars, 1 digit, 1 uppercase letter
            </div>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                isInvalid={!!passwordError}
                autoComplete="off"
                className="pe-5 py-3"
                required
                style={{
                  background: '#f8f9fa',
                  border: passwordError ? '1px solid #dc3545' : '1px solid #dee2e6',
                }}
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted border-0"
                onClick={() => setShowPassword(!showPassword)}
                style={{ zIndex: 10, marginTop: '-8px' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordError && (
              <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                <FaTimes size={14} /> {passwordError}
              </div>
            )}
            {password && validatePassword(password) && (
              <div className="text-success small mt-2 d-flex align-items-center gap-1">
                <FaCheck size={14} /> Strong password
              </div>
            )}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Form.Check 
                type="checkbox" 
                label="Remember me" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span 
                className="text-primary small fw-bold" 
                style={{cursor: 'pointer'}} 
                onClick={onForgotPasswordClick}
                role="button"
                tabIndex={0}
              >
                Forgot Password?
              </span>
            </div>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 py-3 fw-bold"
            disabled={!email || !password || !!emailError || !!passwordError}
          >
            Login
          </Button>
        </Form>

        <div className="mt-4 text-center border-top pt-3">
          <small className="text-muted">
            Don't have an account? <span className="text-primary fw-bold" style={{cursor: 'pointer'}} onClick={onRegisterClick} role="button" tabIndex={0}>Register here</span>
          </small>
        </div>
        
        <div className="text-center mt-3">
          <Button variant="outline-secondary" size="sm" className="text-decoration-none" onClick={onGuestLogin}>
            Continue as Guest
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;