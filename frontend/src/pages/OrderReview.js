import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import "./styles.css";
import { useDispatch, useSelector } from "react-redux";

const OrderReview = () => {
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const cartData = useSelector((state) => state.cartReducer);
  const [product, setProduct] = useState([]);
  const [cost, setCost] = useState();

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
  }, []);

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
            </div>
          </div>

          <div className="row  mb-2 border border-1">
            <div className="col-12 p-0 ">
              <h3 className="light p-2 m-0">Payment</h3>
              <h5 className=" ps-2">Paypal</h5>
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
                  <div className="col-12 col-md-12 col-lg-4  ">
                    <p>Cat: {item.category}</p>

                    <p>Quantity: {item.quantity}</p>
                    <p>Price : ${item.price}</p>
                  </div>
                  <div className="col-8 col-md-12 col-lg-4   ">
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
          <div className="row gy-2 w-50">
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
                    <NavLink to="/receipt" className="btn btn-warning">
                      Place Order
                    </NavLink>
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

export default OrderReview;
