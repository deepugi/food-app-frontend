import React, { useRef } from "react";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import  axios from 'axios';
import store from '../store/store';
import { setOrderItems } from "../store/shopping-cart/orderItemsStore";
import ApiConstants from '../constants/apiConstants';
import { Toast } from 'primereact/toast';



const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const toast = useRef(null);
  const dispatch = useDispatch();
   const addCartItemsToOrder = () => {
     dispatch(setOrderItems(cartItems));
     localStorage.setItem("orderitem", JSON.stringify(cartItems));
     localStorage.removeItem("cartItems");
     // dispatch(setEmptyCart());
     dispatch( cartActions.setEmptyCart());
  }


  return (
    <Helmet title="Cart">
      <CommonSection title="Your Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItems.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))}
                  </tbody>
                </table>
              )}
  {cartItems.length !== 0 && (
              <div className="mt-4">
                <h6>
                  Subtotal: $
                  <span className="cart__subtotal">{totalAmount}</span>
                </h6>
                <p>Taxes and shipping will calculate at checkout</p>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to="/foods">Continue Shopping</Link>
                  </button>
                  <button className="addTOCart__btn" onClick={addCartItemsToOrder}>

                    <Link to="/checkout">Proceed to payment</Link>
                  </button>
                </div>
              </div>
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
  const apiConstants = new ApiConstants();
  const toast = useRef(null);
  const deleteItem = () => {

    dispatch(cartActions.deleteItem(id));
    dispatch(cartActions.setItemIsDeleted(true)); 
    axios.delete(apiConstants.CRUD_OFFLINE+'/deleteCartItem', { params: {
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
        summary: 'Something went wrong while deleting  the cart details',
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
      <td className="text-center cart__item-del">
        <i class="ri-delete-bin-line" onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;
