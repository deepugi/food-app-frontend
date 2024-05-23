import React from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import  axios from 'axios';
import store from '../store/store';
// import { setOrderItems } from "../store/shopping-cart/orderStore";
import { useParams } from "react-router-dom";



const ShowOrders = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
  
  const { id } = useParams();
  console.log('idvalue', id);
  

  const  menulistfromorder = store.getState().menu.menuListFromOrder;
  console.log('menulistfromorder', menulistfromorder);



 const result = [];

 orderHistory[id].map((item)=>{
    menulistfromorder.map((item1) => {
        item1.map(( item2) => {
            console.log('item1', item2);
            if(item.menuId === item2.Id){

                result.push({
                    image01: item2.Item_URL,
                    title: item2.Item_Name,
                    price: item.price,
                    quantity: item.quantity
                })

            }


        })
      })


 });

 console.log('resultantvalue', result)







//   orderHistory[id].map( (item) => {


    


      


//   })













   const dispatch = useDispatch();
  //  const addCartItemsToOrder = () => {
  //    dispatch(setOrderItems(cartItems));
      
  //    localStorage.removeItem("cartItems");

  //   //  dispatch(setEmptyCart());

  //    dispatch( cartActions.setEmptyCart());
     
     
  // }


  return (
    <Helmet title="Cart">
      <CommonSection title="Your Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {result.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
              ) : (
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
                    {result.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const {  image01, title, price, quantity } = props.item;
  const dispatch = useDispatch();
  const userId = store.getState().auth.userId;
//   const deleteItem = () => {
//     axios.delete('http://localhost:3001/dev/deleteCartItem', { params: {
//         id: id,
//         userId: userId
//       }}).then((response) => {

//         dispatch(cartActions.deleteItem(id));
//         dispatch(cartActions.setItemIsDeleted(true)); 
//       console.log('response', response.data);    
//     }).catch((e) => {
//       console.log('error getting the values', e);
//     });
//   };
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">${price}</td>
      <td className="text-center">{quantity}</td>
    </tr>
  );
};

export default ShowOrders;
