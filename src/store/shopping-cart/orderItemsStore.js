// import store  from '../store';
import { createSlice } from '@reduxjs/toolkit';


// const orderItem =
//   localStorage.getItem("orderItems") !== null
//     ? JSON.parse(localStorage.getItem("orderItems"))
//     : [];

const orderitem =
  localStorage.getItem("orderitem") !== null
    ? JSON.parse(localStorage.getItem("orderitem"))
    : [];
const initialState = {
  orderItems: orderitem,
};

export const orderItems = createSlice({
  name: 'orderItems',
  initialState,
  reducers: {
    setOrderItems: (state, action) => {
      state.orderItems = action.payload;
    },

    // deleteOrderItems:(state, action) => {
    //   console.log('orderItem', orderItem );
    //   console.log('inside deleteOrder Items', action.payload);
    //   const Id  = action.payload;
    //   console.log('inside deleteOrder Items', Id);
    //   state.orderItems = state.orderItems.filter((item) => item.Id !== Id);
    //   console.log('stateorders', state.orderItems);
      
    // },
  },
});

// export const menuInitialState  = {
//   menuList: [],
// }

export const { setOrderItems } = orderItems.actions;

// export const useLoader = () => store.getState().loader.loading;


export default orderItems.reducer;





