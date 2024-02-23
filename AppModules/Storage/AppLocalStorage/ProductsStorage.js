import AsyncStorage from '@react-native-async-storage/async-storage';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();
let PRODUCTS_KEY = 'product_details_keys';
let CATEGORY_KEY = 'category_details_keys';
const storeCategoryDetails = async data => {
  try {
    await storage.set(CATEGORY_KEY, JSON.stringify(data));
  } catch (e) {
    console.error(e.message());
  }
};
const getCategorysDetails = () => {
  try {
    let hasData = storage.contains(CATEGORY_KEY);
    if (hasData) {
      return storage.getString(CATEGORY_KEY);
    }
    return false;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
const storeProductsDetails = async data => {
  try {
    await storage.set(PRODUCTS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error(e.message());
  }
};
const getProductsDetails = () => {
  try {
    let hasData = storage.contains(PRODUCTS_KEY);
    if (hasData) {
      return storage.getString(PRODUCTS_KEY);
    }
    return false;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
const flushCache = () => {
  storage.clearAll();
};
export {
  getProductsDetails,
  storeProductsDetails,
  storeCategoryDetails,
  getCategorysDetails,
  flushCache,
};
