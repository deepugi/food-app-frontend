import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";

import products from "../assets/fake-data/products";
import MenuCard from "../components/UI/product-card/menu-product-card";
import ReactPaginate from "react-paginate";

import "../styles/all-foods.css";
import "../styles/pagination.css";
import axios from "axios";
import { useEffect } from "react";
import { getJWT } from "../service/authService";
import store from "../store/store";

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);


  // const [allItems, setMenuItems] = useState();


  const allItems = store.getState().cart.menuList;
  console.log('allItems', allItems);

  const searchedProduct = products.filter((item) => {
    if (searchTerm.value === "") {
      return item;
    }
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });



  // useEffect(() => {

  //   axios.get('http://localhost:8080/allmenuItems', { headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
  //     console.log('response', response.data);
  //     setMenuItems(response.data);
  //   }).catch((e) => {
  //     console.log('error getting the values', e);
  //   });

  // }, []);

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />

      <section>
        <Container>
          <Row>
            {/* <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="sorting__widget text-end">
                <select className="w-50">
                  <option>Default</option>
                  <option value="ascending">Alphabetically, A-Z</option>
                  <option value="descending">Alphabetically, Z-A</option>
                  <option value="high-price">High Price</option>
                  <option value="low-price">Low Price</option>
                </select>
              </div>
            </Col> */}

            {allItems.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <MenuCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName=" paginationBttns "
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;




// import React, { useEffect } from "react";

// import "../styles/product-card.css";

// import { Link } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { cartActions } from "../store/shopping-cart/cartSlice";
// import axios from 'axios'

// const ProductCard = (props) => {
//   const { id, title, image01, price } = props.item;
//   const dispatch = useDispatch();

//   const [allItems, setMenuItems] = useState();

  // useEffect(() => {

  //   axios.get('http://localhost:8080/allmenuItems', { headers: { "Authorization": `Bearer ${getJWT()}` } }).then((response) => {
  //     console.log('response', response.data);
  //     setMenuItems(response.data);
  //   }).catch((e) => {
  //     console.log('error getting the values', e);
  //   });

  // })

//   // const addToCart = () => {
//   //   dispatch(
//   //     cartActions.addItem({
//   //       id,
//   //       title,
//   //       image01,
//   //       price,
//   //     })
//   //   );
//   // };

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





