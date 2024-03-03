import {Platform} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Optional configuration
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
export const HapticFeedback = (method = 'impactMedium') => {
  return ReactNativeHapticFeedback.trigger(method, options);
};
// Trigger haptic feedback
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
const objectMap = {
  MT: 'Metric Tonne',
  QT: 'Quintal',
  KG: 'Kilogram',
  G: 'grams',
};
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

export function dateFormat(date) {
  const parsedDate = new Date(date);

  // Extracting date components
  const year = parsedDate.getUTCFullYear();
  const month = parsedDate.getUTCMonth() + 1; // Months are zero-based
  const day = parsedDate.getUTCDate();

  // Creating a formatted date string (e.g., "2024-02-25")
  return `${year}-${month < 10 ? '0' : ''}${month}-${
    day < 10 ? '0' : ''
  }${day}`;
}

export function isStartWithF(string) {
  return string.startsWith('F');
}
