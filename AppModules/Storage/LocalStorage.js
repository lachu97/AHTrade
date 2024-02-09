import AsyncStorage from '@react-native-async-storage/async-storage';
import reactotron from 'reactotron-react-native';
let loginKey = 'Login';
let guestKey = 'Login';
export const storeIsLoggedIn = async (value = false) => {
  try {
    await AsyncStorage.setItem(loginKey, JSON.stringify(value));
  } catch (e) {
    reactotron.log('Error in Async Storage =' + e.message);
  }
};
export const setIsGuestUser = async (value = false) => {
  try {
    await AsyncStorage.setItem(guestKey, JSON.stringify(value));
  } catch (e) {
    reactotron.log('Error in Async Storage =' + e.message);
  }
};
export const getIsGuestUser = async () => {
  try {
    const value = await AsyncStorage.getItem(guestKey);
    if (value === 'true') {
      return true;
    }
    return false;
  } catch (e) {
    reactotron.log('Error in Async Storage =' + e.message);
    return false;
  }
};
export const getLoggedIn = async () => {
  try {
    const value = await AsyncStorage.getItem(loginKey);
    if (value === 'true') {
      return true;
    }
    return false;
  } catch (e) {
    reactotron.log('Error in Async Storage =' + e.message);
    return false;
  }
};
