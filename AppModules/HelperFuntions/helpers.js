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
const objectMap = {MT: 'Metric Tonne', QT: 'Quintal', KG: 'Kilogram'};
export function getLongName(value) {
  const key = value.toUpperCase();

  // Check if the key exists in the objectMap
  if (objectMap.hasOwnProperty(key)) {
    return objectMap[key];
  } else {
    // Return a default value or handle the case when the key is not found
    return 'Not found';
  }
}
