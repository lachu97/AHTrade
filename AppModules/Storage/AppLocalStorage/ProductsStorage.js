import AsyncStorage from '@react-native-async-storage/async-storage';

let PRODUCTS_KEY = 'product_details_keys';
const storeProductsDetails = async data => {
  try {
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error(e.message());
  }
};
const getProductsDetails = async () => {
  try {
    let value = await AsyncStorage.getItem(PRODUCTS_KEY);

    return JSON.parse(value);
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
export {getProductsDetails, storeProductsDetails};
