import AsyncStorage from '@react-native-async-storage/async-storage';
let userDetails = 'user_Details';

const setUserDetails = async data => {
  try {
    await AsyncStorage.setItem(userDetails, JSON.stringify(data));
  } catch (e) {
    console.error(e.message());
  }
};
const getUserDetails = async () => {
  try {
    let result = await AsyncStorage.getItem(userDetails);
    if (result) {
      return JSON.parse(result);
    }
    return false;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
export {
    setUserDetails,
    getUserDetails
}
