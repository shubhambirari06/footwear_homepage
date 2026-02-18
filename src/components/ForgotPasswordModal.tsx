import React, { useState } from 'react';
import { Modal, Button, Form, Alert, ProgressBar } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import { passwordsMatch, getPasswordValidationErrors, validateEmail, validatePhone, validatePassword, getPasswordStrength as calculatePasswordStrength } from '../utils/validators';

interface ForgotPasswordModalProps {
  show: boolean;
  onHide: () => void;
  onLoginClick: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ show, onHide, onLoginClick }) => {
  const [step, setStep] = useState(1); // 1: Verify, 2: Reset
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'danger', text: string } | null>(null);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(value.trim() && !validateEmail(value) ? 'Please enter a valid email address' : '');
  };

  const handlePhoneChange = (value: string) => {
    const cleanedPhone = value.replace(/\D/g, '').slice(0, 10);
    setPhone(cleanedPhone);
    setPhoneError(cleanedPhone.length > 0 && !validatePhone(cleanedPhone) ? 'Phone number must be exactly 10 digits' : '');
  };

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordError(value && !validatePassword(value) ? 'Password does not meet criteria' : '');
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setConfirmPasswordError(value && !passwordsMatch(newPassword, value) ? 'Passwords do not match' : '');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email.trim() || !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!phone.trim() || !validatePhone(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.phoneNumber === phone);

    if (user) {
      setStep(2);
    } else {
      setMessage({ type: 'danger', text: 'No account found matching these details.' });
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!newPassword || !validatePassword(newPassword)) {
      setPasswordError('Password must be 8+ characters with 1 digit and 1 uppercase letter');
      return;
    }

    if (!confirmPassword || !passwordsMatch(newPassword, confirmPassword)) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === email);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setTimeout(() => {
        handleClose();
        onLoginClick();
      }, 1500);
    } else {
      setMessage({ type: 'danger', text: 'An error occurred. Please try again.' });
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail('');
    setPhone('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage(null);
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onHide();
  };

  const passwordStrength = calculatePasswordStrength(newPassword);
  const passwordValidationErrors = getPasswordValidationErrors(newPassword);

  return (
    <Modal show={show} onHide={handleClose} centered autoFocus>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold text-dark" style={{ fontSize: '20px' }}>
          {step === 1 ? 'Reset Your Password' : 'Create New Password'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pt-3 pb-4">
        {message && (
          <Alert variant={message.type} className="d-flex align-items-center gap-2 mb-3">
            {message.type === 'success' ? <FaCheck size={16} /> : <FaTimes size={16} />}
            {message.text}
          </Alert>
        )}
        
        {step === 1 ? (
          // Verification Step
          <Form onSubmit={handleVerify} autoComplete="off">
            <p className="text-muted small mb-4">
              Enter your registered email and phone number to verify your identity.
            </p>
            
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold mb-2">
                Email Address <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                isInvalid={!!emailError}
                autoComplete="off"
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
              {email && !emailError && (
                <div className="text-success small mt-2 d-flex align-items-center gap-1">
                  <FaCheck size={14} /> Valid email
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold mb-2">
                Phone Number <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your 10-digit phone number"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                isInvalid={!!phoneError}
                autoComplete="off"
                className="py-3"
                maxLength={10}
                style={{
                  background: '#f8f9fa',
                  border: phoneError ? '1px solid #dc3545' : '1px solid #dee2e6',
                }}
              />
              {phoneError && (
                <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                  <FaTimes size={14} /> {phoneError}
                </div>
              )}
              {phone && !phoneError && (
                <div className="text-success small mt-2 d-flex align-items-center gap-1">
                  <FaCheck size={14} /> Valid phone
                </div>
              )}
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-3 fw-bold"
              disabled={!email || !phone || !!emailError || !!phoneError}
            >
              Verify Identity
            </Button>
          </Form>
        ) : (
          // Password Reset Step
          <Form onSubmit={handleReset} autoComplete="off">
            <p className="text-muted small mb-4">
              Create a strong new password for your account.
            </p>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold mb-2">
                New Password <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
              </Form.Label>
              
              {/* Password Criteria */}
              <div className="mb-3 p-3" style={{ background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: '6px' }}>
                <div className="text-success fw-bold small mb-2">Password Requirements:</div>
                <div className="small" style={{ color: '#22c55e' }}>
                  {passwordValidationErrors.length === 0 && newPassword ? (
                    <div className="d-flex align-items-center gap-2">
                      <FaCheck size={14} /> All requirements met!
                    </div>
                  ) : (
                    <ul className="mb-0 ps-3">
                      <li>At least 8 characters {newPassword.length >= 8 ? <FaCheck className="text-success" size={12} style={{marginLeft: '4px'}} /> : ''}</li>
                      <li>At least 1 digit (0-9) {/\d/.test(newPassword) ? <FaCheck className="text-success" size={12} style={{marginLeft: '4px'}} /> : ''}</li>
                      <li>At least 1 uppercase letter (A-Z) {/[A-Z]/.test(newPassword) ? <FaCheck className="text-success" size={12} style={{marginLeft: '4px'}} /> : ''}</li>
                    </ul>
                  )}
                </div>
              </div>

              <div className="position-relative">
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  isInvalid={!!passwordError}
                  autoComplete="new-password"
                  className="pe-5 py-3"
                  style={{
                    background: '#f8f9fa',
                    border: passwordError ? '1px solid #dc3545' : '1px solid #dee2e6',
                  }}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted border-0"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{ zIndex: 10, marginTop: '-8px' }}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Strength Bar */}
              {newPassword && (
                <div className="mt-2">
                  <small className="d-block mb-1 fw-medium">
                    Strength:{" "}
                    <span className={`text-${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </small>
                  <ProgressBar
                    now={passwordStrength.score}
                    variant={passwordStrength.color}
                    style={{ height: "6px" }}
                  />
                </div>
              )}

              {passwordError && (
                <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                  <FaTimes size={14} /> {passwordError}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold mb-2">
                Confirm Password <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  isInvalid={!!confirmPasswordError}
                  autoComplete="new-password"
                  className="pe-5 py-3"
                  style={{
                    background: '#f8f9fa',
                    border: confirmPasswordError ? '1px solid #dc3545' : '1px solid #dee2e6',
                  }}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted border-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ zIndex: 10, marginTop: '-8px' }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {confirmPasswordError && (
                <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                  <FaTimes size={14} /> {confirmPasswordError}
                </div>
              )}
              {confirmPassword && passwordsMatch(newPassword, confirmPassword) && !confirmPasswordError && (
                <div className="text-success small mt-2 d-flex align-items-center gap-1">
                  <FaCheck size={14} /> Passwords match
                </div>
              )}
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-3 fw-bold"
              disabled={!newPassword || !confirmPassword || !!passwordError || !!confirmPasswordError}
            >
              Reset Password
            </Button>
          </Form>
        )}

        <div className="text-center mt-4 pt-3 border-top">
          <small className="text-muted">
            Remembered your password? <span className="text-primary fw-bold" style={{cursor: 'pointer'}} onClick={handleClose} role="button" tabIndex={0}>Back to Login</span>
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
