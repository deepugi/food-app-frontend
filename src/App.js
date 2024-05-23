// import logo from './logo.svg';
// import './App.css';
// import React, {Component, useEffect} from "react";
// import  Axios from 'axios';
// import { AppDispatch } from '../src/store/store';
// import {
//   setRole, setAuthenticated, clearAuthStore, setWelcomeToast, setName, setEmail, setId,
// } from '../src/store/authStore';
// import { RootState } from '../src/store/store';
// import  store  from '../src/store/store';
// import Home from "./home"
// class App extends Component {



//   componentWillMount = () => {

//     console.log('rootstatevalues', RootState.auth.role);
//   //   Axios.get('http://localhost:8080/dev').then((response) => {
//   //     console.log('response', JSON.stringify(response))
//   //     console.log('rootstatevalues', RootState.role);
//   // }).catch((error) => {
//   //      console.log(error)
//   // }
//   // )
//    }


// render(){
//   console.log('rootstatevalues', RootState.auth.role);
//   return(
//   <><h1> {() =>{
//     store.dispatch(setRole('jkjk'))  
//   }}</h1>
//   <button onClick={() =>{
//     store.dispatch(setRole('ij'))  
//   }}> Submit </button>
//   <button onClick={() =>{
//       console.log('rootstatevalues', store.getState().auth.role);  
//   }}> show </button>
//   <Home></Home>
//   </>
//   );
// }

// }

// export default App;



// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Login from "../src/components/login";
// import Success from "./components/success";
// import { useNavigate } from 'react-router';



// const App = () => {

//   // const dispatch = useAppDispatch();
//   // const navigate = useNavigate();

//   // useEffect(() => {
//   //   attachHub(navigate, dispatch);
//   // }, []);

//   return (
//     <Routes>
//       <Route path={'/'} element={<Login />}></Route>
//       <Route path={'/success'} element={<Success />}></Route>
//     </Routes>
//   );
// }

// export default App;




import React from "react";
import AppRoute from "./routes/AppRoutes";
// import { useAppDispatch } from './store/storeHooks';
import { useNavigate } from 'react-router';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from './store';
import store from './store/store';
import { attachHub } from './service/authService';
import { useEffect } from "react";

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import Layout from "./components/Layout/Layout";


const App = () => {

  // const dispatch =  store.dispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    attachHub(navigate, dispatch);
  }, []);

  return (
    <>
        {/* <AppRoute /> */}
        <Layout />;
    </>

  );
}

export default App;


// import Layout from "./components/Layout/Layout";

// function App() {
//   return <Layout />;
// }

// export default App;





// import React, { useEffect } from 'react';
// import PrimeReact from 'primereact/api';
// import { useNavigate } from 'react-router';
// import AppRoute from './routes/AppRoute';
// import 'primereact/resources/themes/tailwind-light/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
// import axiosInit from './services/axiosInit';
// import { Loader } from './components';
// import { useAppDispatch } from './store/storeHooks';
// import { attachHub } from './services/authService';

// function App() {
//   PrimeReact.ripple = true;
//   axiosInit();

//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     attachHub(navigate, dispatch);
//   }, []);

//   return (
//     <>
//       <AppRoute />
//       <Loader />
//     </>
//   );
// }

// export default App;









// import { useEffect, useState } from 'react';
// import './App.css';
// // import Component1 from './components/component1';
// // import Component2 from './components/component2';
// import { Amplify } from 'aws-amplify';
// import {Auth} from 'aws-amplify';

// function App() {

//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     Amplify.configure({
//       Auth: {
//         userPoolId: 'us-east-1_oduH5OehR', //UserPool ID
//         region: 'us-east-1',
//         userPoolWebClientId: 'qsi0ddu2ug3eesss5k147rs8j', //WebClien
//       }
//     });
//      Amplify.Logger.LOG_LEVEL = "DEBUG";
//   }, []);

//   // callback function
//   const callbackFunction = async () => {
//     // await Auth.currentSession().then(data => 
//     //   console.log(data));
//     Auth.signIn('vallambaimuni98@gmail.com', 'Master@123').then( async (result) => {
//       //Success 
//       console.log('result', result);
//       setCurrentUser(result);
//      }).catch((err) => {
//       // Something is Wrong
//       console.log('Error', err);
//      });
//     var data = await Auth.currentSession();
//     console.log(data);
//     console.log(data.idToken.jwtToken);
//   }

//   const signOutFunction = async () => {
//   // try {
//   //   currentUser?.globalSignOut();
//   // } catch(exception) {
//   //   console.log('exception', exception);
//   // }
//   await Auth.signOut({global: true})
//      .then(data => console.log(data))
//      .catch(err => console.log(err));
//   }

//   // props
//   return (
//     <div className="App">
//       <p> Main Component</p>
//       <button onClick={
//         (event) => { 
//         event.preventDefault(); 
//         callbackFunction();
//       }}>getSession</button>
//       <button onClick={
//         (event) => { 
//         event.preventDefault(); 
//         signOutFunction();
//       }}>signout</button>
//     </div>
//   );
// }

// export default App;





