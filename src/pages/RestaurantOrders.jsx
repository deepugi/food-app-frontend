import React, { useState, useRef } from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import  axios from 'axios';
import store from '../store/store';
import { setMenuListFromOrder } from "../store/shopping-cart/menuStore";
import { getJWT } from "../service/authService";
import { deleteOrderItems } from "../store/shopping-cart/orderStore"

import ApiConstants from '../constants/apiConstants';
import { Toast } from 'primereact/toast'; 
import { showCookingInstructions} from  "../store/shopping-cart/restaurantStore"


const RestaurantOrders = () => {
//   const cartItems = useSelector((state) => state.cart.cartItems);
  const orderItem = store.getState().orderItems.orderItems;
  const[ordersItems, setOrderItems] = useState(orderItem);
  const restaurantId = store.getState().restaurant.oneRestaurantDetails[0].Id;
  const toast = useRef(null);

  const orders = useSelector((state) => state.orders.orders);
  const shwoCookingIns = useSelector((state) => state.restaurant.setCooking);
  
  const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
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
      <CommonSection title="Orders to this restaurant" />
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
                      {/* <th>UserId</th> */}
                      <th>RestaurantName</th>
                      <th>RestaurantLocation</th>
                      <th>RestaurantCity</th>
                      <th>UserName</th>
                      <th>UserLocation</th>
                      {/* {shwoCookingIns && */}
                      {/* <th>Cooking Instruction</th> */}
                      {/* } */}
                      <th>Actions</th>



                    </tr>
                  </thead>
                  <tbody>
                {  orders.map( (item, index) => ( 
                   
                (item.restaurantId === restaurantId) &&
                
            //    { item?.restaurantId ===  restaurantId  && (

              ( (item.orderStatus === 'Ordered') && (  
                    <Tr item={item} key={index} /> 
              ))
           
            
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
  const cookingInstructions = store.getState().restaurant.allCookingInstructions;
  const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
  const [isAcceptOrder, setAcceptOrder] = useState(false);

  const [isrestaurantAccepted , setRestaurantAccepted] = useState('');
  const apiConstants = new ApiConstants();

//   const { menuId, quantity, price } = props.item;
  console.log('props.items', props.item);
  const dispatch = useDispatch();
  const [orderstat, setOrderStatus] = useState();
  const toast = useRef(null);
//   const userId = store.getState().auth.userId;

  const { Id, orderStatus, orderedDate, userId, restaurantId} = props.item;
  const[ showcook, setshowcook]= useState(false);
  const shwoCookingIns = useSelector((state) => state.restaurant.setCooking);
  // deliveryDetails

//   const deliveryId = store.getState().delivery.deliveryDetails[0].Id;

  const denyOrder = () => {
    console.log('inside the denyOrder');
    dispatch(deleteOrderItems(Id));
    

    axios.put(apiConstants.CRUD_OFFLINE+'/updateOrderStatus ', { 
      params: {
        orderId: Id,
        orderStatus: 'Restaurant Denied',
      }}).then((response) => {
      console.log('orderAccepted', response.data); 
      setOrderStatus('Restaurant Denied');
      // console.log('response', );

    }).catch((e) => {
      console.log('error getting the values', e);
      toast.current.show({
        severity: 'error',
        summary: 'Something went wrong while updating the order status',
        detail: e.response.data.message,
      });
    });

  }

  const acceptOrder = () => {

    //  orderId: Id,

    // orderStatus: 'Restaurant Accepted',

    // agentId: deliveryId
    // http://localhost:3001/dev/updateOrderStatus 
    setRestaurantAccepted('Restaurant Accepted');
    setAcceptOrder(true);
    setshowcook(true);
    dispatch(showCookingInstructions(true));


    axios.put(apiConstants.CRUD_OFFLINE+'/updateOrderStatus ', { 
      params: {
        orderId: Id,
        orderStatus: 'Restaurant Accepted',
      }}).then((response) => {
      console.log('orderAccepted', response.data); 

  
      // console.log('response', );

    }).catch((e) => {
      console.log('error getting the values', e);
      toast.current.show({
        severity: 'error',
        summary: 'Something went wrong while updating the order status',
        detail: e.response.data.message,
      });
    });
  }

  let restaurantName='';
  let restaurantCity='';
  let restaurantLocation=''; 

  restaurantDetails.map((item) => {
    console.log('came in');
    if(item.RestaurantId === restaurantId){
       restaurantName = item.Name;
       restaurantLocation = item.Location;
       restaurantCity = item.City;
    }
  })
  let userName='';
  let userLocation='';

  userDetails.map((item) => {
    console.log('came in users');
    if(item.UserId === userId){
       userName = item.Name;
       userLocation = item.Location;
    }
  })

  let Instruction = ''
  cookingInstructions.map((item) => {
    console.log('came in users');
    if(item.OrderId === Id){
      Instruction = item.Instruction;
    }
  })

  return (
    <tr>      
<td className="text-center">{Id}</td>
<td className="text-center">
 {(isrestaurantAccepted!=='')? isrestaurantAccepted: orderStatus }
    </td> 
{/* <td className="text-center">{userId}</td>  */}
<td className="text-center">{restaurantName}</td> 
<td className="text-center">{restaurantLocation}</td> 
<td className="text-center">{restaurantCity}</td> 
<td className="text-center">{userName}</td> 
<td className="text-center">{userLocation}</td>

{ showcook && 

<td className="text-center">
<h6>Cooking Instructions :</h6>
  {Instruction}


  <button type="submit" className="addTOCart__btn" style={{ marginLeft: '10px', marginTop: '10px' }} onClick={()=>{
    setshowcook(false);
  }} >
   Noted 
   </button>
  
  
  </td>
}
<td className="text-center">

{/* onClick={acceptOrder}  */}
  <div type="submit" className="addTOCart__btn" disabled={isAcceptOrder} onClick={acceptOrder}  >
{isAcceptOrder? 'Accepted Order' : 'Accept Order'}
   </div>
 <span>
 { !isAcceptOrder && (
   <button type="submit" className="addTOCart__btn" style={{ marginLeft: '10px', marginTop: '10px' }} onClick={denyOrder} >
   Deny Order
   </button>
 ) 
}
</span>

   {/* <span onClick={denyOrder(Id)}> </span> */}
   

</td>




{/* <td className="text-center">
    


    <button type="submit" className="addTOCart__btn"  >

            <Link to={`/showOrders/${props.item}`}>Order{props.item}</Link>
     </button>
    
    
    
    </td> */}


     
      {/* <td className="text-center">Order{props.item}</td> */}
      {/* <td className="text-center cart__item-del">
        <i class="ri-delete-bin-line" onClick={deleteItem}></i>
      </td> */}
      <Toast ref={toast}></Toast>
    </tr>
  );
};

export default RestaurantOrders;










// import React, { useState } from "react";

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




// const TotalOrders = () => {
// //   const cartItems = useSelector((state) => state.cart.cartItems);
//   const orderItem = store.getState().orderItems.orderItems;
//   const[ordersItems, setOrderItems] = useState(orderItem);

//   const orders = store.getState().orders.orders;
  
//   const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
//   const orderId = store.getState().orderHistoryItems.ordersId;
//   console.log('orderHistory', orderHistory);




//   const restaurantDetails = store.getState().restaurant.restaurantDetails;
//   const userDetails = store.getState().user.userDetails;
//   const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
// //   const { menuId, quantity, price } = props.item;
//   console.log('props.items', props.item);
//   const dispatch = useDispatch();
// //   const userId = store.getState().auth.userId;

//   const { Id, orderStatus, orderedDate, userId, restaurantId} = props.item;

//   const denyOrder = () => {



//   }

//   let restaurantName='';
//   let restaurantCity='';
//   let restaurantLocation=''; 

//   restaurantDetails.map((item) => {
//     console.log('came in');
//     if(item.RestaurantId === restaurantId){
//        restaurantName = item.Name;
//        restaurantLocation = item.Location;
//        restaurantCity = item.City;
//     }
//   })
//   let userName='';
//   let userLocation='';

//   userDetails.map((item) => {
//     console.log('came in users');
//     if(item.UserId === userId){
//        userName = item.Name;
//        userLocation = item.Location;
//     }
//   })
  
  
   




// //   orderHistory.map((item) => {
  

// //     console.log(item[0]);

// //   })


// Object.keys(orders).map((key, index) => {


//     console.log('orders', key, index);

 

//     // console.log('value', index);
//     // console.log('values', orderHistory[key]);
// });
  
// //   console.log('orderItem', orderItem);
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
//               {orders.length === 0 ? (
//                 <h5 className="text-center">Your orders are empty</h5>
//               ) : (
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>OrderId</th>
//                       <th>OrderStatus</th>
//                       <th>OrderedDate</th>  
//                       <th>UserId</th>
//                       <th>RestaurantName</th>
//                       <th>RestaurantLocation</th>
//                       <th>RestaurantCity</th>
//                       <th>UserName</th>
//                       <th>UserLocation</th>
//                       <th>Actions</th>



//                     </tr>
//                   </thead>
//                   <tbody>
//                 {  orders.map( (item, index) => (






// <tr>      
// <td className="text-center">{Id}</td>
// <td className="text-center">{orderStatus}</td> 
// <td className="text-center">{orderedDate}</td>
// <td className="text-center">{userId}</td> 
// <td className="text-center">{restaurantName}</td> 
// <td className="text-center">{restaurantLocation}</td> 
// <td className="text-center">{restaurantCity}</td> 
// <td className="text-center">{userName}</td> 
// <td className="text-center">{userLocation}</td>
// <td className="text-center">

// <button type="submit" className="addTOCart__btn" >
// Accept Order
// </button>

// <button type="submit" className="addTOCart__btn" onClick={denyOrder} >
// Deny Order
// </button>

// </td>
// </tr>
                    
//                     // <Tr item={item} key={index} />
            
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

//   const restaurantDetails = store.getState().restaurant.restaurantDetails;
//   const userDetails = store.getState().user.userDetails;
//   const orderHistory  = store.getState().orderHistoryItems.orderItemsHistory;
// //   const { menuId, quantity, price } = props.item;
//   console.log('props.items', props.item);
//   const dispatch = useDispatch();
// //   const userId = store.getState().auth.userId;

//   const { Id, orderStatus, orderedDate, userId, restaurantId} = props.item;

//   const denyOrder = () => {



//   }

//   let restaurantName='';
//   let restaurantCity='';
//   let restaurantLocation=''; 

//   restaurantDetails.map((item) => {
//     console.log('came in');
//     if(item.RestaurantId === restaurantId){
//        restaurantName = item.Name;
//        restaurantLocation = item.Location;
//        restaurantCity = item.City;
//     }
//   })
//   let userName='';
//   let userLocation='';

//   userDetails.map((item) => {
//     console.log('came in users');
//     if(item.UserId === userId){
//        userName = item.Name;
//        userLocation = item.Location;
//     }
//   })

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
//       <td className="text-center">{Id}</td>
// <td className="text-center">{orderStatus}</td> 
// <td className="text-center">{orderedDate}</td>
// <td className="text-center">{userId}</td> 
// <td className="text-center">{restaurantName}</td> 
// <td className="text-center">{restaurantLocation}</td> 
// <td className="text-center">{restaurantCity}</td> 
// <td className="text-center">{userName}</td> 
// <td className="text-center">{userLocation}</td>
// <td className="text-center">

//   <button type="submit" className="addTOCart__btn" >
//    Accept Order
//    </button>

//    <button type="submit" className="addTOCart__btn" onClick={denyOrder} >
//    Deny Order
//    </button>

// </td>
//     </tr>
//   );
// };

// export default TotalOrders;



