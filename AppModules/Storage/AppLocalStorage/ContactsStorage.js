import AsyncStorage from '@react-native-async-storage/async-storage';
import {isValidElement} from '../../HelperFuntions/helpers';

let CONTACT_KEY = 'contacts_details';
const storeContactsDetails = async data => {
  try {
    await AsyncStorage.setItem(CONTACT_KEY, JSON.stringify(data));
    return 'Success';
  } catch (e) {
    console.error(e.message());
    return 'Failure';
  }
};
const getContactsDetails = async () => {
  try {
    let value = await AsyncStorage.getItem(CONTACT_KEY);

    return JSON.parse(value);
  } catch (e) {
    console.error(e.message());
    return false;
  }
};

export {getContactsDetails, storeContactsDetails};
