// import store  from '../store';
import { createSlice } from '@reduxjs/toolkit';

const Totalorder =
  localStorage.getItem("orderItems") !== null
    ? JSON.parse(localStorage.getItem("orderItems"))
    : [];

    const orderdetails =
    localStorage.getItem("orderedDetails") !== null
      ? JSON.parse(localStorage.getItem("orderedDetails"))
      : [];

const initialState = {
  orders: Totalorder,
  orderDetails: orderdetails,
  latestOrderDetails: []
};





export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    deleteOrderItems:(state, action) => {
      console.log('orderItem',  Totalorder );
      console.log('inside deleteOrder Items', action.payload);
      const Id  = action.payload;
      console.log('inside deleteOrder Items', Id);
      state.orders = state.orders.filter((item) => item.Id !== Id);
      console.log('stateorders', state.orders);
      
    },
    setOrderDetails:(state, action) => {
      state.orderDetails = action.payload;
    },
    setLatestOrderDetails:(state, action) => {
      state.latestOrderDetails = state.action;
    },

  },
});

// export const menuInitialState  = {
//   menuList: [],
// }

export const { setOrders, deleteOrderItems, setOrderDetails, setLatestOrderDetails } = orders.actions;

// export const useLoader = () => store.getState().loader.loading;


export default orders.reducer;


