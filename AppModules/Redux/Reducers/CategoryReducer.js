import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  categoryData: [],
};

const categoryReducer = createSlice({
  name: 'CategoryReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addCategoryData: (state, action) => {
      state.categoryData = action.payload;
    },
  },
});

export const {addCategoryData} = categoryReducer.actions;
export default categoryReducer.reducer;
