import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../utils/authContext";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: "login" | "register";
  onLoginSuccess?: (user: {
    email: string;
    name?: string;
    phoneNumber?: string;
    joinDate?: string;
  }) => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  isOpen,
  onClose,
  initialMode,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMode(initialMode);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    });
    setErrors({});
    setMessage(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [initialMode, isOpen]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d{10}$/.test(phone);
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.{8,})/.test(password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === "register") {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = "Phone must be 10 digits";
      }
    } else {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (mode === "register" && !validatePassword(formData.password)) {
      newErrors.password = "Password must have 8+ chars, 1 uppercase, 1 digit";
    }

    if (mode === "register") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (mode === "login") {
        const result = login(formData.email, formData.password);
        if (result.success) {
          setMessage({
            type: "success",
            text: "Login successful! Redirecting...",
          });
          setTimeout(() => {
            onLoginSuccess?.({ email: formData.email });
            onClose();
          }, 1500);
        } else {
          setMessage({ type: "error", text: result.message || "Login failed" });
        }
      } else {
        const result = register(
          formData.fullName,
          formData.email,
          formData.phone,
          formData.password,
        );
        if (result.success) {
          setMessage({
            type: "success",
            text: "Registration successful! Redirecting...",
          });
          setTimeout(() => {
            onLoginSuccess?.({
              email: formData.email,
              name: formData.fullName,
            });
            onClose();
          }, 1500);
        } else {
          setMessage({
            type: "error",
            text: result.message || "Registration failed",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const userData = {
        email: user.email || "",
        name: user.displayName || "",
        phoneNumber: user.phoneNumber || "",
        joinDate: new Date().toISOString(),
      };

      setMessage({
        type: "success",
        text: `Successfully logged in with Google!`,
      });

      setTimeout(() => {
        onLoginSuccess?.(userData);
        onClose();
      }, 800);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Authentication failed",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 py-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-xl shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 transition-colors z-10"
          >
            <X size={20} />
          </button>
          <div
            className="overflow-y-auto p-8 scrollbar-hide"
            style={{ maxHeight: "calc(100vh - 6rem)" }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2 uppercase tracking-tight">
                {mode === "login"
                  ? "Welcome Back"
                  : "Create Account"}
              </h2>
              <p className="text-neutral-500 text-sm">
                {mode === "login"
                  ? "Sign in to your account to continue"
                  : "Join UrbanSteps for exclusive deals"}
              </p>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  message.type === "error"
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {message.type === "error" ? (
                  <AlertCircle size={20} className="flex-shrink-0" />
                ) : (
                  <CheckCircle size={20} className="flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{message.text}</span>
              </motion.div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`w-full bg-neutral-50 border rounded-lg py-3 pl-10 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all text-sm ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-neutral-200"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-red-500 text-xs">
                      {errors.fullName}
                    </span>
                  )}
                </div>
              )}

              <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      size={18}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className={`w-full bg-neutral-50 border rounded-lg py-3 pl-10 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all text-sm ${
                        errors.email ? "border-red-500" : "border-neutral-200"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-xs">{errors.email}</span>
                  )}
                </div>

              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      size={18}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      maxLength={10}
                      className={`w-full bg-neutral-50 border rounded-lg py-3 pl-10 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all text-sm ${
                        errors.phone ? "border-red-500" : "border-neutral-200"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-red-500 text-xs">{errors.phone}</span>
                  )}
                </div>
              )}

              <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      size={18}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Minimum 8 characters"
                      className={`w-full bg-neutral-50 border rounded-lg py-3 pl-10 pr-10 outline-none focus:border-amber-500 focus:bg-white transition-all text-sm ${
                        errors.password
                          ? "border-red-500"
                          : "border-neutral-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      {errors.password}
                    </span>
                  )}
                  {mode === "register" && (
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Must contain: uppercase letter, number, 8+ characters
                    </p>
                  )}
                </div>

              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      size={18}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-enter password"
                      className={`w-full bg-neutral-50 border rounded-lg py-3 pl-10 pr-10 outline-none focus:border-amber-500 focus:bg-white transition-all text-sm ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-neutral-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-xs">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              )}

              {mode === "login" && (
                <div className="flex items-center justify-between py-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="rounded border-neutral-300"
                    />
                    <span className="text-xs text-neutral-500">
                      Remember Me
                    </span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/10 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : mode === "login"
                    ? "Sign In"
                    : "Create Account"}
              </button>
            </form>

            <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-neutral-500 text-[10px] font-bold uppercase tracking-widest">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={handleSocialLogin}
                    disabled={loading}
                    className="flex items-center justify-center w-full px-4 py-3 border border-neutral-200 rounded-lg shadow-sm bg-white hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="h-5 w-5 text-red-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-500">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() => {
                    setMode(mode === "login" ? "register" : "login");
                    setErrors({});
                    setMessage(null);
                  }}
                  className="text-amber-700 font-bold hover:underline"
                >
                  {mode === "login" ? "Register" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
