// import store  from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const totalMenuItems =
  localStorage.getItem("menuItems") !== null
    ? JSON.parse(localStorage.getItem("menuItems"))
    : [];

const initialState = {
  menuList: [],
  menuListFromOrder: [],
  menuItemsBasedOnRestaurant: totalMenuItems
};

export const menuStore = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    setMenuListFromOrder: (state, action) => {
      state.menuListFromOrder = action.payload;
    },
    setMenuItemsBasedOnRestaurant: (state, action) => {
      state.menuItemsBasedOnRestaurant = action.payload;
    },
    deleteMenuItemsBasedOnRestaurant:(state, action) => {
      // console.log('orderItem',  Totalorder );
      console.log('inside deleteOrder Items', action.payload);
      const Id  = action.payload;
      console.log('inside deleteOrder Items', Id);
      state.menuItemsBasedOnRestaurant = state.menuItemsBasedOnRestaurant.filter((item) => item.Id !== Id);  
    },


    addNewItem: (state, action) => {
      console.log('inside deleteOrder Items', action.payload);
      const Id = action.payload;
      console.log('inside deleteOrder Items', Id);
      (state.menuItemsBasedOnRestaurant).push(action.payload);
      // console.log('state.allDeliveryList', state.allDeliveryList);
    },

  },
});

export const menuInitialState  = {
  menuList: [],
  menuListFromOrder: [],

}

export const { setMenuList, setMenuListFromOrder, setMenuItemsBasedOnRestaurant, deleteMenuItemsBasedOnRestaurant, addNewItem } = menuStore.actions;

// export const useLoader = () => store.getState().loader.loading;


export default menuStore.reducer;





