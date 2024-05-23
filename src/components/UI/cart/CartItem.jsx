import React, { useRef } from "react";
import { ListGroupItem } from "reactstrap";

import "../../../styles/cart-item.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import  axios from 'axios';
import store from '../../../store/store';
import ApiConstants from '../../../constants/apiConstants';
import { Toast } from 'primereact/toast';



const CartItem = ({ item }) => {


  const { id, title, price, image01, quantity, totalPrice } = item;
  const userId = store.getState().auth.userId;

  const apiConstants = new ApiConstants();
  const toast = useRef(null);

  const dispatch = useDispatch();

  const incrementItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
      })
    );
    axios.put(apiConstants.CRUD_OFFLINE+'/updateCart', { 
      params: {
        id: id,
        quantity: quantity+1,
        userId: userId
      }}).then((response) => {
      console.log('response', response.data);    
    }).catch((e) => {
      console.log('error getting the values', e);
      toast.current.show({
        severity: 'error',
        summary: 'Something went wrong while inserting the cart with updated values',
        detail: e.response.data.message,
      });
    });


  };


  const decreaseItem = () => {
    dispatch(cartActions.removeItem(id)); 

    axios.put(apiConstants.CRUD_OFFLINE+'/updateCart', { 
      params: {
        id: id,
        quantity: quantity-1,
        userId: userId
      }}).then((response) => {
      console.log('response', response.data);    
    }).catch((e) => {
      console.log('error getting the values', e);
      toast.current.show({
        severity: 'error',
        summary: 'Something went wrong while inserting the cart with updated values',
        detail: e.response.data.message,
      });
    });


    //post
  };

  const deleteItem = () => {
   
    dispatch(cartActions.deleteItem(id));
    dispatch(cartActions.setItemIsDeleted(true)); 

    axios.delete(apiConstants.CRUD_OFFLINE+'/deleteCartItem', { params: {
        id: id,
        userId: userId
      }}).then((response) => {
      console.log('response', response.data); 
      toast.current.show({
        severity: 'success',
        summary: 'Success deleting',
        detail: 'success deleting the item',
        life: 3000,
      });





    }).catch((e) => {
      console.log('error getting the values', e);
      toast.current.show({
        severity: 'error',
        summary: 'Something went wrong while deleting the cart Item',
        detail: e.response.data.message,
      });
    });

  };

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={image01} alt="product-img" />

        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{title}</h6>
            <p className=" d-flex align-items-center gap-5 cart__product-price">
              {quantity}x <span>${totalPrice}</span>
            </p>
            <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="increase__btn" onClick={incrementItem}>
                <i class="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease__btn" onClick={decreaseItem}>
                <i class="ri-subtract-line"></i>
              </span>
            </div>
          </div>

          <span className="delete__btn" onClick={deleteItem}>
            <i class="ri-close-line"></i>
          </span>
        </div>
      </div>
      <Toast ref={toast}></Toast>
    </ListGroupItem>
  );
};

export default CartItem;
