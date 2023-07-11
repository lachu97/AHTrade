import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  vHome: "undefined",
};
const homeReducer = createSlice({
  name: 'Home',
  initialState: INITIAL_STATE,
  reducers: {
    addHome: (state, action) => {
      state.vHome = action.payload;
    },
  },
});

export const {addHome} = homeReducer.actions;
export default homeReducer.reducer;
