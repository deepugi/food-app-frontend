import { createSlice } from '@reduxjs/toolkit';
const allProducts =
  localStorage.getItem("allProducts") !== null
    ? JSON.parse(localStorage.getItem("allProducts"))
    : [];


const initialState = {
   selectedRestaurantId: 0,
   restaurantDetails: [],
   oneRestaurantDetails: [],
   allRestaurants:allProducts,
   restaurantCookingInstruction: '',
   allCookingInstructions:[],
   setCooking: false,
   restaurantRatings:0
   

};

export const restaurantStore = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurantId: (state, action) => {
      state.selectedRestaurantId = action.payload;
      console.log('allRestaurantproducts', state.allRestaurants );
      console.log('allRestaurantproducts', allProducts );
    },
    setRestaurantDetails: (state, action) => {
      state.restaurantDetails = action.payload;
      console.log('allRestaurantproducts', allProducts )
    },
    setOneRestaurantDetails: (state, action) => {
      state.oneRestaurantDetails = action.payload;
      console.log('allRestaurantproducts', allProducts )
    },
    deleteRestaurants:(state, action) => {
      // console.log('orderItem',  Totalorder );
      console.log('inside deleteOrder Items', action.payload);
      const Id  = action.payload;
      console.log('inside deleteOrder Items', Id);
      state.allRestaurants = (state.allRestaurants).filter((item) => item.Id !== Id);  
      // JSON.parse(localStorage.removeItem('allProducts'
    },
    addNewRestaurant: (state, action) => {
      console.log('inside deleteOrder Items', action.payload);
      const Id = action.payload;
      console.log('inside deleteOrder Items', Id);
      (state.allRestaurants).push(action.payload);
      // console.log('state.allDeliveryList', state.allDeliveryList);
    },
    setRestaurantCookingInstruction: (state, action) => {

      state.restaurantCookingInstruction = action.payload;
     
      // console.log('state.allDeliveryList', state.allDeliveryList);
    },
    setRestaurantsInAdmin: (state, action) => {

      state.allRestaurants = action.payload;
     
      // console.log('state.allDeliveryList', state.allDeliveryList);
    },
    setCookingInstructions: (state, action) => {

      state.allCookingInstructions = action.payload;
     
      // console.log('state.allDeliveryList', state.allDeliveryList);
    },
    showCookingInstructions: (state, action) => {

      state.setCooking = action.payload;
     
      // console.log('state.allDeliveryList', state.allDeliveryList);
    },
    showRestaurantRatings: (state, action) => {

      state.restaurantRatings = action.payload;
     
      // console.log('state.allDeliveryList', state.allDeliveryList);
    },
  },
});



export const { setRestaurantId, setRestaurantDetails, setOneRestaurantDetails, deleteRestaurants, addNewRestaurant, setRestaurantCookingInstruction, setRestaurantsInAdmin, setCookingInstructions, showCookingInstructions, showRestaurantRatings } = restaurantStore.actions;

// export const useLoader = () => store.getState().loader.loading;


export default restaurantStore.reducer;





