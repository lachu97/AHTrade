import {createSlice} from '@reduxjs/toolkit';
import {data} from "../../MockData/MockDatas";
const INITIAL_STATE = {
  categoryData: [],
  productData:[],
  filterData: data[1].productData
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
  },
});

export const {addCategoryData,addFilterProductData,addProductData} = categoryReducer.actions;
export default categoryReducer.reducer;
