import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  payPalData: [],
};

const payPalReducer = createSlice({
  name: 'PayPalREducer',
  initialState: INITIAL_STATE,
  reducers: {
    addPayPalData: (state, action) => {
      state.payPalData = action.payload;
    },
  },
});
export const {addPayPalData} = payPalReducer.actions
export default payPalReducer.reducer
