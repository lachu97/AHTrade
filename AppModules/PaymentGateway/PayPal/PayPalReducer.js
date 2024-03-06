import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  payPalData: [],
  approveLink: null,
};

const payPalReducer = createSlice({
  name: 'PayPalREducer',
  initialState: INITIAL_STATE,
  reducers: {
    addPayPalData: (state, action) => {
      state.payPalData = action.payload;
      state.approveLink = state.payPalData.links.find(
        itm => itm.rel === 'approve',
      ).href;
    },
  },
});
export const {addPayPalData} = payPalReducer.actions;
export default payPalReducer.reducer;
