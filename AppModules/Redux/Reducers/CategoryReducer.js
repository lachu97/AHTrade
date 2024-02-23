import {createSlice} from '@reduxjs/toolkit';
import {data} from '../../MockData/MockDatas';
import {getProductsDetails} from '../../Storage/AppLocalStorage/ProductsStorage';
const INITIAL_STATE = {
  categoryData: [],
  productData: [],
  filterData: [],
  priceDetails: []
};

const categoryReducer = createSlice({
  name: 'CategoryReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addCategoryData: (state, action) => {
      state.categoryData = action.payload;
    },
    addProductData: (state, action) => {
      state.productData = action.payload;
    },
    addFilterProductData: (state, action) => {
      state.filterData = action.payload;
    },
    cleanFilterProductData: (state, action) => {
      state.filterData = [];
    },
    addPriceDetailsData: (state, action) => {
      state.priceDetails = action.payload;
    },
  },
});

export const {
  addCategoryData,
  cleanFilterProductData,
  addFilterProductData,
  addProductData,
  addPriceDetailsData,
} = categoryReducer.actions;
export default categoryReducer.reducer;
