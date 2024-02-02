import AsyncStorage from '@react-native-async-storage/async-storage';

let STATUS = 'nt_Status';

const setNotificationStatus = async value => {
  try {
    await AsyncStorage.setItem(STATUS, JSON.stringify(value));
  } catch (e) {}
};
const getNotificationStatus = async () => {
  try {
    let result = await AsyncStorage.getItem(STATUS);
    if (result === 'true') {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e.message);
    return false;
  }
};
export {setNotificationStatus, getNotificationStatus};
