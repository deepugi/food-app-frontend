// import React from "react";

// import CommonSection from "../components/UI/common-section/CommonSection";
// import Helmet from "../components/Helmet/Helmet";
// import "../styles/cart-page.css";
// import { useSelector, useDispatch } from "react-redux";
// import { Container, Row, Col } from "reactstrap";
// import { cartActions } from "../store/shopping-cart/cartSlice";
// import { Link } from "react-router-dom";
// import  axios from 'axios';
// import store from '../store/store';
// import { setMenuListFromOrder } from "../store/shopping-cart/menuStore";
// import { getJWT } from "../service/authService";




// const OrderHistory = () => {
// //   const cartItems = useSelector((state) => state.cart.cartItems);
//   const orderItem = store.getState().orderItems.orderItems;
//   const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
//   const orderId = store.getState().orderHistoryItems.ordersId;
//   console.log('orderHistory', orderHistory);







// //   orderHistory.map((item) => {
  

// //     console.log(item[0]);

// //   })


// Object.keys(orderHistory).map((key, index) => {


//     console.log('key', key);
//     // console.log('value', index);
//     // console.log('values', orderHistory[key]);
// });
  
//   console.log('orderItem', orderItem);
//   const totalAmount = useSelector((state) => state.cart.totalAmount);
//   const wallet = store.getState().wallet?.leftAmount;

// //   const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
//   //   const { menuId, quantity, price } = props.item;
//     // console.log('props.items', props.item);
//     const dispatch = useDispatch();
//     const userId = store.getState().auth.userId;
  
//     let menuIds = [];
          
 

//   const getMenuItemsList = (key) => {
//     orderHistory[key].map((item, pos) => {
//         if(! menuIds.includes(item.menuId) ){
//         menuIds.push(item.menuId);
//         }
//       })

//     //   e.preventDefault();
//       axios.get('http://localhost:8080/getMenu', { 
//         params: {
//           menuIds: menuIds,
//         },
//       headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
//         console.log('menuItems', response.data);

//         // dispatch(setMenuListFromOrder(response.data));

        
//       }).catch((e) => {
//         console.log('error getting the values', e);
//       });

// };








//   return (
//     <Helmet title="Cart">
//       <CommonSection title="Placed order with the items below" />
//       <section>
//         <Container>
//           <Row>
//             <Col lg="12">
//               {orderHistory.length === 0 ? (
//                 <h5 className="text-center">Your orders are empty</h5>
//               ) : (
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       {/* <th>Image</th>
//                       <th>Product Title</th>
//                       <th>Price</th> */}
//                       <th>Orders</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                 {  Object.keys(orderHistory).map((key, index) => (


                    
//                     <Tr item={key} key={index} />
            

             
                    

//                         //  orderHistory[key].map((item, pos) => (
                         
//                         //     <Tr item={item} key={index} />
//                         //  ))


//                     //  <Tr items={orderHistory[key]} key={index} />

//                  ))}




//                     {/* {orderItem.map((item) => (
//                       <Tr item={item} key={item.id} />
//                     ))} */}
//                   </tbody>
//                 </table>
//               )} 

//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// const Tr = (props) => {
//     const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
// //   const { menuId, quantity, price } = props.item;
//   console.log('props.items', props.item);
//   const dispatch = useDispatch();
//   const userId = store.getState().auth.userId;

// //   let menuIds = [];
        
// //   orderHistory[props.item].map((item, pos) => {
// //     if(! menuIds.includes(item.menuId) ){
// //     menuIds.push(item.menuId);
// //     }
// //   })

// //   const getMenuItemsList = (e) => {


// //             //   e.preventDefault();
// //               axios.get('http://localhost:8080/getMenu', { 
// //                 params: {
// //                   menuIds: menuIds,
// //                 },
// //               headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
// //                 console.log('menuItems', response.data);

// //                 // dispatch(setMenuListFromOrder(response.data));

                
// //               }).catch((e) => {
// //                 console.log('error getting the values', e);
// //               });

// // };




// //   const deleteItem = () => {
// //     axios.delete('http://localhost:3001/dev/deleteCartItem', { params: {
// //         id: id,
// //         userId: userId
// //       }}).then((response) => {

// //         dispatch(cartActions.deleteItem(id));
// //         dispatch(cartActions.setItemIsDeleted(true)); 
// //       console.log('response', response.data);    
// //     }).catch((e) => {
// //       console.log('error getting the values', e);
// //     });
// //   };
//   return (
//     <tr>
//       {/* <td className="text-center cart__img-box">
//         <img src={image01} alt="" />
//       </td> */}
//       {/* <td className="text-center">{menuId}</td>
//       <td className="text-center">${price}</td> */}
// <td className="text-center">
    
 
//     <button type="submit" className="addTOCart__btn"  >

//             <Link to={`/showOrders/${props.item}`}>Order{props.item}</Link>
//      </button>
    
    
    
//     </td>


     
//       {/* <td className="text-center">Order{props.item}</td> */}
//       {/* <td className="text-center cart__item-del">
//         <i class="ri-delete-bin-line" onClick={deleteItem}></i>
//       </td> */}
//     </tr>
//   );
// };

// export default OrderHistory;




import React, {useRef } from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch,  } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import  axios from 'axios';
import store from '../store/store';
import { setMenuListFromOrder } from "../store/shopping-cart/menuStore";
import { getJWT } from "../service/authService";
import { Toast } from 'primereact/toast';




const OrderHistory = () => {
//   const cartItems = useSelector((state) => state.cart.cartItems);
  const orderItem = store.getState().orderItems.orderItems;
  const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
  const orderId = store.getState().orderHistoryItems.ordersId;
  console.log('orderHistory', orderHistory);
  const toast = useRef(null);
  
  

//   orderHistory.map((item) => {
  

//     console.log(item[0]);

//   })


Object.keys(orderHistory).map((key, index) => {


    console.log('key', key);
    // console.log('value', index);
    // console.log('values', orderHistory[key]);
});
  
  console.log('orderItem', orderItem);
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
        if(! menuIds.includes(item.menuId) ){
        menuIds.push(item.menuId);
        }
      })

    //   e.preventDefault();
      axios.get('http://localhost:8080/getMenu', { 
        params: {
          menuIds: menuIds,
        },
      headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
        console.log('menuItems', response.data);

        // dispatch(setMenuListFromOrder(response.data));

        
      }).catch((e) => {
        console.log('error getting the values', e);
        toast.current.show({
          severity: 'error',
          summary: 'Something went wrong while fetching the menu details',
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
              {orderHistory.length === 0 ? (
                <h5 className="text-center">Your orders are empty</h5>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      {/* <th>Image</th>
                      <th>Product Title</th>
                      <th>Price</th> */}
                      <th>Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                {  orderId.map( (item, index) => (


                    
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
    const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
//   const { menuId, quantity, price } = props.item;
  console.log('props.items', props.item);
  const dispatch = useDispatch();
  const userId = store.getState().auth.userId;
  const toast = useRef(null);

//   let menuIds = [];
        
//   orderHistory[props.item].map((item, pos) => {
//     if(! menuIds.includes(item.menuId) ){
//     menuIds.push(item.menuId);
//     }
//   })

//   const getMenuItemsList = (e) => {


//             //   e.preventDefault();
//               axios.get('http://localhost:8080/getMenu', { 
//                 params: {
//                   menuIds: menuIds,
//                 },
//               headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
//                 console.log('menuItems', response.data);

//                 // dispatch(setMenuListFromOrder(response.data));

                
//               }).catch((e) => {
//                 console.log('error getting the values', e);
//               });

// };




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
      {/* <td className="text-center cart__img-box">
        <img src={image01} alt="" />
      </td> */}
      {/* <td className="text-center">{menuId}</td>
      <td className="text-center">${price}</td> */}
<td className="text-center">
    
 
    <button type="submit" className="addTOCart__btn"  >

            <Link to={`/showOrders/${props.item}`}>Order{props.item}</Link>
     </button>
    
    
    
    </td>


     
      {/* <td className="text-center">Order{props.item}</td> */}
      {/* <td className="text-center cart__item-del">
        <i class="ri-delete-bin-line" onClick={deleteItem}></i>
      </td> */}
      <Toast ref={toast}></Toast>
    </tr>
  );
};

export default OrderHistory;

