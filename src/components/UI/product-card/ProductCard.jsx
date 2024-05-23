// import React from "react";

// import "../../../styles/product-card.css";

// import { Link } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { cartActions } from "../../../store/shopping-cart/cartSlice";

// const ProductCard = (props) => {
//   const { id, title, image01, price } = props.item;
//   const dispatch = useDispatch();

//   const addToCart = () => {
//     dispatch(
//       cartActions.addItem({
//         id,
//         title,
//         image01,
//         price,
//       })
//     );
//   };

//   return (
//     <div className="product__item">
//       <div className="product__img">
//         <img src={image01} alt="product-img" className="w-50" />
//       </div>

//       <div className="product__content">
//         <h5>
//           <Link to={`/foods/${id}`}>{title}</Link>
//         </h5>
//         <div className=" d-flex align-items-center justify-content-between ">
//           <span className="product__price">${price}</span>
//           <button className="addTOCart__btn" onClick={addToCart}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;








import React, {useRef} from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
// import {
//   setMenuList
// } from '../../../store/shopping-cart/menuStore';
import axios from "axios";
import { getJWT } from "../../../service/authService";
import { useNavigate } from "react-router-dom";

import { setRestaurantId } from '../../../store/shopping-cart/restaurantStore';
import ApiConstants from "../../../constants/apiConstants";
import { Toast } from 'primereact/toast';




const ProductCard = (props) => {
  const { Id, Name, ImageURL } = props.item;
  const toast = useRef(null);

  const dispatch = useDispatch();

  const apiConstants = new ApiConstants();


//   "Id": 1,
//   "Name": "Time Traveller",
//   "City": "Bengaluru",
//   "ImageURL": "https://media-cdn.tripadvisor.com/media/photo-l/14/96/fa/14/restaurant.jpg",
//   "Email": "fb@saivishram.com",
//   "Is_Closed": false,
//   "Rating": "5.0",
//   "createdAt": "2022-12-17T08:13:08.000Z",
//   "updatedAt": "2022-12-17T08:13:08.000Z"
// }



  // const addToCart = () => {
  //   dispatch(
  //     cartActions.addItem({
  //       id,
  //       title,
  //       image01,
  //       price,
  //     })
  //   );
  // };
  const navigate = useNavigate();
  const getMenuList = () => {
    console.log('IDvalue', Id); 

    dispatch(setRestaurantId(Id));
    axios.get(apiConstants.SERVERLESS_OFFLINE+'/allmenuItems', { 
      params: {
        restaurantId: Id,
      },
    headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
      console.log('response', response.data);
      dispatch(cartActions.setMenuList(response.data));
      navigate('/foods');
      
    }).catch((e) => {
      console.log('error getting the values', e);
      toast.current.show({
        severity: 'error',
        summary: 'Something went wrong while getting all menuItems',
        detail: e.response.data.message,
      });
    });


  }

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={ImageURL} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
       { Name}

          <button className="addTOCart__btn" onClick={getMenuList}>
            Menu Items
          </button>
          {/* <Link to={`/foods/${Id}`}>{Name}</Link> */}
          
        </h5>
        {/* <div className=" d-flex align-items-center justify-content-between "> */}
          {/* <span className="product__price">${price}</span> */}
          {/* <button className="addTOCart__btn" onClick={addToCart}>
            Add to Cart
          </button> */}
        {/* </div> */}
      </div>
      <Toast ref={toast}></Toast>
    </div>
  );
};

export default ProductCard;