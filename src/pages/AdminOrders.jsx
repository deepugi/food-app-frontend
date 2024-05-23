import React, { useEffect, useState, useRef } from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Dropdown } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import axios from 'axios';
import store from '../store/store';
import { setMenuListFromOrder } from "../store/shopping-cart/menuStore";
import { getJWT } from "../service/authService";
import { deleteOrderItems } from "../store/shopping-cart/orderStore"
import ApiConstants from '../constants/apiConstants';
import { deleteDeliveryOptions } from "../store/shopping-cart/deliveryStore";
import { objectLessAttributes } from "@aws-amplify/core";
import { Toast } from 'primereact/toast';




const AdminOrders = () => {
    //   const cartItems = useSelector((state) => state.cart.cartItems);
    const orderItem = store.getState().orderItems.orderItems;
    const [ordersItems, setOrderItems] = useState(orderItem);
    const userDetails = store.getState().user.userDetails;

    const toast = useRef(null);

    // const orders = store.getState().orders.orders;

    const orders = useSelector((state) => state.orders.orders);

    const orderHistory = store.getState().orderHistoryItems.orderItemsHistory;
    const orderId = store.getState().orderHistoryItems.ordersId;
    console.log('orderHistory', orderHistory);









    //   orderHistory.map((item) => {


    //     console.log(item[0]);

    //   })


    Object.keys(orders).map((key, index) => {


        console.log('orders', key, index);



        // console.log('value', index);
        // console.log('values', orderHistory[key]);
    });

    //   console.log('orderItem', orderItem);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const wallet = store.getState().wallet?.leftAmount;

    //   const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
    //   const { menuId, quantity, price } = props.item;
    // console.log('props.items', props.item);
    const dispatch = useDispatch();
    const userId = store.getState().auth.userId;




    let menuIds = [];



    const getMenuItemsList = (key) => {
        orderHistory[key].map((item, pos) => {
            if (!menuIds.includes(item.menuId)) {
                menuIds.push(item.menuId);
            }
        })

        //   e.preventDefault();
        axios.get('http://localhost:8080/getMenu', {
            params: {
                menuIds: menuIds,
            },
            headers: { "Authorization": `Bearer ${getJWT()}` }
        }).then((response) => {
            console.log('menuItems', response.data);
            // dispatch(setMenuListFromOrder(response.data));
        }).catch((e) => {
            console.log('error getting the values', e);
            toast.current.show({
                severity: 'error',
                summary: 'Something went wrong while fetching getting the menu item',
                detail: e.response.data.message,
              });
        });

    };


    return (
        <Helmet title="Cart">
            <CommonSection title="Placed order with the items below" />
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            {orders.length === 0 ? (
                                <h5 className="text-center">Your orders are empty</h5>
                            ) : (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>OrderId</th>
                                            <th>OrderStatus</th>
                                            <th>RestaurantName</th>
                                            <th>RestaurantLocation</th>
                                            <th>RestaurantCity</th>
                                            {userDetails.length > 0 && (
                                            <><th>UserName</th><th>UserLocation</th></>)}
                                            <th>Assign DeliveryAgent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((item, index) => (



                                            //  (item.OrderStatus === 'Restaurant Accepted'  ) 





                                            ( (item.orderStatus === 'Restaurant Accepted' && item.agentId === null) || item.orderStatus === 'Restaurant Denied' || item.orderStatus === 'Agent Denied') &&

                                            //    { item?.restaurantId ===  restaurantId  && (


                                            <Tr item={item} key={index} />




                                            //  orderHistory[key].map((item, pos) => (

                                            //     <Tr item={item} key={index} />
                                            //  ))


                                            //  <Tr items={orderHistory[key]} key={index} />

                                        ))}




                                        {/* {orderItem.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))} */}
                                    </tbody>
                                </table>
                            )}

                        </Col>
                    </Row>
                </Container>
            </section>
            <Toast ref={toast}></Toast>
        </Helmet>
    );
};

const Tr = (props) => {

    const restaurantDetails = store.getState().restaurant.restaurantDetails;
    const userDetails = store.getState().user.userDetails;

    const orderHistory = store.getState().orderHistoryItems.orderItemsHistory;
    const [isAcceptOrder, setAcceptOrder] = useState(false);
    const apiConstants = new ApiConstants();
    const toast = useRef(null);
    //   const { menuId, quantity, price } = props.item;
    console.log('props.items', props.item);
    const dispatch = useDispatch();
    //   const userId = store.getState().auth.userId;

    const { Id, orderStatus, orderedDate, userId, restaurantId } = props.item;
    // deliveryDetails
    //   const deliveryId = store.getState().delivery.deliveryDetails[0].Id;

    const allDeliveryList = store.getState().delivery.allDeliveryList;
    // const [options, setOptions] = useState([]);

    const [makeDisable, setDisable] = useState(false);


    const array = [];

    const [editEnabled, setEditEnabled] = useState(false);

    const options = useSelector((state) => state.delivery.deliveryOption);

    console.log('options', options);
    const [selected, setSelected] = useState(false);

    const [value, setValue] = useState();
    const [label, setLabel] = useState('');


    

    const assignOrder = () => {


        setEditEnabled(true);


    }

    const setValues = (e) => {



        const found = options.find(obj => {
            console.log('ID', obj.Id);
            return (obj.Id === e.target.value);
          });
    

        console.log('objectsss', JSON.stringify(found));
        setValue(e.target.value)
        setLabel(found.Name);
        
    }

    const saveChanges = () => {


        setSelected(true);
        dispatch(deleteDeliveryOptions(value));


        toast.current.show({
            severity: 'success',
            summary: 'Success assigning',
            detail: 'order assigned to delivery person',
            life: 3000,
          });




        // orderId: Id
        // agentId: value


        // updateOrder

        // /updateAgentId
          axios.put(apiConstants.CRUD_OFFLINE+'/updateAgentId', { 
              params: {
                orderId: Id,
                agentId: value
              }}).then((response) => {
              console.log('orderAccepted', response.data); 

            //   setAcceptOrder(true);
              // console.log('response', );

            }).catch((e) => {
              console.log('error getting the values', e);
              toast.current.show({
                severity: 'error',
                summary: 'Something went wrong while updating the agent Id in orders table',
                detail: e.response.data.message,
              });
            });

    }

    const cancelChanges = () => {

        setSelected(false);
        setEditEnabled(false);
    }



    const handleChange = (e) => {

        console.log('selected value', e.target.value);

        // dispatch(deleteDeliveryOptions(e.target.value));


        // options.reduce

        // options.map((option) => {

        //     if(option.value === e.target.value){

        //         option.disabled = true;
        //     }


        // })


        //   console.log('spliced values', options);







    }


    const denyOrder = () => {
        console.log('inside the denyOrder');

        // dispatch(deleteOrderItems(Id));
    }

    const acceptOrder = () => {

        //  orderId: Id,

        // orderStatus: 'Agent Picked',

        // agentId: deliveryId
        // http://localhost:3001/dev/updateOrderStatus 

        //     axios.put(apiConstants.CRUD_OFFLINE+'/updateOrderStatus ', { 
        //       params: {
        //         orderId: Id,
        //         orderStatus: 'Agent Picked',
        //         agentId: deliveryId
        //       }}).then((response) => {
        //       console.log('orderAccepted', response.data); 

        //    setAcceptOrder(true);
        //       // console.log('response', );

        //     }).catch((e) => {
        //       console.log('error getting the values', e);
        //     });




    }

    let restaurantName = '';
    let restaurantCity = '';
    let restaurantLocation = '';

    restaurantDetails.map((item) => {
        console.log('came in');
        if (item.RestaurantId === restaurantId) {
            restaurantName = item.Name;
            restaurantLocation = item.Location;
            restaurantCity = item.City;
        }
    })
    let userName = '';
    let userLocation = '';

    userDetails.map((item) => {
        console.log('came in users');
        if (item.UserId === userId) {
            userName = item.Name;
            userLocation = item.Location;
        }
    })
    if(orderStatus !=='Restaurant Denied'){
    return (
        <tr>
            <td className="text-center">{Id}</td>
            <td className="text-center">{orderStatus}</td>
            <td className="text-center">{restaurantName}</td>
            <td className="text-center">{restaurantLocation}</td>
            <td className="text-center">{restaurantCity}</td>
            {userDetails.length > 0 && (
            <><td className="text-center">{userName}</td>
            <td className="text-center">{userLocation}</td></>)
    }
        {selected && (
                <td className="text-center">{label}</td>
            )}
            {(editEnabled && !selected) && (
                <td className="text-center">

              {options.map((option) => ( 
        

                        <div className="form-check">

{option?.currentCity === restaurantCity && option?.IsAvailable && (
                            <label>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value={option.Id}

                                    className="form-check-input"
                                    // checked={IsAvailable}
                                    onChange={(e) => {
                                        //   options.find(obj => obj.Id === e.target.value)
                                        //   options.find(obj => obj.Id === e.target.value)

                                        setValue(option.Id);
                                        setLabel((option.Name === '333c6814-730a-4f7d-b748-992b1d582d67')? 'Vinod': option.Name);
                                    } } />

                                {option.Name === '333c6814-730a-4f7d-b748-992b1d582d67'? 'Vinod': option.Name}

                            </label>
                                   )}
                        </div>
                 
                    ))}
                    <button type="submit" className="addTOCart__btn" onClick={saveChanges}>
                        Save
                    </button>
                    <button type="submit" className="addTOCart__btn" onClick={cancelChanges}>
                        Cancel
                    </button>
                </td>
            )}
            <td className="text-center">
                {(!editEnabled && !selected) && (
                    <button type="submit" className="addTOCart__btn" onClick={assignOrder}>
                        Assign DeliveryAgent
                    </button>
                )}
            </td>
            <Toast ref={toast}></Toast>
        </tr>
    );}
    else{
        return (
            <tr>
                <td className="text-center">{Id}</td>
                <td className="text-center">{orderStatus}</td>
                <td className="text-center">{restaurantName}</td>
                <td className="text-center">{restaurantLocation}</td>
                <td className="text-center">{restaurantCity}</td>
                {userDetails.length > 0 && (
                <><td className="text-center">{userName}</td><td className="text-center">{userLocation}</td></>)}
                {(editEnabled ) && (
                    <td className="text-center">

                      9629614502
                     
                    </td>
                )}
                <td className="text-center">
                    {(!editEnabled && !selected) && (
                        <button type="submit" className="addTOCart__btn" onClick={assignOrder}>
                           Make a call to restaurant
                        </button>
                    )}
                </td>
                <Toast ref={toast}></Toast>
            </tr>
        );
    }

};

export default AdminOrders;