// import store  from '../store';
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  orderItemsHistory: [],
  ordersId: []
};

export const orderHistoryItems = createSlice({
  name: 'orderItemsHistory',
  initialState,
  reducers: {
    setOrderHistoryItems: (state, action) => {
      state.orderItemsHistory = action.payload;
    },
    setOrderId: (state, action) => {
      state.ordersId = action.payload;
    },
  },
});

export const menuInitialState  = {
    orderItemsHistory: [],
}

export const { setOrderHistoryItems, setOrderId } = orderHistoryItems.actions;

// export const useLoader = () => store.getState().loader.loading;


export default orderHistoryItems.reducer;





