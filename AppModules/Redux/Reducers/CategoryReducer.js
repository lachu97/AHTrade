import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  categoryData: [],
  productData: [],
  filterData: [],
  priceDetails: [],
  status: null
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
    addStatus : (state, action) => {
      state.status = action.payload
    }
  },
});

export const {
  addCategoryData,
  cleanFilterProductData,
  addFilterProductData,
  addProductData,
  addPriceDetailsData,
  addStatus,
} = categoryReducer.actions;
export default categoryReducer.reducer;
