import React, { useEffect, useState, useRef } from "react";
import store from "../store/store";
import { useNavigate } from 'react-router';
import axios from "axios";
import { getJWT } from "../service/authService";
import { useDispatch } from "react-redux";
import { Toast } from 'primereact/toast';




import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";


import { setOrderItems } from "../store/shopping-cart/orderItemsStore";
import { useParams } from "react-router-dom";
import { setDeliveryState } from "../store/shopping-cart/deliveryStore";
import { setOrders } from "../store/shopping-cart/orderStore";
import { setCookingInstructions, setRestaurantDetails, showRestaurantRatings } from "../store/shopping-cart/restaurantStore";
import { setUserDetails } from "../store/shopping-cart/userStore";

import ApiConstants from '../constants/apiConstants';


import { setAllDeliveryList } from "../store/shopping-cart/deliveryStore";
import {  setDeliveryOption, setDeliveryRatings } from "../store/shopping-cart/deliveryStore";
import { setWelcomeToast } from '../store/authStore';
import ToastConstants from "../constants/toastConstants.js";
import { useLocation } from "react-router-dom";
import { setRestaurantsInAdmin} from "../store/shopping-cart/restaurantStore"

import "../styles/loader.css";




const Admin = () => {

    const navigate = useNavigate();
    const authenticated = store.getState().auth.authenticated;
    const toast = useRef(null);
    const [deliveryDetails, setDeliveryDetails] = useState([]);
    const dispatch = useDispatch();
    const apiConstants = new ApiConstants();
    const location = useLocation();
    const toastConstants = new ToastConstants();
    const welcomeToast = useSelector((state) => state.auth.welcomeToast);



    // const { Name, currentLocation, currentCity, IsAvailable } = props.item;
    const [isEditClicked, setEditButton] = useState(false);

    const [availablity, setAvailability] = useState(false);
    const [loader, setLoader] = useState(true);
    // if (IsAvailable === 0) {
    //   setAvailability(false);
    // } else {
    //   setAvailability(true);
    // }


    const name = store.getState().auth.name;
    const userId = store.getState().auth.userId;
    const email = store.getState().auth.email;

    useEffect(() => {

        if (!authenticated) {
            navigate('/login');
        } else {



            if (location?.state?.message?.title === toastConstants.SUCCESS_TITLE && welcomeToast === true) {
                toast.current.show({
                  severity: toastConstants.SUCCESS_TITLE,
                  summary: "Success",
                  detail: location.state.message.detail,
                  life: 3000,
                
                });
                dispatch(setWelcomeToast(false));
              }


            axios.get(apiConstants.SERVERLESS_OFFLINE + '/allProducts', { headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
                console.log('restaurants', response.data);
                dispatch(setRestaurantsInAdmin(response.data));
                localStorage.setItem("allProducts", JSON.stringify(response.data));
            }).catch((e) => {
                console.log('error getting the values', e);
                toast.current.show({
                    severity: 'error',
                    summary: 'Something went wrong while getting all restaurant items',
                    detail: e.response.data.message,
                  });
            });
            




            axios.get(apiConstants.SERVERLESS_OFFLINE + '/getAllDeliveryAgents', { headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
                console.log('restaurants', response.data);
                dispatch(setAllDeliveryList(response.data));
                dispatch(setDeliveryOption(response.data));

            }).catch((e) => {
                console.log('error getting the values', e);
                toast.current.show({
                    severity: 'error',
                    summary: 'Something went wrong while fetching delivery details',
                    detail: e.response.data.message,
                  });
            });







            axios.get(apiConstants.SERVERLESS_OFFLINE+'/orders', {  
                headers: { "Authorization": `Bearer ${getJWT()}` }
              }).then((response) => {
                console.log('response', response.data);
                dispatch(setOrders(response.data));
        
                localStorage.setItem("orderItems", JSON.stringify(response.data));
           
                let restaurantIds = [];
                let userIds = [];
                (response.data).map((item, pos) => {
                  
                  if(! restaurantIds.includes(item.restaurantId) ){
                  restaurantIds.push(item.restaurantId);
                  }
                    
                  if(! userIds.includes(item.userId) ){
                    userIds.push(item.userId);
                    }
        
                })
        
                // http://localhost:8080/RestaurantDetails
                
        
                axios.get(apiConstants.SERVERLESS_OFFLINE+'/RestaurantDetails', { 
                  params: {
                    restaurantIds: restaurantIds ,
                  },
                headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
                  console.log('Inside Agent.jsx', response.data);
                  dispatch(setRestaurantDetails(response.data));
                  // dispatch(cartActions.setMenuList(response.data));  
                }).catch((e) => {
                  console.log('error getting the values', e);
                  toast.current.show({
                    severity: 'error',
                    summary: 'Something went wrong while fetching restaurant details',
                    detail: e.response.data.message,
                  });
                });
        
        
                axios.get(apiConstants.SERVERLESS_OFFLINE+'/UserDetails', { 
                  params: {
                    userIds: userIds,
                  },
                headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
                  console.log('Inside Agent.jsx', response.data);
                  dispatch(setUserDetails(response.data));
                  setLoader(false);
                  // dispatch(cartActions.setMenuList(response.data));  
                }).catch((e) => {
                  console.log('error getting the values', e);
                  setLoader(false);
                  toast.current.show({
                    severity: 'error',
                    summary: 'Something went wrong while fetching user details',
                    detail: e.response.data.message,
                  });
                });
              }).catch((e) => {
                
                console.log('error getting the values', e);
                toast.current.show({
                    severity: 'error',
                    summary: 'Something went wrong while fetching user details',
                    detail: e.response.data.message,
                  });
              });


              axios.get(apiConstants.SERVERLESS_OFFLINE+'/getcookingRatings', { 
              headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
                console.log('Inside Agent.jsx', response.data);
                dispatch(showRestaurantRatings(response.data));
                
                // dispatch(cartActions.setMenuList(response.data));  
              }).catch((e) => {
                console.log('error getting the values', e);
                setLoader(false);
                toast.current.show({
                  severity: 'error',
                  summary: 'Something went wrong while fetching cooking ratings',
                  detail: e.response.data.message,
                });
              });

              axios.get(apiConstants.SERVERLESS_OFFLINE+'/getdeliveryRating', { 
              headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
                console.log('Inside Agent.jsx', response.data);
                dispatch(setDeliveryRatings(response.data));
                // dispatch(cartActions.setMenuList(response.data));  
              }).catch((e) => {
                console.log('error getting the values', e);
                setLoader(false);
                toast.current.show({
                  severity: 'error',
                  summary: 'Something went wrong while fetching delivery Ratings',
                  detail: e.response.data.message,
                });
              });

        }



    }, []);


    return (
        <Helmet title="Cart">
            <CommonSection title="Agent Details" />
            {loader && (
              <div>
                <span className="loader">
                  <i className="pi pi-spin pi-spinner" />
                </span>
              </div>
            )}
     {!loader && (
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>SNO</th>
                                            <th>Name</th>
                                            <th>Email ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td className="text-center">1</td>
                                            <td className="text-center">{name}</td>
                                            <td className="text-center">{email}</td>
                                        </tr>



                                    </tbody>
                                </table>
                        </Col>
                    </Row>
                </Container>
            </section>)}
            <Toast ref={toast}></Toast>
        </Helmet>
    );
}



const Tr = (props) => {
    const { Name, currentLocation, currentCity, IsAvailable } = props.item;
    const [isEditClicked, setEditButton] = useState(false);
    const dispatch = useDispatch();
    const name = store.getState().auth.name;
    const toast = useRef(null);

    const [availablity, setAvailability] = useState((IsAvailable === true) ? true : false);

    console.log('availablity', availablity);
    const apiConstants = new ApiConstants();



    // if (IsAvailable === 0) {
    //   setAvailability(false);
    // } else {
    //   setAvailability(true);
    // }


    const saveChanges = () => {



        setEditButton(false);

        axios.put(apiConstants.CRUD_OFFLINE + '/updateDeliveryAvailability', {
            params: {
                IsAvailable: availablity,
                userId: deliveryName
            }
        }).then((response) => {
            console.log('orderAccepted', response.data);
        }).catch((e) => {
            toast.current.show({
                severity: 'error',
                summary: 'Something went wrong while updating delivery availability',
                detail: e.response.data.message,
              });
            console.log('error getting the values', e);
        });
    }

    const deliveryName = store.getState().delivery.deliveryDetails[0].Name;
    const handleChange = (e) => {

        e.preventDefault();
        const { name, value } = e.target;
        console.log('evalue', e, name, value);
        if (value === "Yes") {


            setAvailability(true);
        }
        if (value === "No") {

            setAvailability(false);
        }

    }


    return (
        <tr>
            <td className="text-center">{name}</td>
            <td className="text-center">{currentLocation}</td>
            <td className="text-center">{currentCity}</td>

            {(IsAvailable && !isEditClicked) && (
                <td className="text-center">
                    {(availablity === true) ? 'Yes' : 'No'}
                </td>)
            }
            {(!IsAvailable && !isEditClicked) && (
                <td className="text-center">
                    {(availablity === false) ? 'No' : 'Yes'}
                </td>)
            }

            {isEditClicked && (
                <td className="text-center">
                    <div className="form-check">
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="Yes"
                                className="form-check-input"
                                // checked={IsAvailable}
                                onChange={handleChange}
                            />
                            Yes
                        </label>
                    </div>
                    <div className="form-check">
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="No"
                                className="form-check-input"
                                // checked={IsAvailable}
                                onChange={handleChange}
                            />
                            No
                        </label>
                    </div>
                    <button type="submit" className="addTOCart__btn" onClick={saveChanges} >
                        Save
                    </button>
                </td>
            )}
            <td className="text-center">
                <button type="submit" className="addTOCart__btn" onClick={() => {
                    setEditButton(true)
                }} >
                    Edit Availability
                </button>
            </td>
            <Toast ref={toast}></Toast>
        </tr>
    );
};

export default Admin;















