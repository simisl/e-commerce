import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Cart = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState([]);

  const cartData = useSelector((state) => state.cartReducer);

  console.log("cart in cart", cartData, product);

  useEffect(() => {
    // setLoading(true);
    setProduct(cartData.cart);
  }, [cartData]);

  const increaseCount = (item) => {
    let pdt = [...product];
    let index = pdt.findIndex((data) => data.id === item.id);
    item.quantity += 1;
    if(item.quantity > pdt[index].itemQuantity){
      Swal.fire("Sorry we cannot increase the Quantity further. It exceeds the stock quantity")

    }
    else{
      item.totalPrice = item.price * item.quantity;
      pdt[index] = item;
      cartData.totalPrice = cartData.totalPrice + item.price;
      setProduct([...product]);
    }
    
    // dispatch({type: "Cart_Update", payload: item});
  };

  const deleteItem = (item) => {
    dispatch({ type: "Cart_Remove", payload: item });
  };

  const decreaseCount = (item) => {
    if (item.quantity > 1) {
      console.log("decres");
      let pdt = [...product];
      let index = pdt.findIndex((data) => data.id === item.id);
      item.quantity = item.quantity - 1;
      item.totalPrice = item.price * item.quantity;
      pdt[index] = item;
      cartData.totalPrice = cartData.totalPrice - item.price;
      setProduct([...product]);
    }
  };

  return (
    <div>
      <div className="main container mt-3 pb-3 ">
        <div className="row gy-2 w-50">
          {product.map((item, index) => {
            return (
              <div
                className="col-12 col-md-12 border border-1 border-secondary pb-3"
                key={index}
              >
                <div className="row  text-center mb-2 ">
                  <div className="col-12 p-0 ">
                    <h3 className="light p-2 m-0">Items in cart</h3>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-12 col-md-12 col-lg-4  text-center">
                    <img src={item.pic} height="170" width="150" />
                  </div>

                  <div className="col-12 col-md-12 col-lg-3  text-center">
                    <p>Cat: {item.category}</p>
                    <p>Price : ${item.price}</p>
                    <p>Total: ${item.totalPrice}</p>
                    {
                      item.itemQuantity - item.quantity <= 3 && item.itemQuantity - item.quantity !=0 ?
                      <p className="text-danger">*Only {item.itemQuantity - item.quantity} items left in the stock</p>:""
                    }
                    
                    <button
                      className="btn btn-warning"
                      onClick={() => deleteItem(item)}
                    >
                      <FontAwesomeIcon className="trash" icon={faTrashCan} />
                    </button>
                  </div>

                  <div className="col-8 col-md-12 col-lg-5   ">
                    <div className="d-flex">
                      <button
                        className="btn btn-warning "
                        onClick={() => {
                          decreaseCount(item);
                        }}
                        //disabled={!product}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        className="form-control  me-1 ms-1"
                        // disabled={!product}
                        readOnly
                      />
                      <button
                        className="btn btn-warning "
                        onClick={() => {
                          increaseCount(item);
                        }}
                        //disabled={!product}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {product.length ? (
          <div className="row gy-2 w-50">
            <div className="col-12 col-md-12">
              <div className="card">
                <h3 className="card-header text-center">Summary</h3>
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
                  {/* <div className="d-flex justify-content-between fw-bold">
                  <p className="m-1">Total</p>
                  {product ? <p className="m-1">${total}</p> : ""}
                </div> */}
                  <div className="text-center">
                    <NavLink
                      to="/checkout"
                      className="btn btn-warning"
                      disabled={!product}
                    >
                      Checkout
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {!product.length ? (
          <p className="text-center mt-5 text-danger">
            Your cart is empty!. Please go back and add products to your cart
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cart;
