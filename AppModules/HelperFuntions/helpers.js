import {Platform} from 'react-native';

export const isIos = () => {
  return Platform.OS === 'ios';
};
export const isValidElement = ele => {
  return ele !== null && ele !== undefined;
};
export function validateEmail(email) {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regex
  return email.trim() !== '' && emailRegex.test(email);
}
