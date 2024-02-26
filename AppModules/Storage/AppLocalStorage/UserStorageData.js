import {MMKV} from 'react-native-mmkv';
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
export {setUserDetails, getUserDetails, flushUserOnLogOut};
