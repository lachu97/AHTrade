import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  myOrdersData: [],
};
const myOrdersReducer = createSlice({
    name:'MyOrders',
    initialState:INITIAL_STATE,
    reducers:{
        addMyOrdersData:(state, action) => {
            state.myOrdersData = action.payload
        }
    }
})

export const {addMyOrdersData} = myOrdersReducer.actions
export default myOrdersReducer.reducer
