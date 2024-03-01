import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  orderDetails: [],
};

const checkoutReducer = createSlice({
  name: 'CheckOut Reducer',
  initialState: INITIAL_STATE,
  reducers: {
    addOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
    cleanOrderDetails: (state, action) => {
      state.orderDetails = [];
    },
  },
});
export const {addOrderDetails, cleanOrderDetails} = checkoutReducer.actions;
export default checkoutReducer.reducer;
