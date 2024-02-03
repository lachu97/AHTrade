import AsyncStorage from '@react-native-async-storage/async-storage';
import {isValidElement} from '../../../HelperFuntions/helpers';

let BID_STORAGE = 'store_bid_list';

const setBidList = async data => {
  try {
    await AsyncStorage.setItem(BID_STORAGE, JSON.stringify(data));
  } catch (e) {
    console.error(e.message());
  }
};
const getBidList = async () => {
  try {
    let result = await AsyncStorage.getItem(BID_STORAGE);
    if (isValidElement(result)) {
      return JSON.parse(result);
    }
    return false;
  } catch (e) {
    console.error(e.message());

    return false;
  }
};
export {getBidList, setBidList};
