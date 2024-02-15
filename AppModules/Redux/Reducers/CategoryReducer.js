import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  categoryData: [],
  productData:[]
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
  },
});

export const {addCategoryData,addProductData} = categoryReducer.actions;
export default categoryReducer.reducer;
