export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  if (password.length < 8) return false;
  if (!/\d/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  return true;
};

export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 10;
};

export const validateName = (name: string): boolean => {
  if (!name.trim() || name.trim().length < 3) return false;
  return /^[a-zA-Z\s'-]+$/.test(name);
};

export const getPasswordValidationErrors = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < 8) errors.push('At least 8 characters');
  if (!/\d/.test(password)) errors.push('At least 1 digit (0-9)');
  if (!/[A-Z]/.test(password)) errors.push('At least 1 uppercase letter (A-Z)');
  return errors;
};

export const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

  const strengthMap: Record<number, { score: number; label: string; color: string }> = {
    0: { score: 0, label: 'Very Weak', color: 'danger' },
    1: { score: 20, label: 'Weak', color: 'danger' },
    2: { score: 40, label: 'Fair', color: 'warning' },
    3: { score: 60, label: 'Good', color: 'success' },
    4: { score: 80, label: 'Strong', color: 'success' },
    5: { score: 90, label: 'Very Strong', color: 'success' },
    6: { score: 100, label: 'Excellent', color: 'success' },
  };
  return strengthMap[Math.min(score, 6)];
};

export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password.length > 0;
};
