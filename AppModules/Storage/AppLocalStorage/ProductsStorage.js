import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();
let PRODUCTS_KEY = 'product_details_keys';
let CATEGORY_KEY = 'category_details_keys';
let PRICE_DETAILS_KEY = 'price_details_keys';

const storePriceDetails = async data => {
  try {
    await storage.set(PRICE_DETAILS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error(e.message());
  }
};
const getPriceDetails = () => {
  try {
    let hasData = storage.contains(PRICE_DETAILS_KEY);
    if (hasData) {
      return storage.getString(PRICE_DETAILS_KEY);
    }
    return false;
  } catch (e) {
    console.error(e.message());
    return false;
  }
};
const storeCategoryDetails = async data => {
  try {
    await storage.set(CATEGORY_KEY, JSON.stringify(data));
  } catch (e) {
    console.error(e.message());
  }
};
const getCategoryDetails = () => {
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
  const keys = [PRODUCTS_KEY, CATEGORY_KEY, PRICE_DETAILS_KEY];
  keys.forEach(key => storage.delete(key));
};
export {
  getProductsDetails,
  storeProductsDetails,
  storeCategoryDetails,
  getCategoryDetails,
  flushCache,
  getPriceDetails,
  storePriceDetails,
};
