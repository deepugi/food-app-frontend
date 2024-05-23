





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
import { setOneRestaurantDetails , setCookingInstructions} from "../store/shopping-cart/restaurantStore";
import { setUserDetails } from "../store/shopping-cart/userStore";

import {setMenuItemsBasedOnRestaurant} from "../store/shopping-cart/menuStore";
import { setRestaurantDetails } from "../store/shopping-cart/restaurantStore";

import ApiConstants from '../constants/apiConstants';
import { setWelcomeToast } from '../store/authStore';
import ToastConstants from "../constants/toastConstants.js";
import { useLocation } from "react-router-dom";
import "../styles/loader.css";








const Restaurant = () => {

    const navigate = useNavigate();
    const authenticated = store.getState().auth.authenticated;
    const userId = store.getState().auth.userId;
    const toast = useRef(null);
    const [restaurantDetails, setrestaurantDetails] = useState([]);
    const dispatch = useDispatch();
      const apiConstants = new ApiConstants();
      const location = useLocation();
      const toastConstants = new ToastConstants();
      const welcomeToast = useSelector((state) => state.auth.welcomeToast);
      const [loader, setLoader] = useState(true);


    const name = store.getState().auth.name;


    // const { Name, currentLocation, currentCity, IsAvailable } = props.item;
    const [isEditClicked, setEditButton] = useState(false);

    const [availablity, setAvailability] = useState(false);
    // if (IsAvailable === 0) {
    //   setAvailability(false);
    // } else {
    //   setAvailability(true);
    // }



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

            // https://ec2-52-90-81-206.compute-1.amazonaws.com/
            // http://localhost:8080/getRestaurant
            console.log('apiConstants',apiConstants.SERVERLESS_OFFLINE+'/getRestaurant' );
            axios.get(apiConstants.SERVERLESS_OFFLINE+'/getRestaurant', {
                params: {
                    Name: name,
                },
                headers: { "Authorization": `Bearer ${getJWT()}` }
            }).then((response) => {
                console.log('getRestaurantDetails', response.data);

                dispatch(setOneRestaurantDetails(response.data));
                setrestaurantDetails(response.data);


                axios.get(apiConstants.SERVERLESS_OFFLINE+'/allmenuItems', { 
                    params: {
                      restaurantId: response.data[0].Id,
                    },
                  headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
                    console.log('menuItems', response.data);
                    
                    dispatch(setMenuItemsBasedOnRestaurant(response.data));
                    localStorage.setItem("menuItems", JSON.stringify(response.data));
                     
                  }).catch((e) => {
                    console.log('error getting the values', e);
                  
                    toast.current.show({
                        severity: 'error',
                        summary: 'Something went wrong while fetching the menu details',
                        detail: e.response.data.message,
                      });
                  });







            }).catch((e) => {
                console.log('error getting the values', e);
                toast.current.show({
                    severity: 'error',
                    summary: 'Something went wrong while fetching the restaurant details',
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
                    summary: 'Something went wrong while fetching the restaurant details',
                    detail: e.response.data.message,
                  });
                });










        
        
                axios.get(apiConstants.SERVERLESS_OFFLINE+'/UserDetails', {
                  params: {
                    userIds: userIds,
                  },
                headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
                  console.log('Inside Agent.jsx', response.data);
                  setLoader(false);
                  dispatch(setUserDetails(response.data));
                  // dispatch(cartActions.setMenuList(response.data));  
                }).catch((e) => {
                    setLoader(false);
                  console.log('error getting the values', e);
                  toast.current.show({
                    severity: 'error',
                    summary: 'Something went wrong while fetching the user details',
                    detail: e.response.data.message,
                  });
                });
              }).catch((e) => {
                console.log('error getting the values', e);
                toast.current.show({
                    severity: 'error',
                    summary: 'Something went wrong while fetching the order details',
                    detail: e.response.data.message,
                  });
              });


              axios.get(apiConstants.SERVERLESS_OFFLINE+'/getcookingInstructions', {
              headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
                console.log('cooking instructions', response.data);
                 dispatch(setCookingInstructions(response.data));
                // dispatch(cartActions.setMenuList(response.data));  
              }).catch((e) => {
                  setLoader(false);
                console.log('error getting the values', e);
                toast.current.show({
                  severity: 'error',
                  summary: 'Something went wrong while fetching the cooking instructions',
                  detail: e.response.data.message,
                });
              });







        }

    }, []);


    return (
        <Helmet title="Cart">

            
            <CommonSection title="Restaurant Details" />

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
                            {restaurantDetails.length === 0 ? (
                                <h5 className="text-center">No Restaurant Details</h5>
                            ) : (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Restaurant Name</th>
                                            <th>City</th>
                                            <th>Email</th>
                                            <th>IsClosed</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {restaurantDetails.map((item, index) => (
                                            <Tr item={item} key={index} />
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section> )}
            <Toast ref={toast}></Toast>
        </Helmet>
    );
}



const Tr = (props) => {
    const { Name,  Email, City, Is_Closed, Id } = props.item;
    const [isEditClicked, setEditButton] = useState(false);
    const dispatch = useDispatch();
    const toast = useRef(null);
    const name = store.getState().auth.name;
    const restaurantDetails = store.getState().restaurant.oneRestaurantDetails;

    const [availablity, setAvailability] = useState((Is_Closed === true) ? true : false);

    console.log('availablity', availablity);

    const apiConstants = new ApiConstants();
    // if (IsAvailable === 0) {
    //   setAvailability(false);
    // } else {
    //   setAvailability(true);
    // }


    const saveChanges = () => {


        setEditButton(false);
        axios.put(apiConstants.CRUD_OFFLINE+'/updateRestaurantAvailability  ', {
            params: {
                Is_Closed: availablity,
                restaurantId: Id
            }
        }).then((response) => {
            console.log('orderAccepted', response.data);
        }).catch((e) => {
            console.log('error getting the values', e);
        });
    }
    const cancelChanges = () => {
        setEditButton(false);
    }

    // const deliveryName = store.getState().delivery.deliveryDetails[0].Name;
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
            <td className="text-center">{Name}</td>
            <td className="text-center">{Email}</td>
            <td className="text-center">{City}</td>

            {(Is_Closed && !isEditClicked) && (
                <td className="text-center">
                    {(availablity === true) ? 'Yes' : 'No'}
                </td>)
            }
            {(!Is_Closed && !isEditClicked) && (
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
                    <button type="submit" className="addTOCart__btn" style={{ marginTop: '10px' }} onClick={saveChanges} >
                        Save
                    </button>
                    <button type="submit" className="addTOCart__btn" style={{ marginTop: '10px', marginLeft:'10px' }} onClick={cancelChanges} >
                        Cancel
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

export default Restaurant;















