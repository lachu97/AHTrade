import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  paymentData: [],
  approveLink: null,
};
const nowPaymentReducer = createSlice({
  name: 'NowPaymentReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addNowPaymentData: (state, action) => {
      state.paymentData = action.payload;
      state.approveLink = action.payload?.invoice_url;
    },
  },
});

export const {addNowPaymentData} = nowPaymentReducer.actions;
export default nowPaymentReducer.reducer;
