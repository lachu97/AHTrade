import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  selectedProduct: null,
};
const selectProductDetailReducer = createSlice({
  name: 'Product Detail',
  initialState: INITIAL_STATE,
  reducers: {
    addSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {addSelectedProduct} = selectProductDetailReducer.actions;
export default selectProductDetailReducer.reducer;
