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
import { deleteMenuItemsBasedOnRestaurant, addNewItem } from "../store/shopping-cart/menuStore";
import { Toast } from 'primereact/toast';

import ApiConstants from "../constants/apiConstants";

const ShowMenuList = () => {
  //   const cartItems = useSelector((state) => state.cart.cartItems);
  // const menuItems = store.getState().menu.menuItemsBasedOnRestaurant;
  const menuItems = useSelector(
    (state) => state.menu.menuItemsBasedOnRestaurant
  );

  const [ItemName, setItemName] = useState();

  const [ItemDescription, setItemDescription] = useState();

  const [ItemPrice, setItemPrice] = useState();

  const [ItemURL, setItemURL] = useState();

  const apiConstants = new ApiConstants();
  const toast = useRef(null);

  // const orders = store.getState().orders.orders;

  const orders = useSelector((state) => state.orders.orders);

  const orderHistory = store.getState().orderHistoryItems.orderItemsHistory;
  console.log("orderHistory", orderHistory);

  const restaurantId = store.getState().restaurant.oneRestaurantDetails[0].Id;
  console.log("restaurantId", restaurantId);

  const [addItem, setAddItem] = useState(false);
  const [isAgentAvailable, setisAgentAvailable] = useState();
  

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

  const onSave = () => {
    setAddItem(false);

    
    // http://localhost:3001/dev/addMenuItem

    // https://5yiyd1jk15.execute-api.us-east-1.amazonaws.com/dev/addMenuItem
    // http://localhost:3001/dev/addMenuItem
    axios
      .post(apiConstants.CRUD_OFFLINE + "/addMenuItem", {
        params: {
          Item_Name: ItemName,
          Item_Description: ItemDescription,
          Item_Price: ItemPrice,
          Item_URL: ItemURL,
          Restaurant_Id: restaurantId,
          Is_Available: isAgentAvailable
        },
      })
      .then((response) => {
        console.log("response", response.data);
        dispatch(addNewItem(response.data));
      })
      .catch((e) => {
        console.log("error getting the values", e);
        toast.current.show({
          severity: "error",
          summary: "Something went wrong while inserting the menu item details",
          detail: e.response.data.message,
        });
      });
  };

  const onCancel = () => {
    setAddItem(false);
  };

  const getMenuItemsList = (key) => {
    orderHistory[key].map((item, pos) => {
      if (!menuIds.includes(item.menuId)) {
        menuIds.push(item.menuId);
      }
    });

    //   e.preventDefault();
    axios
      .get(apiConstants.SERVERLESS_OFFLINE + "/getMenu", {
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
          severity: "error",
          summary: "Something went wrong while fetching the menu details",
          detail: e.response.data.message,
        });
      });
  };
  const AddItem = () => {
    setAddItem(true);
  };

  return (
    <Helmet title="Cart">
      <CommonSection title="Menu Items In This Restaurant" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {menuItems.length === 0 ? (
                <h5 className="text-center">Your menus are empty</h5>
              ) : (
                <>

                 <button
                    type="submit"
                    className="add_button"
                    onClick={AddItem}
                  >
                    Add Item
                  </button>

                  {addItem && (
                    // <table className="table table-bordered">
                    //     <thead>
                    //         <tr>
                    //             <th>ItemName</th>
                    //             <th>ItemDescription</th>
                    //             <th>ItemPrice</th>
                    //             <th>ItemURL</th>
                    //             <th>RestaurantId</th>
                    //         </tr>
                    //     </thead>
                    //     <tbody>
                    //         <td className="text-center">
                    //             <input
                    //                 type="text"
                    //                 placeholder="Enter item name"
                    //                 required
                    //             />
                    //         </td>

                    //     </tbody>
                    // </table>

                    <form className="checkout__form">
                      <div className="form__group">
                        <input
                          type="text"
                          placeholder="Enter your item name"
                          required
                          onChange={(e) => {
                            setItemName(e.target.value);
                          }}
                        />
                      </div>

                      <div className="form__group">
                        <input
                          type="email"
                          placeholder="Enter item description"
                          required
                          onChange={(e) => {
                            setItemDescription(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form__group">
                        <input
                          type="number"
                          placeholder="Enter Item Price"
                          required
                          onChange={(e) => {
                            setItemPrice(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form__group">
                        <input
                          type="text"
                          placeholder="Enter Item Image URl"
                          required
                          onChange={(e) => {
                            setItemURL(e.target.value);
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



                      <button
                        type="submit"
                        className="addTOCart__btn"
                        onClick={onSave}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        style={{ marginLeft: "10px" }}
                        className="addTOCart__btn"
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
                          <th>ItemName</th>
                          <th>ItemDescription</th>
                          <th>ItemPrice</th>
                          <th>ItemAvailability</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menuItems.map((item, index) => (
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
  const orders = useSelector((state) => state.orders.orders); /// change
  const apiConstants = new ApiConstants();
  const toast = useRef(null);

  const denyOrder = () => {
    console.log("inside the denyOrder");
    dispatch(deleteOrderItems(Id));
  };

  console.log("props.items", props.item);
  const dispatch = useDispatch();
  const [isEditClicked, setEditButton] = useState(false);
  const [priceValue, setPriceValue] = useState(0);
  //   const userId = store.getState().auth.userId;

  const { Id, Item_Description, Item_Name, Item_Price, Is_Available } = props.item;
  const [availablity, setAvailability] = useState((Is_Available === true) ? true : false);


  let restaurantName = "";
  let restaurantCity = "";
  let restaurantLocation = "";

  const deleteItem = () => {
    dispatch(deleteMenuItemsBasedOnRestaurant(Id));
    axios
      .delete(apiConstants.CRUD_OFFLINE + "/deleteMenuItem", {
        params: {
          Id: Id,
        },
      })
      .then((response) => {
        console.log("deletedItem", response.data);
      })
      .catch((e) => {
        console.log("error getting the values", e);
        toast.current.show({
            severity: 'error',
            summary: 'Something went wrong while deleting the menu item',
            detail: e.response.data.message,
          });
      });
  };

  const cancelChanges = () => {
    setEditButton(false);
}

  const handleChange = (e) => {

    e.preventDefault();
    const { name, value } = e.target;
    console.log('evalue', e, name, value);
    if (value === "Yes") {


        setAvailability(true);
    }
    if (value === "No") {

        setAvailability(false);
    }
}

  const saveChanges = () => {
    setEditButton(false);
    axios
      .put(apiConstants.CRUD_OFFLINE + "/updateMenuItemsPrice  ", {
        params: {
          Item_Price: priceValue,
          Id: Id,
        },
      })
      .then((response) => {
        console.log("updated menu", response.data);
      })
      .catch((e) => {
        console.log("error getting the values", e);
        toast.current.show({
            severity: 'error',
            summary: 'Something went wrong while updating menu item price',
            detail: e.response.data.message,
          });
      });
  };
  const saveAvailabilityChanges = () => {
    setEditButton(false);
    axios
      .put(apiConstants.CRUD_OFFLINE + "/updateMenuAvailability  ", {
        params: {
          Is_Available: availablity,
          Id: Id,
        },
      })
      .then((response) => {
        console.log("updated menu", response.data);
      })
      .catch((e) => {
        console.log("error getting the values", e);
        toast.current.show({
            severity: 'error',
            summary: 'Something went wrong while updating menu menuitem availability',
            detail: e.response.data.message,
          });
      });
  };


  return (
    <tr>
      <td className="text-center">{Item_Name}</td>
      <td className="text-center">{Item_Description}</td>

      {!isEditClicked && (
        <td className="text-center">
          {priceValue !== 0 ? priceValue : Item_Price}
        </td>
      )}

      {isEditClicked && (
        <td className="text-center">
          <input
            type="number"
            placeholder="price"
            onChange={(e) => setPriceValue(e.target.value)}
          />

          <button type="submit" className="save_button" onClick={saveChanges}>
            Save
          </button>
          <button
            type="submit"
            style={{ marginLeft: "10px" }}
            className="addTOCart__btn"
            onClick={() => {
              setPriceValue(0);
              setEditButton(false);
            }}
          >
            Cancel
          </button>
        </td>
      )}


{(Is_Available && !isEditClicked) && (
                <td className="text-center">
                    {(availablity === true) ? 'Yes' : 'No'}
                </td>)
            }
            {(!Is_Available && !isEditClicked) && (
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
                    

                    <button type="submit" className="addTOCart__btn" style={{ marginTop: '10px' }} onClick={saveAvailabilityChanges} >
                        Save
                    </button>
                    <button type="submit" className="addTOCart__btn" style={{ marginTop: '10px', marginLeft:'10px' }} onClick={cancelChanges} >
                        Cancel
                    </button>
                </td>
            )}



      <td className="text-center">
        {/* <div type="submit" className="addTOCart__btn" onClick={acceptOrder} disabled={isAcceptOrder} >
{isAcceptOrder? 'Accepted Order' : 'Accept Order'}
   </div> */}
        {/* <div type="submit" className="addTOCart__btn" onClick={denyOrder(Id)} >
   Deny Order
   </div> */}
        {/* 
   <td className="text-center cart__item-del">
        <i class="ri-delete-bin-line" onClick={(Id) => {
           dispatch(deleteOrderItems(Id))
        }} ></i>
      </td> */}

        <button
          type="submit"
          className="addTOCart__btn"
          onClick={() => {
            setEditButton(true);
          }}
        >
          Edit
        </button>

        <button type="submit" className="save_button" onClick={deleteItem}>
          Delete Item
        </button>
      </td>
      <Toast ref={toast}></Toast>
    </tr>
  );
};

export default ShowMenuList;
