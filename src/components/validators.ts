export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
export const PHONE_REGEX = /^\d{10}$/;

export const validateEmail = (email: string) => EMAIL_REGEX.test(email);
export const validatePassword = (password: string) => PASSWORD_REGEX.test(password);
export const validatePhone = (phone: string) => PHONE_REGEX.test(phone);
