import React, { useState, useRef } from "react";
import store from "../store/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import ApiConstants from "../constants/apiConstants";
import "../styles/loader.css";

const UserDetails = () => {


  const toast = useRef(null);
  const apiConstants = new ApiConstants();
  const [isEditClicked, setEditButton] = useState(false);
  const name = store.getState().auth.name;
  const userId = store.getState().auth.userId;
  const email = store.getState().auth.email;
  const walletAmount = store.getState().wallet.walletAmount;
  const [walletValue, setWalletValue] = useState(0);


  const saveChanges = () => {
    setEditButton(false);
    axios
    .put(apiConstants.CRUD_OFFLINE + "/updateWallet", {
      params: {
        remainingAmount: walletValue,
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
    <Helmet title="Cart">
      <CommonSection title="Agent Details" />
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>SNO</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>WalletAmount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td className="text-center">{name}</td>
                      <td className="text-center">{email}</td>
                      {/* <td className="text-center">{walletAmount}</td> */}

                      {!isEditClicked && (
                        <td className="text-center">
                          {walletValue !== 0 ? walletValue : walletAmount}
                        </td>
                      )}

                      {isEditClicked && (
                        <td className="text-center">
                          <input
                            type="number"
                            placeholder="price"
                            onChange={(e) => setWalletValue(e.target.value)}
                          />

                          <button
                            type="submit"
                            className="save_button"
                            onClick={saveChanges}
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            style={{ marginLeft: "10px" }}
                            className="addTOCart__btn"
                            onClick={() => {
                              setWalletValue(0);
                              setEditButton(false);
                            }}
                          >
                            Cancel
                          </button>
                        </td>
                      )}

                      <td className="text-center">
                        <button
                          type="submit"
                          className="addTOCart__btn"
                          onClick={() => {
                            setEditButton(true);
                          }}
                        >
                          Edit Wallet Amount
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Container>
        </section>
      <Toast ref={toast}></Toast>
    </Helmet>
  );
};
export default UserDetails;
