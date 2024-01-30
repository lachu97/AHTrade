import {Platform} from 'react-native';

export const isIos = () => {
  return Platform.OS === 'ios';
};
export const isValidElement = ele => {
  return ele !== null && ele !== undefined && ele !== '';
};
