
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authReducer from './authStore'; // see this import yaa got it s
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import walletStore from './shopping-cart/walletStore';
import restaurantStore from './shopping-cart/restaurantStore';
import orderItemsStore from './shopping-cart/orderItemsStore';
import orderHistoryStore from './shopping-cart/orderHistoryStore';
import menuStore from './shopping-cart/menuStore';
import deliveryStore from './shopping-cart/deliveryStore';
import orderStore from './shopping-cart/orderStore';
import userStore from './shopping-cart/userStore';
import loader from './shopping-cart/loader';

// import loaderStore from './loaderStore'
// import menuStore from './shopping-cart/menuStore';
// import { applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunkMiddleware from 'redux-thunk'

// import loaderStore from './loaderStore';
//
// here is the isse handing it to yiu
const persistConfig = {
  key: 'root',
  storage: localStorage,
};

const authPersistReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
  reducer: {
    auth: authPersistReducer,
    // loader: loaderStore,
    cart: cartSlice,
    cartUi: cartUiSlice,
    wallet: walletStore,
    restaurant: restaurantStore,
    orderItems: orderItemsStore,
    orderHistoryItems: orderHistoryStore,
    menu: menuStore,
    delivery: deliveryStore,
    orders: orderStore,
    user: userStore,
    loader: loader
  },
  middleware: [thunk],
});

export default store;

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
