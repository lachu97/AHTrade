import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  vHome: 'undefined',
  height: null,
  width: null,
  loggedIn: false,
  isGuestUser: null,
};
const homeReducer = createSlice({
  name: 'Home',
  initialState: INITIAL_STATE,
  reducers: {
    addHome: (state, action) => {
      state.vHome = action.payload;
    },
    addDimensions: (state, action) => {
      state.height = action.payload.height;
      state.width = action.payload.width;
    },
    addLogIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    addIsGuestUser: (state, action) => {
      state.isGuestUser = action.payload;
    },
  },
});

export const {addHome, addIsGuestUser, addDimensions, addLogIn} =
  homeReducer.actions;
export default homeReducer.reducer;
