import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import { getJWT } from "../service/authService";
import store from "../store/store";
import { setLeftAmount } from "../store/shopping-cart/walletStore";
import { useDispatch } from "react-redux";
import ApiConstants from "../constants/apiConstants";
import { setOrderDetails } from "../store/shopping-cart/orderStore";
import { Toast } from "primereact/toast";
import { setRestaurantCookingInstruction } from "../store/shopping-cart/restaurantStore";
import { setDeliveryInstruction } from "../store/shopping-cart/deliveryStore";
import { setLoading } from "../store/shopping-cart/loader";

import "../styles/checkout.css";

const Checkout = () => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentType, setPaymentType] = useState("Wallet");
  // const [walletAmount, setWalletAmount] = useState(600);
  const apiConstants = new ApiConstants();

  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;

  const totalAmount = cartTotalAmount + Number(shippingCost);

  const walletAmount = store.getState().wallet.walletAmount;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [disable, setdisable] = useState(false);
  const [ resInstr, setrestaurantInstruction ] = useState('');
  const [deliveryInstru, setdeliveryMessage] = useState('');
  const [isamountValid, setAmount] = useState(((walletAmount-totalAmount)>=0) ? true: false);

  const toast = useRef(null);




  dispatch(setLeftAmount(walletAmount - totalAmount));


  console.log("walletAmount", walletAmount);

  // if((walletAmount-totalAmount)>=0){
  //   setAmount(true);
  // }

  const email = store.getState().auth.email;

  const config = {
    Username: "vallambaimuni98@gmail.com",
    Password: "C2CDDFFAF7AFF23A64FF64A42CE24655413A",
    Host: "smtp.elasticemail.com",
    Port: 2525,
    To: "vallambaimunideepa98@gmail.com",
    From: "vallambaimuni98@gmail.com",
    Subject: "Order Confirmation Email",
  };

  // useEffect(( ) => {
  //   axios.get('http://localhost:8080/walletDetails', {   params: {
  //     userId: userId ,
  //   }, headers: {"Authorization" : `Bearer ${getJWT()}`} }).then((response) => {
  //     console.log('response', response);
  //     }).catch((e) => {
  //        console.log('error getting the values', e);
  //     });
  // } )

  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enterName,
      email: enterEmail,
      phone: enterNumber,
      country: enterCountry,
      city: enterCity,
      postalCode: postalCode,
    };

    shippingInfo.push(userShippingAddress);
    console.log(shippingInfo);
  };

  const onSave = () => {
    setdisable(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("evalue", e, name, value);
    setPaymentType(value);
  };
  const insertionToOrderTable = (e) => {
    //   orderStatus:{
    //     type: DataTypes.ENUM('Ordered', 'Agent Picked', 'shipping', 'delivered'),
    // },
    // orderedDate:{
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // },
    // userId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    // restaurantId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    // agentId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${day}-${month}`;
    console.log("currentDate", currentDate);
    const userId = store.getState().auth.userId;
    const restaurantId = store.getState().restaurant?.selectedRestaurantId;
    const wallet = store.getState().wallet?.leftAmount;
    const orderItem = store.getState().orderItems.orderItems;
    alert("order confirmed");

    axios
      .post(apiConstants.CRUD_OFFLINE + "/insertOrder", {
        params: {
          orderStatus: "Ordered",
          orderedDate: currentDate,
          userId: userId,
          restaurantId: restaurantId,
        },
      })
      .then((response) => {
        dispatch(setOrderDetails(response.data));
        localStorage.setItem("orderedDetails", JSON.stringify(response.data));

        config[
          "Body"
        ] = ` your order is confirmed with OrderId: ${response.data.Id}....  :)`;

        if (window.Email) {
          window.Email.send(config).then(() => {
            dispatch(setLoading(false));
            alert("order confirmation email sent successfully");
            
            // toast.current.show({
            //   severity: 'success',
            //   summary: 'Success ordering',
            //   detail: 'Order Placed and email sent',
            //   life: 3000,
            // });
          });
        }

        // const payment = paymentType;
        // const paymentStatus = 'Paid';
        // const jsonResponse = JSON.stringify(response);
        const orderId = response.data.Id;


        axios
        .post(apiConstants.CRUD_OFFLINE + "/addDeliveryInstructions", {
          params: {
            OrderId: orderId,
            AgentId: null,
            Instruction: deliveryInstru,
          },
        })
        .then((response) => {
          console.log("response", response.data);
        })
        .catch((e) => {
          console.log("error getting the values", e);
          toast.current.show({
            severity: "error",
            summary:
              "Something went wrong while inserting the deliveryinstructions ",
            detail: e.response.data.message,
          });
        });


        axios
        .post(apiConstants.CRUD_OFFLINE + "/addRestaurantCookingInstructions", {
          params: {
            OrderId: orderId,
            RestaurantId: restaurantId,
            Instruction: resInstr,
          },
        })
        .then((response) => {
          console.log("response", response.data);
        })
        .catch((e) => {
          console.log("error getting the values", e);
          toast.current.show({
            severity: "error",
            summary:
              "Something went wrong while inserting the restaurant cooking details",
            detail: e.response.data.message,
          });
        });





        axios
          .post(apiConstants.CRUD_OFFLINE + "/insertPayment", {
            params: {
              payment: paymentType,
              paymentStatus: "Paid",
              orderId: orderId,
            },
          })
          .then((response) => {
            console.log("response", response.data);
          })
          .catch((e) => {
            console.log("error getting the values", e);
            toast.current.show({
              severity: "error",
              summary:
                "Something went wrong while inserting the payment details",
              detail: e.response.data.message,
            });
          });

        //  http://localhost:3001/dev/insertPayment -- post

        orderItem.map((item) => {
          const quantity = item.quantity;
          const price = item.price;
          const menuId = item.id;

          console.log(" values...", quantity, price, menuId);

          axios
            .post(apiConstants.CRUD_OFFLINE + "/insertOrderItems", {
              params: {
                quantity: quantity,
                price: price,
                menuId: menuId,
                orderId: orderId,
              },
            })
            .then((response) => {
              console.log("response", response.data);
            })
            .catch((e) => {
              console.log("error getting the values", e);
              toast.current.show({
                severity: "error",
                summary:
                  "Something went wrong while inserting the order details",
                detail: e.response.data.message,
              });
            });
        });

        console.log("response", response.data);
      })
      .catch((e) => {
        toast.current.show({
          severity: "error",
          summary: "Something went wrong while inserting the order details",
          detail: e.response.data.message,
        });
        console.log("error getting the values", e);
      });

    axios
      .put(apiConstants.CRUD_OFFLINE + "/updateWallet", {
        params: {
          remainingAmount: wallet,
          userId: userId,
        },
      })
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((e) => {
        console.log("error getting the values", e);
        toast.current.show({
          severity: "error",
          summary: "Something went wrong while updating the wallet orders",
          detail: e.response.data.message,
        });
      });
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Select Payment Type</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="radio"
                    value="WALLET"
                    name="wallet"
                    checked={true}
                    onChange={handleChange}
                  />{" "}
                  WALLET
                  {/* <input type="radio" value="UPI" name="upi" onChange={handleChange}/> UPI */}
                </div>

                <div className="form__group">
                  Total amount in Wallet : ${walletAmount}
                </div>

                <h6 className="mb-4">Add Instructions</h6>

                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter cooking instructions"
                    required
                    disabled={disable}
                    onChange={(e) => {
                      dispatch(setRestaurantCookingInstruction(e.target.value));
                      setrestaurantInstruction(e.target.value);
                    }}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter delivery instructions"
                    required
                    disabled={disable}
                    onChange={(e) => {
                      dispatch(setDeliveryInstruction(e.target.value));
                      // setDeliveryInstruction(e.target.value);
                      setdeliveryMessage(e.target.value);
                      
                    }}
                  />
                </div>

                {!disable && (
                  <button
                    type="submit"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                    className="addTOCart__btn"
                    onClick={onSave}
                  >
                    Save
                  </button>
                )}
                {disable && (
                  <button
                    type="submit"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                    className="addTOCart__btn"
                    onClick={()=> {
                      setdisable(false);
                    }}
                  >
                    Edit
                  </button>
                )}

                {/* <div className="input-container">
                  <label>Enter cooking instructions:  </label>
                  <textarea
                    value="hbhj"
                    // onChange={}
                  />
                </div> */}

                {/* <div className="input-container">
                  <label>Enter delivery instructions: </label>
                  <textarea
                    value="jbjkbk"
                    // onChange={this.handleChange}
                  />
                </div> */}

              {isamountValid ? (
                <div>
                  <button
                    type="submit"
                    className="addTOCart__btn"
                    onClick={insertionToOrderTable}
                    style={{ marginTop: "20px" }}
                  >
                    <Link to="/placeorder">Place Order and Pay</Link>
                  </button>
                </div>):(
                  <h6> Please Update Wallet Amount --- Total Amount is greater than Wallet Amount</h6>
                )}
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Shipping: <span>${shippingCost}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Toast ref={toast}></Toast>
    </Helmet>
  );
};

export default Checkout;
