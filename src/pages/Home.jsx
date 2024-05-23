import React, { useState, useEffect, useRef } from "react";

import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import heroImg from "../assets/images/hero.png";
import "../styles/hero-section.css";
import "../styles/loader.css";

import { Link } from "react-router-dom";

import Category from "../components/UI/category/Category.jsx";

import "../styles/home.css";

import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";

import products from "../assets/fake-data/products.js";

import foodCategoryImg01 from "../assets/images/hamburger.png";
import foodCategoryImg02 from "../assets/images/pizza.png";
import foodCategoryImg03 from "../assets/images/bread.png";

import ProductCard from "../components/UI/product-card/ProductCard.jsx";

import whyImg from "../assets/images/location.png";

import networkImg from "../assets/images/network.png";

import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";

import store from "../store/store";
import { useNavigate } from "react-router";
import { getJWT } from "../service/authService";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWalletAmount } from "../store/shopping-cart/walletStore";
import { reqAccessToken } from "../auth/refreshToken";
import { setOrderHistoryItems } from "../store/shopping-cart/orderHistoryStore.js";
import { setMenuListFromOrder } from "../store/shopping-cart/menuStore.js";
import { setOrderId } from "../store/shopping-cart/orderHistoryStore.js";
import ApiConstants from "../constants/apiConstants";
import ToastConstants from "../constants/toastConstants.js";
import { useLocation } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { setWelcomeToast } from '../store/authStore';


const featureData = [
  {
    title: "Quick Delivery",
    imgUrl: featureImg01,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },

  {
    title: "Super Dine In",
    imgUrl: featureImg02,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
  {
    title: "Easy Pick Up",
    imgUrl: featureImg03,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
];

const Home = () => {



  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  // const [allProducts, setAllProducts] = useState(undefined);
  const [allRestaurants, setRestaurants] = useState([]);

  const [hotPizza, setHotPizza] = useState([]);
  const navigate = useNavigate();
  const userId = store.getState().auth.userId;

  const apiConstants = new ApiConstants();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const toastConstants = new ToastConstants();
  const location = useLocation();
  const toast = useRef(null);
  const welcomeToast = useSelector((state) => state.auth.welcomeToast);

  useEffect(() => {
    const authenticated = store.getState().auth.authenticated;

    if (!authenticated) {
      navigate("/login");
    } else {
      // reqAccessToken();
      //  console.log('response', response);

      console.log("showlocation", location?.state);

      if (location?.state?.message?.title === toastConstants.SUCCESS_TITLE && welcomeToast === true) {
        toast.current.show({
          severity: toastConstants.SUCCESS_TITLE,
          summary: "Success",
          detail: location.state.message.detail,
          life: 3000,
        
        });
        dispatch(setWelcomeToast(false));
      }

      axios
        .get(apiConstants.SERVERLESS_OFFLINE + "/allProducts", {
          headers: { Authorization: `Bearer ${getJWT()}` },
        })
        .then((response) => {
          console.log("response", response.data);
          setRestaurants(response.data);


        })
        .catch((e) => {
          console.log("error getting the values", e);
          toast.current.show({
            severity: 'error',
            summary: 'Something went wrong while fetching the products',
            detail: e.response.data.message,
          });
        });

      // localStorage.removeItem("totalAmount");

      axios
        .get(apiConstants.SERVERLESS_OFFLINE + "/walletDetails", {
          params: {
            userId: userId,
          },
          headers: { Authorization: `Bearer ${getJWT()}` },
        })
        .then((response) => {
          console.log("response", response);

          dispatch(setWalletAmount(response?.data?.walletAmount));
        })
        .catch((e) => {
          console.log("error getting the values", e);
          toast.current.show({
            severity: 'error',
            summary: 'Something went wrong while fetching the wallet details',
            detail: e.response.data.message,
          });
        });

      axios
        .get(apiConstants.SERVERLESS_OFFLINE + "/orderItems", {
          headers: { Authorization: `Bearer ${getJWT()}` },
        })
        .then((response) => {
          console.log("response", response.data);
          dispatch(setOrderHistoryItems(response.data));

          let menuIds = [];
          let orderId = [];

          Object.keys(response.data).map((key, index) => {
            orderId.push(key);
            response.data[key].map((item, pos) => {
              if (!menuIds.includes(item.menuId)) {
                menuIds.push(item.menuId);
              }
            });
            //   e.preventDefault();
          });

          dispatch(setOrderId(orderId));

          axios
            .get(apiConstants.SERVERLESS_OFFLINE + "/getMenu", {
              params: {
                menuIds: menuIds,
              },
              headers: { Authorization: `Bearer ${getJWT()}` },
            })
            .then((response) => {
              console.log("menuItems", response.data);
              dispatch(setMenuListFromOrder(response.data));

              setLoader(false);
            })
            .catch((e) => {
              console.log("error getting the values", e);
              toast.current.show({
                severity: 'error',
                summary: 'Something went wrong while fetching the menu items',
                detail: e.response.data.message,
              });
            });
        })
        .catch((e) => {
          console.log("error getting the values", e);
          toast.current.show({
            severity: 'error',
            summary: 'Something went wrong while fetching the previous ordered items',
            detail: e.response.data.message,
          });
        });
    }
  }, []);

  useEffect(() => {
    if (category === "ALL" && searchTerm === "") {
      // return axios.get(apiConstants.COLLEGE, {
      //   params: {
      //     sortBy: 'updatedAt,DESC',
      //     pageNo: pageno,
      //   },
      // });
      setLoader(true);
      axios
        .get(apiConstants.SERVERLESS_OFFLINE + "/allProducts", {
          headers: { Authorization: `Bearer ${getJWT()}` },
        })
        .then((response) => {
          console.log("response", response.data);
          setRestaurants(response.data);
          setLoader(false);
        })
        .catch((e) => {
          console.log("error getting the values", e);
          toast.current.show({
            severity: 'error',
            summary: 'error filtering ',
            detail: e.response.data.message,
          });
        });
      // setAllProducts(products);
      // setRestaurants(allRestaurants);
    }

    if (category === "ALL" && searchTerm !== "") {
      // return axios.get(apiConstants.COLLEGE, {
      //   params: {
      //     sortBy: 'updatedAt,DESC',
      //     pageNo: pageno,
      //   },
      // });
      axios
        .get(apiConstants.SERVERLESS_OFFLINE + "/allProducts", {
          params: {
            searchType: searchTerm,
          },
          headers: { Authorization: `Bearer ${getJWT()}` },
        })
        .then((response) => {
          console.log("response", response.data);
          setRestaurants(response.data);
          setLoader(false);
        })
        .catch((e) => {
          console.log("error getting the values", e);
          toast.current.show({
            severity: 'error',
            summary: 'error filtering',
            detail: e.response.data.message,
          });
        });

      // setAllProducts(products);
      // setRestaurants(allRestaurants);
    }

    if (category !== "ALL" && searchTerm === "") {
      // const filteredProducts = allRestaurants.filter(
      //   (item) => item.City === "Bengaluru"
      // );

      // setAllProducts(filteredProducts);

      axios
        .get(apiConstants.SERVERLESS_OFFLINE + "/allProducts", {
          params: {
            city: category,
          },
          headers: { Authorization: `Bearer ${getJWT()}` },
        })
        .then((response) => {
          console.log("response", response.data);
          setRestaurants(response.data);
          setLoader(false);
        })
        .catch((e) => {
          console.log("error getting the values", e);
          toast.current.show({
            severity: 'error',
            summary: 'error filtering',
            detail: e.response.data.message,
          });
        });
      // setRestaurants(filteredProducts);
    }

    if (category !== "ALL" && searchTerm !== "") {
      // const filteredProducts = allRestaurants.filter(
      //   (item) => item.City === "Bengaluru"
      // );

      // setAllProducts(filteredProducts);
      axios
        .get(apiConstants.SERVERLESS_OFFLINE + "/allProducts", {
          params: {
            city: category,
            searchType: searchTerm,
          },
          headers: { Authorization: `Bearer ${getJWT()}` },
        })
        .then((response) => {
          console.log("response", response.data);
          setRestaurants(response.data);
          setLoader(false);
        })
        .catch((e) => {
          console.log("error getting the values", e);
          toast.current.show({
            severity: 'error',
            summary: 'error filtering',
            detail: e.response.data.message,
          });
        });
      // setRestaurants(filteredProducts);
    }

    // if (category === "Chennai") {
    //   const filteredProducts = products.filter(
    //     (item) => item.City === "Chennai (Madras)"
    //   );
    //   // setAllProducts(filteredProducts);
    //   setRestaurants(filteredProducts);
    // }

    //   if (category === "BREAD") {
    //     const filteredProducts = products.filter(
    //       (item) => item.category === "Bread"
    //     );

    //     setAllProducts(filteredProducts);
    //   }
  }, [category, searchTerm]);

  // useEffect(() => {

  //   if(searchTerm! )

  // }, [searchTerm]);
  // allRestaurants?.map((item) => {
  //   (
  //     console.log('item', item.Name))
  //   })
  // console.log('campusDrives'+ campusDrives);

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Restaurants</h2>
            </Col>

            <Col lg="12">
              <div className="food__category d-flex align-items-center justify-content-center gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Find a Restaurant...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                  <span>
                    <i class="ri-search-line" color="White"></i>
                  </span>
                </div>
                <button
                  className={`all__btn  ${category === "ALL" ? "foodBtnActive" : ""} `}
                  onClick={() => setCategory("ALL")}
                >
                  All
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${category === "Bengaluru" ? "foodBtnActive" : ""} `}
                  onClick={() => setCategory("Bengaluru")}
                >
                  {/* <img src={foodCategoryImg01} alt="" /> */}
                  Bengaluru
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${category === "Chennai" ? "foodBtnActive" : ""} `}
                  onClick={() => setCategory("Chennai")}
                >
                  {/* <img src={foodCategoryImg01} alt="" /> */}
                  Chennai
                </button>
              </div>
            </Col>

            {/* {allProducts?.map((item) => (
      <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
        <ProductCard item={item} />
      </Col>
    ))} */}

            {loader && (
              <div>
                <span className="loader">
                  <i className="pi pi-spin pi-spinner" />
                </span>
              </div>
            )}

            {!loader &&
              allRestaurants?.map((item) => (
                (!(item.Is_Closed) && 
                <Col lg="3" md="4" sm="6" xs="6" key={item.Id} className="mt-5">
                  <ProductCard item={item} />
                </Col>
                )
              ))}
          </Row>
        </Container>
      </section>
      <Toast ref={toast}></Toast>
    </Helmet>
  );
};

export default Home;
