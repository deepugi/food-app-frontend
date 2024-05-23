
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import Login from "../components/login";
// import Success from "../components/success";
import RoutesConstants from '../constants/routeConstants';
import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Success from "../pages/success";
import PlaceOrder from "../pages/PlaceOrder";
import OrderHistory from "../pages/OrderHistory";
import ShowOrders from "../pages/ShowOrders";
import store from "../store/store";
import Agent from "../pages/Agent";
import TotalOrders from "../pages/TotalOrders";
import Restaurant from "../pages/Restaurant";
import ShowMenuList from "../pages/ShowMenuList";
import RestaurantOrders from "../pages/RestaurantOrders";
import Admin from "../pages/Admin";
import AdminRestaurants from "../pages/AdminRestaurants";
import AdminDelivery from "../pages/AdminDelivery";
import AdminOrders from "../pages/AdminOrders";
import InProgress from "../pages/userInProgressOrders";
import UserDetails from "../pages/UserDetails";
import AdminFeedbackScreen from "../pages/AdminFeedbackScreen";



const AppRoute = () => {
  const routesConstant = new RoutesConstants();
  const role = store.getState().auth.role;

  return (
    <Routes>
      {/* <Route path={routesConstant.HOME} element={<Login />}></Route>
      <Route path={routesConstant.SUCCESS} element={<Success />}></Route> */}
      { role === "Admin" && (
      <><Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/showOrders/:id" element={<ShowOrders />} />
      <Route path="/currentOrder" element={<InProgress />} />
      <Route path="/userDetails" element={<UserDetails />} />
      
      </>
      )} {
        role === "Agent" && (

          <> <Route path="/" element={<Navigate to='/AgentDetails' />} />
          <Route path="/AgentDetails" element={<Agent />} /> 
          <Route path="/login" element={<Login />} />
           <Route path="/TotalOrders" element={<TotalOrders />} /> </>
        )
      }
      {
        role === "RestaurantOwner" && (
          <> <Route path="/" element={<Navigate to='/RestaurantDetails' />} />
          <Route path="/RestaurantDetails" element={<Restaurant />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/showMenuList" element={<ShowMenuList />} />
          <Route path="/restaurantOrders" element={<RestaurantOrders />} />
           </>
        )
      }
      {
        role === "user" && (
          <> <Route path="/" element={<Navigate to='/Admin' />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurants" element={<AdminRestaurants />} />
          <Route path="/deliveryAgents" element={<AdminDelivery />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/feedback" element={<AdminFeedbackScreen />} />
           </>
        )
      }
      {
        role === "" && (
          <>
          <Route path="/" element={<Navigate to='/login' />}/>
           <Route path="/login" element={<Login />} /> </>
        )
      }

    </Routes>
   
  );
}

export default AppRoute;









// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Login from "../components/login";
// import Success from "../components/success";
// import RoutesConstants from '../constants/routeConstants';


// const AppRoute = () => {
//   const routesConstant = new RoutesConstants();

//   return (
// <Routes>
//         <Route path={routesConstant.HOME} element={<Login />}></Route>
//         <Route path={routesConstant.SUCCESS} element={<Success />}></Route>
//  </Routes> 
//   );
// }

// export default AppRoute;


// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from "../pages/Home";
// import AllFoods from "../pages/AllFoods";
// import FoodDetails from "../pages/FoodDetails";
// import Cart from "../pages/Cart";
// import Checkout from "../pages/Checkout";
// import Contact from "../pages/Contact";
// import Login from "../pages/Login";
// import Register from "../pages/Register";

// const Routers = () => {
//   return (
//     <Routes>
// <Route path="/" element={<Navigate to="/home" />} />
// <Route path="/home" element={<Home />} />
// <Route path="/foods" element={<AllFoods />} />
// <Route path="/foods/:id" element={<FoodDetails />} />
// <Route path="/cart" element={<Cart />} />
// <Route path="/checkout" element={<Checkout />} />
// <Route path="/login" element={<Login />} />
// <Route path="/register" element={<Register />} />
// <Route path="/contact" element={<Contact />} />
//     </Routes>
//   );
// };

// export default Routers;


