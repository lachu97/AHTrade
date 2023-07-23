import AsyncStorage from '@react-native-async-storage/async-storage';
import reactotron from 'reactotron-react-native';
let loginKey = 'Login';
export const storeIsLoggedIn = async (value = false) => {
  try {
    await AsyncStorage.setItem(loginKey, value.toString());
  } catch (e) {
    reactotron.log('Error in Async Storage =' + e.message);
  }
};
export const getLoggedIn = async () => {
  try {
    const value = await AsyncStorage.getItem(loginKey);
    return value !== null;
  } catch (e) {
    reactotron.log('Error in Async Storage =' + e.message);
    return false;
  }
};
