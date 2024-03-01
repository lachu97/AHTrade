import {MMKV} from 'react-native-mmkv';
import {storage} from './ProductsStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
let USER_DETAILS = 'user_Details';
const userStorage = new MMKV();
const setUserDetails = data => {
  try {
    userStorage.set(USER_DETAILS, JSON.stringify(data));
  } catch (e) {
    console.error(e.message());
  }
};
const getUserDetails = async () => {
  try {
    let hasData = userStorage.contains(USER_DETAILS);
    if (hasData) {
      return JSON.parse(userStorage.getString(USER_DETAILS));
    }
    return false;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
const flushUserOnLogOut = () => {
  userStorage.delete(USER_DETAILS);
  console.log('After' + userStorage.getAllKeys());
};
const clearAllAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};
const flushEverythingOnLogOut = async () => {
  const keys = storage.getAllKeys();
  keys.forEach(key => storage.delete(key));
  await clearAllAsyncStorage();
  console.log('After' + userStorage.getAllKeys());
};
export {
  setUserDetails,
  getUserDetails,
  flushUserOnLogOut,
  flushEverythingOnLogOut,
};
