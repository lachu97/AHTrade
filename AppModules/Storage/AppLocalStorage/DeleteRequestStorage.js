import {MMKV} from 'react-native-mmkv';

let DELETE_REQUEST = 'delete_request';
const deleteStorage = new MMKV();
const setDeleteDetails = data => {
  try {
    deleteStorage.set(DELETE_REQUEST, JSON.stringify(data));
  } catch (e) {
    console.error(e.message());
  }
};
const getDeleteDetails = () => {
  try {
    let hasData = deleteStorage.contains(DELETE_REQUEST);
    if (hasData) {
      return deleteStorage.getString(DELETE_REQUEST);
    }
    return false;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
export {setDeleteDetails, getDeleteDetails};
