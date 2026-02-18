import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Alert,
  ProgressBar,
} from "react-bootstrap";
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { User } from '../types';
import { getPasswordValidationErrors, passwordsMatch, validateEmail, validateName, validatePassword, validatePhone, getPasswordStrength as calculatePasswordStrength } from "../utils/validators";

interface RegisterModalProps {
  show: boolean;
  onHide: () => void;
  onLoginClick: () => void;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  show,
  onHide,
  onLoginClick,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleModalClose = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    setAgreeTerms(false);
    setErrors({});
    setSuccessMessage("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    onHide();
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setErrors(prev => ({ ...prev, name: value.trim() && !validateName(value) ? "Name must be 3+ characters and contain only letters, spaces, hyphens, or apostrophes" : undefined }));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors(prev => ({ ...prev, email: value.trim() && !validateEmail(value) ? "Please enter a valid email address" : undefined }));
  };

  const handlePhoneChange = (value: string) => {
    const cleanedPhone = value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(cleanedPhone);
    setErrors(prev => ({ ...prev, phoneNumber: cleanedPhone.length > 0 && !validatePhone(cleanedPhone) ? "Phone number must be exactly 10 digits" : undefined }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors(prev => ({
      ...prev,
      password: value && !validatePassword(value) ? "Password does not meet criteria" : undefined,
      confirmPassword: confirmPassword && !passwordsMatch(value, confirmPassword) ? "Passwords do not match" : undefined
    }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setErrors(prev => ({ ...prev, confirmPassword: value && !passwordsMatch(password, value) ? "Passwords do not match" : undefined }));
  };

  const passwordStrength = calculatePasswordStrength(password);
  const passwordValidationErrors = getPasswordValidationErrors(password);
  const isPasswordValid = validatePassword(password);

  const handleValidation = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!name.trim() || !validateName(name)) {
      newErrors.name = "Full name is required (3+ characters, letters/spaces/hyphens/apostrophes only)";
    }

    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = "Valid email is required";
    }

    if (!phoneNumber.trim() || !validatePhone(phoneNumber)) {
      newErrors.phoneNumber = "Valid 10-digit phone number is required";
    }

    if (!password || !validatePassword(password)) {
      newErrors.password = "Password must be 8+ characters with 1 digit and 1 uppercase letter";
    }

    if (!passwordsMatch(password, confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!handleValidation()) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u: any) => u.email === email)) {
      setErrors({ ...errors, email: "User with this email already exists" });
      return;
    }

    const newUser = {
      name,
      email,
      phoneNumber,
      password,
      joinDate: new Date().toISOString().split("T")[0],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccessMessage("✓ Registration successful! Redirecting to login...");
    setTimeout(() => {
      onLoginClick();
      handleModalClose();
    }, 1500);
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold text-dark" style={{ fontSize: "24px" }}>
          Create Your Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pt-2 pb-4">
        <p className="text-muted mb-4">
          Join us to unlock exclusive offers, track orders, and more!
        </p>

        {successMessage && (
          <Alert
            variant="success"
            className="mb-4 d-flex align-items-center gap-2"
          >
            <FaCheck size={18} />
            {successMessage}
          </Alert>
        )}

        <Form onSubmit={handleRegister} autoComplete="off">
          {/* Full Name */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold mb-2">
              Full Name <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              autoComplete="off"
              className={`rounded-lg py-3 ${errors.name ? "is-invalid border-danger" : ""}`}
              style={{
                background: "#f8f9fa",
                border: errors.name ? "1px solid #dc3545" : "1px solid #dee2e6",
              }}
            />
            {errors.name && (
              <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                <FaTimes size={14} /> {errors.name}
              </div>
            )}
            {name && !errors.name && (
              <div className="text-success small mt-2 d-flex align-items-center gap-1">
                <FaCheck size={14} /> Valid name
              </div>
            )}
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold mb-2">
              Email Address <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              autoComplete="off"
              className={`rounded-lg py-3 ${errors.email ? "is-invalid border-danger" : ""}`}
              style={{
                background: "#f8f9fa",
                border: errors.email ? "1px solid #dc3545" : "1px solid #dee2e6",
              }}
            />
            {errors.email && (
              <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                <FaTimes size={14} /> {errors.email}
              </div>
            )}
            {email && !errors.email && (
              <div className="text-success small mt-2 d-flex align-items-center gap-1">
                <FaCheck size={14} /> Valid email
              </div>
            )}
          </Form.Group>

          {/* Phone Number */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold mb-2">
              Phone Number <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your 10-digit phone number"
              value={phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
              autoComplete="off"
              className={`rounded-lg py-3 ${errors.phoneNumber ? "is-invalid border-danger" : ""}`}
              style={{
                background: "#f8f9fa",
                border: errors.phoneNumber ? "1px solid #dc3545" : "1px solid #dee2e6",
              }}
              maxLength={10}
            />
            {errors.phoneNumber && (
              <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                <FaTimes size={14} /> {errors.phoneNumber}
              </div>
            )}
            {phoneNumber && !errors.phoneNumber && (
              <div className="text-success small mt-2 d-flex align-items-center gap-1">
                <FaCheck size={14} /> Valid phone
              </div>
            )}
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold mb-2">
              Password <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
            </Form.Label>
            
            {/* Password Criteria */}
            <div className="mb-3 p-3" style={{ background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: '6px' }}>
              <div className="text-success fw-bold small mb-2">Password Requirements:</div>
              <div className="small" style={{ color: '#22c55e' }}>
                {passwordValidationErrors.length === 0 && password ? (
                  <div className="d-flex align-items-center gap-2">
                    <FaCheck size={14} /> All requirements met!
                  </div>
                ) : (
                  <ul className="mb-0 ps-3">
                    <li>At least 8 characters {password.length >= 8 ? <FaCheck className="text-success" size={12} style={{marginLeft: '4px'}} /> : ''}</li>
                    <li>At least 1 digit (0-9) {/\d/.test(password) ? <FaCheck className="text-success" size={12} style={{marginLeft: '4px'}} /> : ''}</li>
                    <li>At least 1 uppercase letter (A-Z) {/[A-Z]/.test(password) ? <FaCheck className="text-success" size={12} style={{marginLeft: '4px'}} /> : ''}</li>
                  </ul>
                )}
              </div>
            </div>

            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                autoComplete="new-password"
                className={`rounded-lg py-3 pe-5 ${errors.password ? "is-invalid border-danger" : ""}`}
                style={{
                  background: "#f8f9fa",
                  border: errors.password ? "1px solid #dc3545" : "1px solid #dee2e6",
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

            {/* Password Strength Bar */}
            {password && (
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

            {errors.password && (
              <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                <FaTimes size={14} /> {errors.password}
              </div>
            )}
            {password && isPasswordValid && (
              <div className="text-success small mt-2 d-flex align-items-center gap-1">
                <FaCheck size={14} /> Valid password
              </div>
            )}
          </Form.Group>

          {/* Confirm Password */}
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
                autoComplete="new-password"
                className={`rounded-lg py-3 pe-5 ${errors.confirmPassword ? "is-invalid border-danger" : ""}`}
                style={{
                  background: "#f8f9fa",
                  border: errors.confirmPassword ? "1px solid #dc3545" : "1px solid #dee2e6",
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
            {errors.confirmPassword && (
              <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                <FaTimes size={14} /> {errors.confirmPassword}
              </div>
            )}
            {confirmPassword &&
              passwordsMatch(password, confirmPassword) &&
              !errors.confirmPassword && (
                <div className="text-success small mt-2 d-flex align-items-center gap-1">
                  <FaCheck size={14} /> Passwords match
                </div>
              )}
          </Form.Group>

          {/* Terms & Conditions */}
          <Form.Group className="mb-4">
            <div className="d-flex align-items-center gap-2">
              <Form.Check
                type="checkbox"
                id="termsCheck"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  setErrors({ ...errors, terms: e.target.checked ? undefined : "You must agree to the terms and conditions" });
                }}
                style={{ marginTop: 0 }}
              />
              <label htmlFor="termsCheck" className="text-muted small mb-0">
                I agree to the{" "}
                <span className="text-primary fw-bold">Terms & Conditions</span>{" "}
                and <span className="text-primary fw-bold">Privacy Policy</span> <span style={{ color: '#dc3545', fontSize: '16px' }}>★</span>
              </label>
            </div>
            {errors.terms && (
              <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                <FaTimes size={14} /> {errors.terms}
              </div>
            )}
          </Form.Group>

          {/* Register Button */}
          <Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 py-3 fw-bold rounded-lg mb-3"
              disabled={
                !name || !email || !phoneNumber || !password || !confirmPassword || !agreeTerms || Object.values(errors).some(e => !!e)
              }
            >
              Create Account
            </Button>
          </Form.Group>
        </Form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-muted small">
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-decoration-none fw-bold p-0"
              onClick={() => {
                handleModalClose();
                onLoginClick();
              }}
            >
              Login here
            </Button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
