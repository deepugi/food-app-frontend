import React, { useState, useEffect, useRef } from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
import store from '../store/store';

import { getJWT } from "../service/authService";
import { deleteOrderItems } from "../store/shopping-cart/orderStore";
import { deleteMenuItemsBasedOnRestaurant } from "../store/shopping-cart/menuStore";

import ApiConstants from '../constants/apiConstants';
import { deleteDeliveryAgent, setNewDeliveryList } from "../store/shopping-cart/deliveryStore";
import { Toast } from 'primereact/toast';




const AdminDelivery = () => {
    //   const cartItems = useSelector((state) => state.cart.cartItems);
    // const menuItems = store.getState().menu.menuItemsBasedOnRestaurant;
    //   const menuItems = useSelector((state) => state.menu.menuItemsBasedOnRestaurant);



    const apiConstants = new ApiConstants();
    const toast = useRef(null);

    // const orderHistory = store.getState().orderHistoryItems.orderItemsHistory;
    // console.log('orderHistory', orderHistory);

    // const restaurantId = store.getState().restaurant.oneRestaurantDetails[0].Id;
    // console.log('restaurantId', restaurantId);

    const [addItem, setAddItem] = useState(false);

    // restaurantEmail, restaurantCity, restaurantAddress, restaurantLocation


                     
    const dispatch = useDispatch();
    
    const [agentName, setagentName] = useState();
    const [agentCity, setagentCity] = useState();
    const [agentLocation, setagentLocation] = useState();
    const [isAgentAvailable, setisAgentAvailable] = useState();





    // const [allRestaurants, setRestaurants] = useState([]);

    // const restaurants = store.getState().restaurant.allRestaurants;

    // const restaurants = useSelector((state) => state.restaurant.allRestaurants);

    const agents = useSelector((state) => state.delivery.allDeliveryList);



    //   orderHistory.map((item) => {
    //     console.log(item[0]);
    //   })

    // useEffect(() => {

    //     axios.get(apiConstants.SERVERLESS_OFFLINE + '/allProducts', { headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
    //         console.log('restaurants', response.data);

    //         setRestaurants(response.data);
    //         localStorage.setItem("allProducts", JSON.stringify(response.data));
    //     }).catch((e) => {
    //         console.log('error getting the values', e);
    //     });

    // }, []);






    // let menuIds = [];

    // const onSave = () => {








    //     setAddItem(false);




    // }

    const onCancel = () => {

        setAddItem(false);
    }




    const AddItem = () => {

        setAddItem(true);


    }



    const onSave = () => {








        setAddItem(false);


        

        

        

        // city:  restaurantCity
        // Email: restaurantEmail
        // ImageURL: restaurantImageURL
        // Is_Closed:false
        // Name: restaurantName
        // Rating: 5.0



        //address table 

        // Street: restaurantAddress
        // Location: restaurantLocation
        // City: restaurantCity
        // RestaurantId: 










        // http://localhost:3001/dev/addMenuItem  



        // https://5yiyd1jk15.execute-api.us-east-1.amazonaws.com/dev/addMenuItem
        // http://localhost:3001/dev/addMenuItem

        // addDeliveryAgent 


            //  Name:
            //                         currentLocation:
            //                         currentCity:
            //                         IsAvailable: 

        axios.post(apiConstants.CRUD_OFFLINE + '/addDeliveryAgent', {
            params: {
                     Name: agentName,
                     currentLocation: agentLocation,
                     currentCity:agentCity,
                    IsAvailable: isAgentAvailable
             
            }
        }).then((response) => {
            console.log('Restaurant Response', response.data);
            dispatch(setNewDeliveryList(response.data));
        }).catch((e) => {
            console.log('error getting the values', e);
            toast.current.show({
                severity: 'error',
                summary: 'Something went wrong while adding delivery agent',
                detail: e.response.data.message,
              });
        });
    }




    return (
        <Helmet title="Cart">
            <CommonSection title="Delivery Agents" />
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            {agents?.length === 0 ? (
                                <h5 className="text-center">NO agents</h5>
                            ) : (

                                <>
                                    <button type="submit" className="add_button" onClick={AddItem} >
                                        Add Agent
                                    </button>

            

                                    {addItem && (


                                        <form className="checkout__form" >
                                            <div className="form__group">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Agent  name"
                                                    required
                                                    onChange={(e) => {
                                                        setagentName(e.target.value)
                                                    }}


                                                />
                                            </div>
                                            <div className="form__group">
                                                <input
                                                    type="text"
                                                    placeholder="Enter location"
                                                    required
                                                    onChange={(e) => {
                                                        setagentLocation(e.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className="form__group">
                                                <input
                                                    type="text"
                                                    placeholder="Enter city"
                                                    required
                                                    onChange={(e) => {
                                                        setagentCity(e.target.value)
                                                    }}
                                                />
                                            </div>

                                            <h6 className="d-flex align-items-center justify-content-between mb-3">
                                                IsAvailable:
                                            </h6>
                                            <div className="form_check">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="react-tips"
                                                        value="Yes"
                                                        className="form-check-input"
                                                    // checked={IsAvailable}
                                                      onChange={(e) => {
                                                        if(e.target.value === 'Yes'){
                                                            setisAgentAvailable(true)

                                                        }

                                                      }}
                                                    />
                                                    Yes
                                                </label>
                                            </div>

                                            <div className="form_check">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="react-tips"
                                                        value="No"
                                                        className="form-check-input"
                                                        onChange={(e) => {
                                                            if(e.target.value === 'No'){
                                                                setisAgentAvailable(false)

                                                            }
    
                                                          }}
                                                    
                                                    />
                                                    No
                                                </label>
                                            </div>

                                            <button type="submit" style={{ marginTop: '10px', marginBottom: '10px' }} className="addTOCart__btn"
                                                onClick={onSave}
                                            >
                                                Save
                                            </button>
                                            <button type="submit" style={{ marginLeft: '10px' }} className="addTOCart__btn"
                                             onClick={onCancel}
                                            >
                                                Cancel
                                            </button>
                                        </form>


                                    )}








                                    {!addItem && (
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Restaurant Name</th>
                                                    <th>Location</th>
                                                    <th>City</th>
                                                    <th>IsAvailable</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {agents.map((item, index) => (
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
                                        </table>)}
                                </>

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

    const orders = useSelector((state) => state.orders.orders);/// change
    const apiConstants = new ApiConstants();
    const toast = useRef(null);

    const denyOrder = () => {
        console.log('inside the denyOrder');
        dispatch(deleteOrderItems(Id));
    }

    console.log('props.items', props.item);
    const dispatch = useDispatch();
    const [isEditClicked, setEditButton] = useState(false);



    const [priceValue, setPriceValue] = useState(0);


    const [emailValue, setEmailValue] = useState('');
    const [isClosed, setIsClosed] = useState();
    //   const userId = store.getState().auth.userId;



    const { Id, Name, currentLocation, currentCity, IsAvailable } = props.item;
    const [availablity, setAvailability] = useState((IsAvailable === true) ? true : false);


    // let restaurantName = '';
    // let restaurantCity = '';
    // let restaurantLocation = '';



    const deleteItem = () => {

        dispatch(deleteDeliveryAgent(Id));
        axios.delete(apiConstants.CRUD_OFFLINE + '/deleteAgent', {
            params: {
                agentId: Id,
            }
        }).then((response) => {
            console.log('deletedRestaurant', response.data);

        }).catch((e) => {
            console.log('error getting the values', e);
            toast.current.show({
                severity: 'error',
                summary: 'Something went wrong while deleting the agent',
                detail: e.response.data.message,
              });
        });
    }


    const saveChanges = () => {

        setEditButton(false);
        if (isClosed === true) {
            setAvailability(true);
        }
        if (isClosed === false) {
            setAvailability(false);
        }
        // axios.put(apiConstants.CRUD_OFFLINE+'/updateMenuItemsPrice  ', {
        //     params: {
        //         Item_Price: priceValue,
        //         Id: Id
        //     }
        // }).then((response) => {
        //     console.log('updated menu', response.data);
        // }).catch((e) => {
        //     console.log('error getting the values', e);
        // });
    }


    const cancelChanges = () => {

        setEditButton(false);

    }

    // const handleChange = (e) => {

    //     e.preventDefault();
    //     const { name, value } = e.target;
    //     console.log('evalue', e, name, value);
    //     if (value === "Yes") {


    //         setAvailability(true);
    //     }
    //     if (value === "No") {

    //         setAvailability(false);
    //     }
    // }













    return (
        <tr>
            <td className="text-center">
                {Name ==='333c6814-730a-4f7d-b748-992b1d582d67'? 'Vinod': Name}
                </td>
            <td className="text-center">{currentLocation}</td>
            <td className="text-center">{currentCity}</td>

            <td className="text-center">
                {(IsAvailable === true) ? 'Yes' : 'No'}
            </td>






            {/* {!isEditClicked && (
                <td className="text-center">
                    {emailValue !== '' ? emailValue : Email}
                </td>
            )}


            {isEditClicked && (
                <td className="text-center">
                    <input
                        type="text"
                        placeholder="enter email"
                        onChange={(e) => setEmailValue(e.target.value)}

                    />
                    <div>
                        <button type="submit" style={{ marginTop: '10px', marginBottom: '10px' }} className="save_button" onClick={saveChanges}>
                            Save
                        </button>
                        <button type="submit" style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px' }} className="addTOCart__btn" onClick={() => {
                            setEmailValue('');
                            setEditButton(false);
                        }}>
                            Cancel
                        </button>

                    </div>


                </td>

            )} */}






















            {/* {(Is_Closed && !isEditClicked) && (
                <td className="text-center">
                    {(availablity === true) ? 'Yes' : 'No'}
                </td>)
            }
            {(!Is_Closed && !isEditClicked) && (
                <td className="text-center">
                    {(availablity === false) ? 'No' : 'Yes'}
                </td>)
            }


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
                                onChange={(e) => {

                                    setIsClosed(true)
                                }}

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
                                onChange={(e) => {
                                    setIsClosed(false)
                                }}

                            />
                            No
                        </label>
                    </div>
                    <button type="submit" className="addTOCart__btn" onClick={saveChanges} >
                        Save
                    </button>
                    <button type="submit" className="addTOCart__btn" onClick={cancelChanges} >
                        Cancel
                    </button>
                </td>
            )} */}


            <td className="text-center">
                {/* <button type="submit" className="addTOCart__btn" onClick={() => {
                    setEditButton(true)
                }} >
                    Edit
                </button> */}


                <button type="submit" className="save_button" onClick={deleteItem} >
                    Delete Item
                </button>
            </td>











            {/* <td className="text-center">
                <button type="submit" className="addTOCart__btn" onClick={() => {
                    setEditButton(true)
                }} >
                    Edit Price
                </button>

                <button type="submit" className="save_button" onClick={deleteItem} >
                    Delete Item
                </button>
            </td> */}
            <Toast ref={toast}></Toast>
        </tr>
    );
};

export default AdminDelivery;








