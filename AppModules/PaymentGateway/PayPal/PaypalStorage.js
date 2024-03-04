import {MMKV} from 'react-native-mmkv';

let paypalStorage = new MMKV();
let accessToken = 'access_token_paypal';

const storeAccessToken = async data => {
  try {
    await paypalStorage.set(accessToken, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
const getAccessToken = async () => {
  try {
    let hasData = paypalStorage.contains(accessToken);
    if (hasData) {
      return paypalStorage.getString(accessToken);
    }
    return false;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
export {storeAccessToken, getAccessToken};
