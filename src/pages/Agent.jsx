// import React, { useEffect, useState } from "react";
// import store from "../store/store";
// import { useNavigate } from 'react-router';
// import axios from "axios";
// import { getJWT } from "../service/authService";
// import { useDispatch } from "react-redux";




// import CommonSection from "../components/UI/common-section/CommonSection";
// import Helmet from "../components/Helmet/Helmet";
// import "../styles/cart-page.css";
// import { useSelector } from "react-redux";
// import { Container, Row, Col } from "reactstrap";
// import { cartActions } from "../store/shopping-cart/cartSlice";
// import { Link } from "react-router-dom";


// import { setOrderItems } from "../store/shopping-cart/orderItemsStore";
// import { useParams } from "react-router-dom";
// import { setDeliveryState } from "../store/shopping-cart/deliveryStore";





// const Agent = () => {

//   const navigate = useNavigate();
//   const authenticated = store.getState().auth.authenticated;
//   const userId = store.getState().auth.userId;
//   const [deliveryDetails, setDeliveryDetails] = useState([]);
//   const name = store.getState().auth.name;
//   const dispatch = useDispatch();



//   // const { Name, currentLocation, currentCity, IsAvailable } = props.item;
//   const [isEditClicked, setEditButton] = useState(false);

//   const [availablity, setAvailability] = useState(false);
//   // if (IsAvailable === 0) {
//   //   setAvailability(false);
//   // } else {
//   //   setAvailability(true);
//   // }
  


//   useEffect(() => {

//     if (!authenticated) {
//       navigate('/');
//     } else {
//       axios.get('http://localhost:8080/deliveryDetails', {
//         params: {
//           Name: userId,
//         },
//         headers: { "Authorization": `Bearer ${getJWT()}` }
//       }).then((response) => {
//         console.log('response', response.data);
//         dispatch(setDeliveryState(response.data));
//         setDeliveryDetails(response.data);
//         // dispatch(cartActions.setMenuList(response.data));
//         // navigate('/foods');

//       }).catch((e) => {
//         console.log('error getting the values', e);
//       });
//     }

//   }, []);


//   return (
//     <Helmet title="Cart">
//       <CommonSection title="Agent Details" />
//       <section>
//         <Container>
//           <Row>
//             <Col lg="12">
//               {deliveryDetails.length === 0 ? (
//                 <h5 className="text-center">No User Details</h5>
//               ) : (
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>DeliverAgent Name</th>
//                       <th>Current Location</th>
//                       <th>Current City</th>
//                       <th>IsAvailable</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {deliveryDetails.map((item, index) => (
//                       // <Tr item={item} key={index} />

        

//                       <tr>
//                       <td className="text-center">{item.Name}</td>
//                       <td className="text-center">{item.currentLocation}</td>
//                       <td className="text-center">{item.currentCity}</td>
//                       <td className="text-center"> yes </td>
//                       <td className="text-center">
//                         <button type="submit" className="addTOCart__btn" onClick={() => {
//                           setEditButton(true) }} >
//                           Edit Availability
//                         </button>
//                       </td>
//                     </tr>


//                     ))}
//                   </tbody>
//                 </table>
//                )} 
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// }



// const Tr = (props) => {
//   const { Name, currentLocation, currentCity, IsAvailable } = props.item;
//   const [isEditClicked, setEditButton] = useState(false);
//   const dispatch = useDispatch();

//   const [availablity, setAvailability] = useState(false);
//   if (IsAvailable === 0) {
//     setAvailability(false);
//   } else {
//     setAvailability(true);
//   }
//   // const handleChange = (e) => {

//   //   e.preventDefault();
//   //   const { name, value } = e.target;
//   //   console.log('evalue', e, name, value);
//   //   if (value === "Yes") {
//   //     setAvailability(true);
//   //   }
//   //   if (value === "No") {
//   //     setAvailability(false);
//   //   }

//   // }

//   return (
//     <tr>
//       <td className="text-center">{Name}</td>
//       <td className="text-center">{currentLocation}</td>
//       <td className="text-center">{currentCity}</td>
//       <td className="text-center"> {availablity} </td>
//       <td className="text-center">
//         <button type="submit" className="addTOCart__btn" onClick={() => {
//           setEditButton(true) }} >
//           Edit Availability
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default Agent;













import React, { useEffect, useState, useRef } from "react";
import store from "../store/store";
import { useNavigate } from 'react-router';
import axios from "axios";
import { getJWT } from "../service/authService";
import { useDispatch } from "react-redux";
import { Toast } from 'primereact/toast';




import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";


import { setOrderItems } from "../store/shopping-cart/orderItemsStore";
import { useParams } from "react-router-dom";
import { setDeliveryState , setDeliveryAvaialbility} from "../store/shopping-cart/deliveryStore";
import { setOrders } from "../store/shopping-cart/orderStore";
import { setRestaurantDetails } from "../store/shopping-cart/restaurantStore";
import  {setUserDetails} from "../store/shopping-cart/userStore";

import ApiConstants from '../constants/apiConstants';
import { useLocation } from "react-router-dom";
import ToastConstants from "../constants/toastConstants.js";
import { setWelcomeToast } from '../store/authStore';
import "../styles/loader.css";




const Agent = () => {

  const navigate = useNavigate();
  const authenticated = store.getState().auth.authenticated;
  const userId = store.getState().auth.userId;
  const [deliveryDetails, setDeliveryDetails] = useState([]);
  const dispatch = useDispatch();
  const apiConstants = new ApiConstants();
  const toast = useRef(null);
  const toastConstants = new ToastConstants();
  const location = useLocation();
  const welcomeToast = useSelector((state) => state.auth.welcomeToast);
  const [loader, setLoader] = useState(true);




  // const { Name, currentLocation, currentCity, IsAvailable } = props.item;
  const [isEditClicked, setEditButton] = useState(false);

  const [availablity, setAvailability] = useState(false);
  // if (IsAvailable === 0) {
  //   setAvailability(false);
  // } else {
  //   setAvailability(true);
  // }
  


  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    } else {


      if (location?.state?.message?.title === toastConstants.SUCCESS_TITLE && welcomeToast === true) {
        toast.current.show({
          severity: toastConstants.SUCCESS_TITLE,
          summary: "Success",
          detail: location.state.message.detail,
          life: 3000,
        
        });
        dispatch(setWelcomeToast(false));
      }

      axios.get(apiConstants.SERVERLESS_OFFLINE+'/deliveryDetails', {
        params: {
          Name: userId,
        },
        headers: { "Authorization": `Bearer ${getJWT()}` }
      }).then((response) => {
        console.log('response', response.data);
        dispatch(setDeliveryState(response.data));
        setDeliveryDetails(response.data);
        dispatch(setDeliveryAvaialbility(response.data[0].IsAvailable));
        // dispatch(cartActions.setMenuList(response.data));
        // navigate('/foods');

      }).catch((e) => {
        console.log('error getting the values', e);
        toast.current.show({
          severity: 'error',
          summary: 'Something went wrong while fetching the delivery details',
          detail: e.response.data.message,
        });
      });
    }

    axios.get(apiConstants.SERVERLESS_OFFLINE+'/orders', {  
        headers: { "Authorization": `Bearer ${getJWT()}` }
      }).then((response) => {
        console.log('response', response.data);
        dispatch(setOrders(response.data));

        localStorage.setItem("orderItems", JSON.stringify(response.data));

        
        let restaurantIds = [];
        let userIds = [];
        (response.data).map((item, pos) => {
          
          if(! restaurantIds.includes(item.restaurantId) ){
          restaurantIds.push(item.restaurantId);
          }
            
          if(! userIds.includes(item.userId) ){
            userIds.push(item.userId);
            }

        })

        // http://localhost:8080/RestaurantDetails
        

        axios.get(apiConstants.SERVERLESS_OFFLINE+'/RestaurantDetails', { 
          params: {
            restaurantIds: restaurantIds ,
          },
        headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
          console.log('Inside Agent.jsx', response.data);
          dispatch(setRestaurantDetails(response.data));
          // dispatch(cartActions.setMenuList(response.data));  
        }).catch((e) => {
          console.log('error getting the values', e);
          toast.current.show({
            severity: 'error',
            summary: 'Something went wrong while fetching the restaurant details',
            detail: e.response.data.message,
          });
        });


        axios.get(apiConstants.SERVERLESS_OFFLINE+'/UserDetails', { 
          params: {
            userIds: userIds,
          },
        headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
          setLoader(false);
          console.log('Inside Agent.jsx', response.data);
          dispatch(setUserDetails(response.data));
          // dispatch(cartActions.setMenuList(response.data));  
        }).catch((e) => {
          console.log('error getting the values', e);
          toast.current.show({
            severity: 'error',
            summary: 'Something went wrong while fetching the user details',
            detail: e.response.data.message,
          });
        });
      }).catch((e) => {
        setLoader(false);
        console.log('error getting the values', e);
        toast.current.show({
          severity: 'error',
          summary: 'Something went wrong while fetching the order details',
          detail: e.response.data.message,
        });
      });
  

  }, []);


  return (
    <Helmet title="Cart">
      <CommonSection title="Agent Details" />
      {loader && (
              <div>
                <span className="loader">
                  <i className="pi pi-spin pi-spinner" />
                </span>
              </div>
            )}
             {!loader && (
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {deliveryDetails.length === 0 ? (
                <h5 className="text-center">No User Details</h5>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>DeliverAgent Name</th>
                      <th>Current Location</th>
                      <th>Current City</th>
                      <th>IsAvailable</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryDetails.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
               )} 
            </Col>
          </Row>
        </Container>
      </section>)}
      <Toast ref={toast}></Toast>
    </Helmet>
  );
}



const Tr = (props) => {
  const { Name, currentLocation, currentCity, IsAvailable } = props.item;
  const [isEditClicked, setEditButton] = useState(false);
  const dispatch = useDispatch();
  const name = store.getState().auth.name;

  const [availablity, setAvailability] = useState((IsAvailable===true)? true: false);
  const toast = useRef(null);
  console.log('availablity', availablity);
  const apiConstants = new ApiConstants();



  // if (IsAvailable === 0) {
  //   setAvailability(false);
  // } else {
  //   setAvailability(true);
  // }


  const saveChanges = ( ) => {



    setEditButton(false);
    dispatch(setDeliveryAvaialbility(availablity));

    axios.put(apiConstants.CRUD_OFFLINE+'/updateDeliveryAvailability', { 
      params: {
        IsAvailable: availablity ,
        userId: deliveryName
      }}).then((response) => {
        console.log('orderAccepted', response.data); 
      }).catch((e) => {
        console.log('error getting the values', e);
        toast.current.show({
          severity: 'error',
          summary: 'Something went wrong while updating the availability ',
          detail: e.response.data.message,
        });
      });
  }


  const cancelChanges = () => {

    setEditButton(false);

  }

  const deliveryName = store.getState().delivery.deliveryDetails[0].Name;
  const handleChange = (e) => {

    e.preventDefault();
    const { name, value } = e.target;
    console.log('evalue', e, name, value);
    if (value === "Yes") {


      setAvailability(true);
    }
    if(value === "No") {

      setAvailability(false);
    }

  }
  

  return (
    <tr>
      <td className="text-center">{name}</td>
      <td className="text-center">{currentLocation}</td>
      <td className="text-center">{currentCity}</td>
      {/* <td className="text-center"> {availablity} </td> */}

{/* 
      {((!isEditClicked &&  !IsAvailable  && availablity )) && (
        <td className="text-center"> 

         Yes
         </td>
         )
      }
      {((!isEditClicked &&  !IsAvailable && !availablity)) && (
        <td className="text-center"> 
         No
         </td>)
      }  */}


       {(IsAvailable && !isEditClicked) && (
        <td className="text-center"> 
        {(availablity === true) ? 'Yes': 'No' }
         </td>)
      }
   {(!IsAvailable && !isEditClicked) && (
        <td className="text-center"> 
        {(availablity === false) ? 'No': 'Yes'}
         </td>)
    }
         
      
      {/* {((!isEditClicked &&  !IsAvailable && !availablity)) && (
        <td className="text-center"> 
         No
         </td>)
      }  */}

    {/* {((!isEditClicked &&  IsAvailable  && availablity )) && (
        <td className="text-center"> 
         Yes
         </td>
         )
      }
      {((!isEditClicked &&  IsAvailable && !availablity)) && (
        <td className="text-center"> 
         No
         </td>)
      } 
      */}
     
         {/* {((!isEditClicked &&  IsAvailable  && !availablity )) && (
        <td className="text-center"> 
         No
         </td>)
      }
      {((!isEditClicked &&  IsAvailable && availablity)) && (
        <td className="text-center"> 
         Yes
         </td>)
      }  */}
      {isEditClicked && (
        <td className="text-center">
         <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value="Yes"
                className="form-check-input"
                // checked={IsAvailable}
                onChange={handleChange}
              />
              Yes
            </label>
          </div>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value="No"
                className="form-check-input"
                // checked={IsAvailable}
                onChange={handleChange}
              />
              No
            </label>
          </div>
          <button type="submit" className="addTOCart__btn" onClick={saveChanges} >
            Save
          </button>
          <button type="submit" style={{ marginLeft: '10px' }} className="addTOCart__btn" onClick={cancelChanges} >
            Cancel
          </button>
        </td>
        )}
      <td className="text-center">
        <button type="submit" className="addTOCart__btn" onClick={() => {
          setEditButton(true)}} >
          Edit Availability
        </button>
      </td>
      <Toast ref={toast}></Toast>
    </tr>
  );
};

export default Agent;















