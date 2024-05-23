// import { createSlice } from "@reduxjs/toolkit";



// // const orderItem = store.getState().orderItems.orderItems;


// const items =
//   localStorage.getItem("cartItems") !== null
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [];

// const totalAmount =
//   localStorage.getItem("totalAmount") !== null
//     ? JSON.parse(localStorage.getItem("totalAmount"))
//     : 0;

// const totalQuantity =
//   localStorage.getItem("totalQuantity") !== null
//     ? JSON.parse(localStorage.getItem("totalQuantity"))
//     : 0;

// const setItemFunc = (item, totalAmount, totalQuantity) => {
//   localStorage.setItem("cartItems", JSON.stringify(item));
//   localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
//   localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
// };

// const initialState = {
//   cartItems: items,
//   totalQuantity: totalQuantity,
//   totalAmount: totalAmount,
//   menuList: [],
//   deletedItem: false,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,

//   reducers: {
//     setItemIsDeleted(state, action) {  
//       state.deletedItem = action.payload;
//     },
//     setMenuList(state, action) {
//       state.menuList = action.payload;
//     },

//     setEmptyCart(state, action) {
    
//       state.cartItems=[];
//       state.totalQuantity = 0;

//     },
//     // =========== add item ============
//     addItem(state, action) {
//       const newItem = action.payload;
//       const existingItem = state.cartItems.find(
//         (item) => item.id === newItem.id
//       );
//       state.totalQuantity++;

//       if (!existingItem) {
//         // ===== note: if you use just redux you should not mute state array instead of clone the state array, but if you use redux toolkit that will not a problem because redux toolkit clone the array behind the scene

//         // state.cartItems.push({
//         //   id: newItem.id,
//         //   title: newItem.title,
//         //   image01: newItem.image01,
//         //   price: newItem.price,
//         //   quantity: 1,
//         //   totalPrice: newItem.price,
//         // });



//         // Item_Name: 'Hotdog',
// // Item_Description:'Hotdog potato' ,
// // Item_Price: 250,
// // Item_URL : "https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fhdog1.png?alt=media&token=658e67d8-9284-4ba4-93ad-778dad99ce9c",
// // Restaurant_Id: 5
//        state.cartItems.push({
//           id: newItem.id,
//           title: newItem.title,
//           image01: newItem.image01,
//           price: newItem.price,
//           quantity: 1,
//           totalPrice: newItem.price,
//         });


//       } else {
//         existingItem.quantity++;
//         existingItem.totalPrice =
//           Number(existingItem.totalPrice) + Number(newItem.price);
//       }

//       state.totalAmount = state.cartItems.reduce(
//         (total, item) => total + Number(item.price) * Number(item.quantity),

//         0
//       );

//       setItemFunc(
//         state.cartItems.map((item) => item),
//         state.totalAmount,
//         state.totalQuantity
//       );
//     },

//     // ========= remove item ========

//     removeItem(state, action) {
//       const id = action.payload;
//       const existingItem = state.cartItems.find((item) => item.id === id);
//       state.totalQuantity--;

//       if (existingItem.quantity === 1) {
//         state.cartItems = state.cartItems.filter((item) => item.id !== id);
//       } else {
//         existingItem.quantity--;
//         existingItem.totalPrice =
//           Number(existingItem.totalPrice) - Number(existingItem.price);
//       }

//       state.totalAmount = state.cartItems.reduce(
//         (total, item) => total + Number(item.price) * Number(item.quantity),
//         0
//       );

//       setItemFunc(
//         state.cartItems.map((item) => item),
//         state.totalAmount,
//         state.totalQuantity
//       );
//     },

//     //============ delete item ===========

//     deleteItem(state, action) {
//       const id = action.payload;
//       const existingItem = state.cartItems.find((item) => item.id === id);

//       if (existingItem) {
//         state.cartItems = state.cartItems.filter((item) => item.id !== id);
//         state.totalQuantity = state.totalQuantity - existingItem.quantity;
//       }

//       state.totalAmount = state.cartItems.reduce(
//         (total, item) => total + Number(item.price) * Number(item.quantity),
//         0
//       );
//       setItemFunc(
//         state.cartItems.map((item) => item),
//         state.totalAmount,
//         state.totalQuantity
//       );
//     },
//   },
// });

// export const cartActions = cartSlice.actions;
// export default cartSlice.reducer;
