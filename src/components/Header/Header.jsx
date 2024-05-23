import React, { useRef, useEffect } from "react";

import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from 'react-router';

import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import { authLogout } from '../../service/authService';

import "../../styles/header.css";
import store from "../../store/store";

const UserLinks = [
  {
    display: "Restaurants",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
  {
    display: "MyOrders",
    path: "/orderhistory",
  },
  {
    display: "currentOrder",
    path: "/currentOrder",
  },
  {
    display: "UserDetails",
    path: "/userDetails",
  },

];

const AgentLinks = [
  {
    display: "AgentDetails",
    path: "/AgentDetails",
  },
  {
    display: "TotalOrders",
    path: "/TotalOrders",
  },
];

const RestaurantLinks = [
  {
    display: "RestaurantDetails",
    path: "/RestaurantDetails",
  },
  {
    display: "MenuList",
    path: "/showMenuList",
  },
  {
    display: "RestaurantOrders",
    path: "/restaurantOrders",
  },
];
const AdminLinks = [
  {
    display: "Admin",
    path: "/Admin",
  },
  {
    display: "Restaurants",
    path: "/restaurants",
  },
  {
    display: "Agents",
    path: "/deliveryAgents",
  },
  {
    display: "Orders",
    path: "/orders",
  },
  {
    display: "Feedback",
    path: "/feedback",
  }
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const role = store.getState().auth.role;
  const navigate = useNavigate();
  let nav__links = [];

  if (role === "Admin") {
    nav__links = UserLinks;
  }
  if (role === "Agent") {
    nav__links = AgentLinks;
  }
  if (role === "RestaurantOwner") {
    nav__links = RestaurantLinks;
  }
  if (role === "user") {
    nav__links = AdminLinks;
  }

  const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");


  const doLogout = () => {
    localStorage.clear();
    // authLogout();
    navigate('/login'); 
    //  window.location.reload();
  }

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink", null);
      } else {
        headerRef.current.classList.remove("header__shrink", null);
      }
    });

    return () => window.removeEventListener("scroll", null);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h5>Tasty Treat</h5>
          </div>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            {role === "Admin" && (
              <span className="cart__icon" onClick={toggleCart}>
                <i class="ri-shopping-basket-line"></i>
                {/* <span className="cart__badge">{totalQuantity}</span>   */}
              </span>
            )}


            <span className="user">
              <Link to="/login">
                <i class="ri-user-line"></i>
              </Link>
            </span>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>

            {role !== "" && (
            <span className="logout" onClick={doLogout}>
              <i class="ri-logout-circle-line"></i>
            </span>)}

          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
