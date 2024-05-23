import React, { useState, useRef } from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import axios from "axios";
import { useEffect } from "react";
import store from '../../../store/store';
import ApiConstants from "../../../constants/apiConstants";
import { Toast } from 'primereact/toast';


const MenuCard = (props) => {
  const { Id, Item_Name, Item_URL, Item_Price, Is_Available } = props.item;
  console.log('show item avaialbility', Is_Available);
  const [buttonEnable, setButton] = useState(false);
  const [ addToCartText, setAddText] = useState('Add to Cart');
  const apiConstants = new ApiConstants();
  const userId = store.getState().auth.userId;
  const deletedItem = store.getState().cart.deletedItem;
  const toast = useRef(null);

  useEffect(() => {
      
    if(deletedItem){
      setButton(false);
      setAddText('Add to Cart');
    }

  }, [deletedItem])

  // if(deletedItem){
  //   setButton(false);
  //   setAddText('Add to Cart');
  // }

//   let info = {
// Item_Name: 'Hotdog',
// Item_Description:'Hotdog potato' ,
// Item_Price: 250,
// Item_URL : "https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fhdog1.png?alt=media&token=658e67d8-9284-4ba4-93ad-778dad99ce9c",
// Restaurant_Id: 5
// }

  const dispatch = useDispatch();
 
  const addToCart = () => {





    dispatch(
      cartActions.addItem({
        id: Id,
        title: Item_Name,
        image01: Item_URL,
        price:  Item_Price,
      })
    );

    dispatch(cartActions.setItemIsDeleted(false)); 

    setButton(true);
    setAddText('Added to cart');
    toast.current.show({
      severity: 'success',
      summary: 'success in adding item into cart',
      detail: 'Item Added to Cart',
      life: 3000,
    }); 
    axios.post(apiConstants.CRUD_OFFLINE+'/addCartItems', { 
      params: {
        id: Id,
        price: Item_Price,
        quantity: 1,
        userId: userId
      }}).then((response) => {
      console.log('response', response.data);   
    }).catch((e) => {
      console.log('error getting the values', e);
      toast.current.show({
        severity: 'error',
        summary: 'Something went wrong while adding the cart',
        detail: e.response.data.message,
      });
    });
  





  };
  // className={ ({buttonEnable} === false ? 'addTOCart__btn' : 'addedTOCart__btn')}
  return (
    <div className="product__item">
      <div className="product__img">
        <img src={Item_URL} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${Id}`}>{Item_Name}</Link>
        </h5>

        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">${Item_Price}</span>


          <button className="addTOCart__btn" onClick={addToCart} disabled={buttonEnable}  >
            {addToCartText} 
          </button>


        </div>
      </div>
      <Toast ref={toast}></Toast>
    </div>
  );
};

export default MenuCard;




