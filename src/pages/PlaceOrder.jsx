import React, { useRef, useState} from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import  axios from 'axios';
import store from '../store/store';
import { Toast } from 'primereact/toast';
import { Rating } from 'primereact/rating';
 


const PlaceOrder = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const orderItem = store.getState().orderItems.orderItems;
  console.log('orderItem', orderItem);
  const toast = useRef(null);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const wallet = store.getState().wallet?.leftAmount;
  // const [loader, setLoader] = useState(true);
  const loader = useSelector(() => store.getState().loader.loading);
  

  return (
    <Helmet title="Cart">


      {loader && (
              <div>
                <span className="loader">
                  <i className="pi pi-spin pi-spinner" />
                </span>
              </div>
            )}
             {!loader && (
      <><CommonSection title="Order Placed" /><section>
          <Container>
            <Row>
              <Col lg="12">
                {orderItem.length === 0 ? (
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
                      {orderItem.map((item) => (
                        <Tr item={item} key={item.id} />
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="mt-4">
                  <h6>
                    Paid: $
                    <span className="cart__subtotal">{totalAmount}</span>
                  </h6>
                  <h6>
                    Remaining Wallet Amount: $
                    <span className="cart__subtotal">{wallet}</span>
                  </h6>
                  {/* <p>Taxes and shipping will calculate at checkout</p> */}
                  <div className="cart__page-btn">
                    <button className="addTOCart__btn me-4">
                      <Link to="/home">Continue Shopping</Link>
                    </button>
                    {/* <button className="addTOCart__btn">
      <Link to="/checkout">Proceed to payment</Link>
    </button> */}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section></>)}
      <Toast ref={toast}></Toast>
    </Helmet>
  );
};

const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item;
  const dispatch = useDispatch();
  const toast = useRef(null);
  const userId = store.getState().auth.userId;
  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
    dispatch(cartActions.setItemIsDeleted(true)); 
    axios.delete('http://localhost:3001/dev/deleteCartItem', { params: {
        id: id,
        userId: userId
      }}).then((response) => {


      toast.current.show({
        severity: 'success',
        summary: 'Success deleting',
        detail: 'success deleting the item',
        life: 3000,
      });

    
      console.log('response', response.data);    
    }).catch((e) => {
      console.log('error getting the values', e);
      toast.current.show({
        severity: 'error',
        summary: 'Something went wrong while deleting  the cartItems details',
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

export default PlaceOrder;
