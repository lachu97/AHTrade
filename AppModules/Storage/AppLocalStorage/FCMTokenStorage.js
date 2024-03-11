import {MMKV} from 'react-native-mmkv';
let FCM_TOKEN_SET = 'fcm_token_request';
const fcmStorage = new MMKV();

const setFCMTokenDetails = data => {
  try {
    fcmStorage.set(FCM_TOKEN_SET, data);
  } catch (e) {
    console.error(e.message());
  }
};
const getFCMTokenDetails = () => {
  try {
    let hasData = fcmStorage.contains(FCM_TOKEN_SET);
    if (hasData) {
      return fcmStorage.getBoolean(FCM_TOKEN_SET);
    }
    return false;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
export {getFCMTokenDetails, setFCMTokenDetails};
