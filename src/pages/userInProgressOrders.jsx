import React, { Component, useEffect, useState, useRef } from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../store/store";
import { setOrderDetails, setLatestOrderDetails } from "../store/shopping-cart/orderStore";

import ApiConstants from "../constants/apiConstants";
import { getJWT } from "../service/authService";
import { Toast } from 'primereact/toast';
import { Rating } from 'primereact/rating';

const InProgress = () => {
  const orderItem = store.getState().orderItems.orderItems;
  
  console.log("orderItem", orderItem);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const wallet = store.getState().wallet?.leftAmount;
  const [order, setOrder] = useState('');
  const [orderid, setorderid] = useState(0);
  const [agentId, setAgentId] = useState();
  const toast = useRef(null);


//   const orderDetails = store.getState().orders.orderDetails;

  const orderDetails = useSelector((state) => state.orders.orderDetails);

  console.log("orderDetails", orderDetails);
  const apiConstants = new ApiConstants();
  const dispatch = useDispatch();

  console.log("order", order);
  console.log("orderId", orderid);
  const [orderFeedback, setOrderFeedback] = useState(null);
  const [deliveryFeedback, setDeliveryFeedback] = useState(null);
  const [save, setSave ] = useState(false);

//   useEffect(() => {
//     axios
//       .get(apiConstants.SERVERLESS_OFFLINE + "/getOrderById", {
//         params: {
//           orderId: orderDetails.Id,
//         },
//         headers: { Authorization: `Bearer ${getJWT()}` },
//       })
//       .then((response) => {
//         console.log("response", response);
//         dispatch(setOrderDetails(response.data));
//         // localStorage.setItem("orderedDetails", JSON.stringify(response.data));
//       })
//       .catch((e) => {
//         console.log("error getting the values", e);
//       });
//   }, []);


   const onSave = () => {
         setSave(true);



         {/* orderId:orderDetails.Id
rating of: restaurantrating
restaurantId: orderDetails.restaurantId */}


         axios
         .post(apiConstants.CRUD_OFFLINE + "/addRestaurantratings", {
           params: {
             OrderId:  orderDetails?.Id ,
             RestaurantId: orderDetails?.restaurantId,
             Rating: orderFeedback
           },
         })
         .then((response) => {
           console.log("response", response.data);
         })
         .catch((e) => {
           console.log("error getting the values", e);
           toast.current.show({
             severity: "error",
             summary:
               "Something went wrong while inserting the restaurant cooking details",
             detail: e.response.data.message,
           });
         });


         axios
         .post(apiConstants.CRUD_OFFLINE + "/addDeliveryRatings", {
           params: {
             OrderId: orderDetails?.Id ,
             AgentId: agentId,
             Rating: deliveryFeedback,
           },
         })
         .then((response) => {
           console.log("response", response.data);
         })
         .catch((e) => {
           console.log("error getting the values", e);
           toast.current.show({
             severity: "error",
             summary:
               "Something went wrong while inserting the restaurant cooking details",
             detail: e.response.data.message,
           });
         });
   }


  const refresh = () => {
    axios
    .get(apiConstants.SERVERLESS_OFFLINE + "/getOrderById", {
      params: {
        orderId: (orderid !== 0 ) ? orderid :orderDetails?.Id,
      },
      headers: { Authorization: `Bearer ${getJWT()}` },
    })
    .then((response) => {
      console.log("response", response);
      dispatch(setLatestOrderDetails(response.data));
      setOrder(response.data[0].orderStatus);
      setorderid(response.data[0].Id);
      setAgentId(response.data[0].agentId);    
    //   localStorage.setItem("latestStatus", JSON.stringify(response.data));
    })
    .catch((e) => {
      console.log("error getting the values", e);
      toast.current.show({
        severity: 'error',
        summary: 'Something went wrong while fetching order by ID ',
        detail: e.response.data.message,
      });
    });

  }





  return (
    <Helmet title="Cart">
      <CommonSection title="Track the Order" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {orderItem.length === 0 ? (
                <h5 className="text-center">Your order cart is empty</h5>
              ) : (
                <>
                  <div className="mt-4">
                    <h6>
                      OrderStatus:
                      <span className="cart__subtotal">
                        { (order !== '')? order: (orderDetails?.orderStatus)}
                       {/* {orderDetails?.orderStatus} */}
                      </span>
                      <span>
                        <button
                          type="submit"
                          style={{ marginLeft: "10px" }}
                          className="addTOCart__btn"
                          onClick={refresh}
                        >
                           Refresh
                        </button>
                      </span>
                    </h6>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItem.map((item) => (
                        <Tr item={item} key={item.id} />
                      ))}
                    </tbody>
                  </table>

                  {order === "delivered" && (

                 
                      <><><h6> Rating for the Order:</h6><Rating value={orderFeedback} cancel={false} disabled={save} onChange={(e) => {
                        console.log('e.value', e.value);
                        setOrderFeedback(e.value);
                      } } /><h6>Rating for the Delivery Agent: </h6><Rating value={deliveryFeedback} disabled={save} cancel={false} onChange={(e) => setDeliveryFeedback(e.value)} /></><>  {save ? (

                        <h3>
                          Thanks for submitting .....
                        </h3>

                      ) : (

                        <button
                          type="submit"
                          className="addTOCart__btn"
                          onClick={onSave}
                          style={{ marginTop: "20px" }}
                        >
                          Save
                        </button>)} </></>

                 )} 
                </>
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
  const { id, image01, title, price, quantity } = props.item;
  const dispatch = useDispatch();
  const userId = store.getState().auth.userId;
  const toast = useRef(null);
  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
    dispatch(cartActions.setItemIsDeleted(true));
    axios
      .delete("http://localhost:3001/dev/deleteCartItem", {
        params: {
          id: id,
          userId: userId,
        },
      })
      .then((response) => {
        toast.current.show({
          severity: 'success',
          summary: 'Success deleting',
          detail: 'success deleting the item',
          life: 3000,
        });
      
        console.log("response", response.data);
      })
      .catch((e) => {
        console.log("error getting the values", e);
        toast.current.show({
          severity: 'error',
          summary: 'Something went wrong while deleting the cart  item',
          detail: e.response.data.message,
        });
      });
  };
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">${price}</td>
      <td className="text-center">{quantity}</td>
      {/* <td className="text-center cart__item-del">
        <i class="ri-delete-bin-line" onClick={deleteItem}></i>
      </td> */}
      <Toast ref={toast}></Toast>
    </tr>
  );
};

export default InProgress;
