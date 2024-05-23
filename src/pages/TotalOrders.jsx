import React, { useState , useRef} from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../store/store";
import { setMenuListFromOrder } from "../store/shopping-cart/menuStore";
import { getJWT } from "../service/authService";
import { deleteOrderItems } from "../store/shopping-cart/orderStore";
import ApiConstants from "../constants/apiConstants";
import { Toast } from 'primereact/toast';

const TotalOrders = () => {
  //   const cartItems = useSelector((state) => state.cart.cartItems);
  const orderItem = store.getState().orderItems.orderItems;
  const [ordersItems, setOrderItems] = useState(orderItem);
  const toast = useRef(null);

  // const orders = store.getState().orders.orders;

  const orders = useSelector((state) => state.orders.orders);

  const orderHistory = store.getState().orderHistoryItems.orderItemsHistory;
  const orderId = store.getState().orderHistoryItems.ordersId;
  console.log("orderHistory", orderHistory);

  const deliverydetails = store.getState().delivery.deliveryDetails;


  

  //   orderHistory.map((item) => {

  //     console.log(item[0]);

  //   })

  Object.keys(orders).map((key, index) => {
    console.log("orders", key, index);

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
    });

    //   e.preventDefault();
    axios
      .get("http://localhost:8080/getMenu", {
        params: {
          menuIds: menuIds,
        },
        headers: { Authorization: `Bearer ${getJWT()}` },
      })
      .then((response) => {
        console.log("menuItems", response.data);
        // dispatch(setMenuListFromOrder(response.data));
      })
      .catch((e) => {
        console.log("error getting the values", e);
        toast.current.show({
          severity: 'error',
          summary: 'Something went wrong while fetching the menu item',
          detail: e.response.data.message,
        });
      });
  };

  return (
    <Helmet title="Cart">
      <CommonSection title="Accept or Deny Orders" />
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
                      {/* <th>OrderedDate</th>   */}
                      {/* <th>UserId</th> */}
                      <th>RestaurantName</th>
                      <th>RestaurantLocation</th>
                      <th>RestaurantCity</th>
                      <th>UserName</th>
                      <th>UserLocation</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(
                      (item, index) =>
                       ( (item.orderStatus === "Restaurant Accepted" &&
                        item.agentId === deliverydetails[0].Id) || ( item.orderStatus === "Agent Picked" &&
                        item.agentId === deliverydetails[0].Id ) || (item.orderStatus === "shipping" &&
                        item.agentId === deliverydetails[0].Id)  || (item.orderStatus === "Agent Accepted" &&
                        item.agentId === deliverydetails[0].Id)  || (item.orderStatus === "Reached" &&
                        item.agentId === deliverydetails[0].Id)  || (item.orderStatus === "Waiting" &&
                        item.agentId === deliverydetails[0].Id) )&& (
                          <Tr item={item} key={index} />
                        )

                      //  orderHistory[key].map((item, pos) => (

                      //     <Tr item={item} key={index} />
                      //  ))

                      //  <Tr items={orderHistory[key]} key={index} />
                    )}

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
  //   const { menuId, quantity, price } = props.item;
  console.log("props.items", props.item);
  const toast = useRef(null);
  const dispatch = useDispatch();
  //   const userId = store.getState().auth.userId;

  const { Id, orderStatus, orderedDate, userId, restaurantId } = props.item;
  // deliveryDetails
  const deliveryId = store.getState().delivery.deliveryDetails[0].Id;

  const deliverydetails = useSelector((state) => state.delivery.deliveryDetails);
  const availability = useSelector((state) => state.delivery.setDeliveryAvaialability);
  


  const [editEnabled, setEditEnabled] = useState(false);
  const [selected, setSelected] = useState(false);
  const [orderstatus, setorderStatus] = useState();




  const [isagentReached, setAgentReached] = useState((orderStatus==='Reached'||orderStatus==='Waiting'||orderStatus === 'Agent Picked'|| orderStatus==='shipping' || orderStatus==='delivered')? true: false );
  const [isagentWaiting, setWaiting] = useState((orderStatus==='Waiting'||orderStatus === 'Agent Picked'|| orderStatus==='shipping' || orderStatus==='delivered')? true: false );
  const [isagentPicked, setAgentPicked] = useState((orderStatus === 'Agent Picked'|| orderStatus==='shipping' || orderStatus==='delivered')? true: false );
  const [isshipped, setIsshipped] = useState(( orderStatus==='shipping' || orderStatus==='delivered')? true: false);
  const [isdelivered, setIsDelivered] = useState((orderStatus==='delivered')? true: false);

  // Reached
  // Waiting
const [ acceptorder , setacceptOrder] = useState(true);


  const [label, setLabel] = useState('');


  const cancelChanges = () => {

    setSelected(false);
    setEditEnabled(false);
}


  const denyOrder = () => {
    console.log("inside the denyOrder");
    // dispatch(deleteOrderItems(Id));


    if(availability){
      axios
      .put(apiConstants.CRUD_OFFLINE + "/updateOrderStatus ", {
        params: {
          orderId: Id,
          orderStatus: "Agent Denied",
          agentId: deliveryId,
        },
      })
      .then((response) => {
        console.log("orderAccepted", response.data);
        setAcceptOrder(false);
        // console.log('response', );
      })
      .catch((e) => {
        console.log("error getting the values", e);
        toast.current.show({
          severity: 'error',
          summary: 'Something went wrong while updating  the order status',
          detail: e.response.data.message,
        });
      });
      } else{
  
        toast.current.show({
          severity: 'error',
          summary: 'error in denying',
          detail: 'your ur not available at the moment.. please update the availability to deny the order',
        });
  
      }
   
  };

  const acceptOrder = () => {



    if(availability){
    setEditEnabled(true);
    setSelected(false);
    setAcceptOrder(true);


    if(orderStatus === 'Restaurant Accepted' && availability && label === ''){

      setSelected(true);
     setLabel('Agent Accepted');



    axios.put(apiConstants.CRUD_OFFLINE+'/updateOrderStatus ', {
      params: {
        orderId: Id,
        orderStatus: 'Agent Accepted',
        agentId: deliveryId
      }}).then((response) => {
      console.log('orderAccepted', response.data);
     
      setSelected(false);
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






    } else{

      toast.current.show({
        severity: 'error',
        summary: 'error in accepting',
        detail: 'your ur not available at the moment.. please update the availability to accept the order',
      });

    }
    
  

    //  orderId: Id,

    // orderStatus: 'Agent Picked',

    // agentId: deliveryId
    // http://localhost:3001/dev/updateOrderStatus

    //   axios.put(apiConstants.CRUD_OFFLINE+'/updateOrderStatus ', {
    //     params: {
    //       orderId: Id,
    //       orderStatus: 'Agent Picked',
    //       agentId: deliveryId
    //     }}).then((response) => {
    //     console.log('orderAccepted', response.data);

    //  setAcceptOrder(true);
    //     // console.log('response', );

    //   }).catch((e) => {
    //     console.log('error getting the values', e);
    //   });
  };




  const saveChanges = () => {


    setSelected(true);
    if(label === 'Agent Picked'){
      setAgentPicked(true);
    }
    if(label === 'delivered'){
      
      setIsDelivered(true);
    }
    if(label === 'shipping'){
      setIsshipped(true);
    }
    if(label === 'Reached'){
      setAgentReached(true);
    }
    if(label === 'Waiting'){
      setWaiting(true);
    }
    setEditEnabled(false);
    // dispatch(deleteDeliveryOptions(value));

    // orderId: Id
    // agentId: value


    // updateOrder

    // /updateAgentId

    axios.put(apiConstants.CRUD_OFFLINE+'/updateOrderStatus ', {
      params: {
        orderId: Id,
        orderStatus: label,
        agentId: deliveryId
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










  let restaurantName = "";
  let restaurantCity = "";
  let restaurantLocation = "";

  restaurantDetails.map((item) => {
    console.log("came in");
    if (item.RestaurantId === restaurantId) {
      restaurantName = item.Name;
      restaurantLocation = item.Location;
      restaurantCity = item.City;
    }
  });
  let userName = "";
  let userLocation = "";

  userDetails.map((item) => {
    console.log("came in users");
    if (item.UserId === userId) {
      userName = item.Name;
      userLocation = item.Location;
    }
  });

  return (
    <tr>
      <td className="text-center">{Id}</td>


    {(selected)  &&  (

<td className="text-center">{label}</td>

    )}



      { (!editEnabled && !selected) && (
      <td className="text-center">{orderStatus}</td>
      )}



        { (editEnabled && !selected) && (
      <td className="text-center">



<div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="Reached"
              className="form-check-input"
              disabled = {isagentReached}
              // checked={IsAvailable}
              onChange={(e) => {
              setLabel(e.target.value)
              }}

              // onChange={setValues}
            />
            Reached
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="Waiting"
              className="form-check-input"
              disabled = {(isagentReached === true  && isagentWaiting === false)? false : true}
              // checked={IsAvailable}
              onChange={(e) => {
              setLabel(e.target.value)
              }}

              // onChange={setValues}
            />
            Waiting
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="Agent Picked"
              className="form-check-input"
              disabled = {(isagentReached === true && isagentWaiting === true && isagentPicked === false)? false: true}
              // checked={IsAvailable}
              onChange={(e) => {
              setLabel(e.target.value)
              }}

              // onChange={setValues}
            />
            Agent Picked
          </label>
        </div>
    

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="shipping"
              className="form-check-input"
              //  disabled={(isagentPicked === true)? false: true }
              disabled={(isagentReached === true && isagentWaiting === true && isagentPicked === true && isshipped === false)? false: true }
              // checked={IsAvailable}
              onChange={(e) => {
                setLabel(e.target.value)
                }}
            />
            shipping
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="delivered"
              className="form-check-input"
              disabled={(isagentReached === true && isagentWaiting === true && isagentPicked === true && isshipped === true && isdelivered === false)? false: true }
              // checked={IsAvailable}
              // onChange={(e) => {

              //   options.find(obj => obj.Id === e.target.value)
              //   options.find(obj => obj.Id === e.target.value)

              // setValue(option.Id)
              // setLabel(option.Name)
              // }}

              onChange={(e) => {
                setLabel(e.target.value)
                }}
            />
            delivered
          </label>
        </div>

                  <button type="submit" className="addTOCart__btn" onClick={saveChanges} >
                        Save
                    </button>
                    <button type="submit" className="addTOCart__btn" style={{ marginLeft: '10px' }} onClick={cancelChanges} >
                        Cancel
                    </button>
      </td>
    )}

      {/* <td className="text-center">{orderedDate}</td> */}
      {/* <td className="text-center">{userId}</td>  */}
      <td className="text-center">{restaurantName}</td>
      <td className="text-center">{restaurantLocation}</td>
      <td className="text-center">{restaurantCity}</td>
      <td className="text-center">{userName}</td>
      <td className="text-center">{userLocation}</td>
      <td className="text-center">
        {/* <div type="submit" className="addTOCart__btn" onClick={acceptOrder} disabled={isAcceptOrder} >
{isAcceptOrder? 'Accepted Order' : 'Accept Order'}
   </div> */}



{acceptorder && (
        <div type="submit" className="addTOCart__btn" style={{ marginTop: "20px" }} onClick={acceptOrder}>
         Accept & Edit  Order
        </div>)}

        {/* <div type="submit" className="addTOCart__btn" onClick={denyOrder(Id)} >
   Deny Order
   </div> */}
        {/* 
   <td className="text-center cart__item-del">
        <i class="ri-delete-bin-line" onClick={(Id) => {
           dispatch(deleteOrderItems(Id))
        }} ></i>
      </td> */}





{/* { (!isAcceptOrder ||  (orderStatus !== 'Agent Picked') || (orderstatus!=='shipping')) && !(label!='')   && (
        <button
          type="submit"
          className="addTOCart__btn"
          style={{ marginTop: "4px" }}
          onClick={denyOrder}
        >
          Deny Order
        </button>
)
} */}



{/* { orderStatus === 'Restaurant Accepted' && (
        <button
          type="submit"
          className="addTOCart__btn"
          style={{ marginTop: "4px" }}
          onClick={sendacceptStatus}
        >
          Accept
        </button>
)
} */}




{ orderStatus === 'Restaurant Accepted'  && (
        <button
          type="submit"
          className="addTOCart__btn"
          style={{ marginTop: "4px" }}
          onClick={denyOrder}
        >
          Deny Order
        </button>
)
}






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

export default TotalOrders;

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
