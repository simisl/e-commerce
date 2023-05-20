import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { NavLink } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { Base_Url } from "../config/config";

const amount = "2";
const currency = "USD";
const style = { layout: "vertical" };
const Receipt = () => {
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [cancel, setCancel] = useState(false);
  const [product, setProduct] = useState([]);
  const [cost, setCost] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const orderData = useSelector((state) => state.orderReducer);
  const cartData = useSelector((state) => state.cartReducer);
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  useEffect(() => {
    const address = JSON.parse(localStorage.getItem("Address"));
    setName(address.firstName + " " + address.lastName);
    setAddr(
      address.address +
        ", " +
        address.city +
        ", " +
        address.state +
        ", " +
        address.zip
    );
    setProduct(cartData.cart);
    console.log(cartData.cart)
  }, []);

  const onCancel = (data) => {
    console.log("The payment was cancelled!", data);
    setCancel(true);
    orderSetUp(data);
  };

  const onSuccess = (data) => {
    setCancel(false);
    orderSetUp(data);
    let product = {
      productName: product.name,
      gender: product.gender,
      productPrice: product.productPrice,
      productPic: product.productPic,
      category: product.category,
      description: product.description,
      quantity: product.itemQuantity - product.quantity
    };
    axios
    .put(`${Base_Url}/editProduct/${data.productId}`, product, HEADER)
    .then((result) => {
      setLoading(false);
      if (result.status === 200) {
        console.log('Product updated with new quantity')
        
      }
    })
    .catch((err) => {
      setLoading(false);
     console.log('error in updating product')
    });
    

  };

  const orderSetUp = (data) =>{
    let newOrder = {
      id: data.orderID,
      date: Date.now(),
      total: cartData.totalPrice,
      paid: "NO",
      delivered: "NO",
      product: product,
      address: {
        name: name,
        add: addr,
      },
    };

    dispatch({ type: "Order_Update", payload: newOrder });
    dispatch({ type: "Cart_Clear" });

    axios
    .post(`${Base_Url}/saveOrder`, newOrder, HEADER)
    .then((result) => {
      console.log(result.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("loading", err.response.data);
      setLoading(false);
      // Swal.fire(err.response.data.error);
    });
  }

  return (
    <div>
      <div className="ms-4 d-inline-flex container-fluid mt-5 mb-5">
        <div className="row  w-50 mb-2 me-1">
          <div className="row  mb-2 border border-1">
            <div className="col-12 p-0 ">
              <h3 className=" p-2 m-0">Shipping</h3>
              <div className=" ps-2">
                <h5 className="d-inline">Name: </h5>
                <p className="d-inline">{name}</p>
              </div>
              <div className=" ps-2">
                <h5 className="d-inline">Address: </h5>
                <p className="d-inline">{addr}</p>
              </div>
              {cancel ? (
                <div className="alert alert-danger mt-3" role="alert">
                  Not delivered
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="row  mb-2 border border-1">
            <div className="col-12 p-0 ">
              <h3 className="light p-2 m-0">Payment</h3>
              <h5 className=" ps-2">Paypal</h5>
              {cancel ? (
                <div className="alert alert-danger mt-3" role="alert">
                  Not paid
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="row  mb-2 border border-1">
            <div className="col-12 p-0 ">
              <h3 className="light p-2 m-0">Items</h3>
            </div>

            {product.map((item, index) => {
              return (
                <div
                  className="row justify-content-center gy-1 border-bottom"
                  key={index}
                >
                  <div className="col-12 col-md-12 col-lg-4 pb-1 ">
                    <img src={item.pic} height="170" width="150" />
                  </div>
                  <div className="col-12 col-md-12 col-lg-4 ">
                    <p>Category: {item.category}</p>

                    <p>Quantity: {item.quantity}</p>
                    <p>Price : ${item.price}</p>
                  </div>
                  <div className="col-8 col-md-12 col-lg-4  ">
                    <div className="d-flex">
                      <p>Total: ${item.totalPrice}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {product.length ? (
          <div className="row  gy-2 w-50 ">
            <div className="col-12 col-md-12">
              <div className="card">
                <h3 className="card-header text-center">Order Summary</h3>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="m-1">Cost</p>

                    <p className="m-1">${cartData.totalPrice}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="m-1">Shipping</p>
                    <p className="m-1">$5</p>
                  </div>
                  <hr className="m-1" />
                  <div className="d-flex justify-content-between fw-bold">
                    <p className="m-1">Total</p>
                    <p className="m-1">${cartData.totalPrice + 5}</p>
                  </div>
                  <div className="text-center">
                    <PayPalScriptProvider options={{ "client-id": "test" }}>
                      <PayPalButtons
                        style={style}
                        disabled={false}
                        forceReRender={[amount, currency, style]}
                        fundingSource={undefined}
                        onCancel={onCancel}
                        onSuccess={onSuccess}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: "2.00",
                                },
                              },
                            ],
                          });
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Receipt;
