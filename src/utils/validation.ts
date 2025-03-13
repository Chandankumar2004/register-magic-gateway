
export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateUsername = (username: string): ValidationResult => {
  if (!username || username.length < 3) {
    return {
      isValid: false,
      errorMessage: 'Username must be at least 3 characters long'
    };
  }
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      errorMessage: 'Password must be at least 8 characters long'
    };
  }
  
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      errorMessage: 'Password must contain at least one uppercase letter'
    };
  }
  
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      errorMessage: 'Password must contain at least one number'
    };
  }
  
  return { isValid: true };
};

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return {
      isValid: false,
      errorMessage: 'Please enter a valid email address'
    };
  }
  return { isValid: true };
};

export const validateFullName = (name: string): ValidationResult => {
  if (!name || name.length < 2) {
    return {
      isValid: false,
      errorMessage: 'Name must be at least 2 characters long'
    };
  }
  return { isValid: true };
};

export const validatePayment = (payment: string): ValidationResult => {
  if (!payment || payment.trim() === '') {
    return {
      isValid: false,
      errorMessage: 'Payment information is required'
    };
  }
  return { isValid: true };
};

export const validateDate = (date: string): ValidationResult => {
  if (!date) {
    return {
      isValid: false,
      errorMessage: 'Date is required'
    };
  }
  
  const selectedDate = new Date(date);
  const currentDate = new Date();
  
  if (selectedDate > currentDate) {
    return {
      isValid: false,
      errorMessage: 'Date cannot be in the future'
    };
  }
  
  return { isValid: true };
};
