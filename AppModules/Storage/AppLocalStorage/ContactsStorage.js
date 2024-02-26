import {MMKV} from 'react-native-mmkv';

let CONTACT_KEY = 'contacts_details';

const contactStorage = new MMKV();
const storeContactsDetails = async data => {
  try {
    await contactStorage.set(CONTACT_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
const getContactsDetails = async () => {
  try {
    let hasData = contactStorage.contains(CONTACT_KEY);
    if (hasData) {
      return JSON.parse(contactStorage.getString(CONTACT_KEY));
    }
    return false;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};

export {getContactsDetails, storeContactsDetails};
