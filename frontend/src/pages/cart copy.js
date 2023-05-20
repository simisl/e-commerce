import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Base_Url } from "../config/config";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const initialCount = 1;
  const shippingCharge = 5;

 
  const dispatch = useDispatch();

  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState();
  const [total, setTotal] = useState();
  const [count = initialCount, setCount] = useState();
  const location = useLocation();
  // const id = location.state.id;

  const cartItems = useSelector(state => state.cartReducer);
  
  console.log('cart first',cartItems,product)

  const [loading, setLoading] = useState(false);

  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  useEffect(() => {
    setLoading(true);
    
      setProduct(cartItems.cart);
      console.log('cartttttt',cartItems,product)
    
    if (count > 1) {
        // let pPrice = product.productPrice
        // let newPrice = pPrice * count
        // setPrice(newPrice);
        // let newTotal = newPrice + shippingCharge
        // setTotal(newTotal)
        // dispatch({type: "Cart_Update", payload: product});
        // console.log("cart",cartItems)
    }
    if(count==1) {
        // axios
        // .get(`${Base_Url}/product/` + id, HEADER)
        // .then((result) => {
        //   setProduct(result.data);
        //   setPrice(result.data.productPrice)
        //   setTotal(shippingCharge + result.data.productPrice)
        //   let cartProduct = {
        //     name: result.data.productName,
        //     description: result.data.description,
        //     category: result.data.category,
        //     pic: result.data.productPic,
        //     price: result.data.productPrice,
        //     quantity: count,
        //     id: result.data._id,
        //     selected: false
        //   }
        //   console.log("cartpp",cartItems)
        //     // dispatch({type: "Cart_Empty"});
        //    //dispatch({type: "Cart_Update", payload: cartProduct});
        //   console.log('VVVVVV')
        //   setLoading(false);
        // })
        // .catch((err) => {
        //   setLoading(false);
        // });
    }
  }, [count]);

  const increaseCount = (item) => {
    let pdt = [...product]
    let index = pdt.findIndex(data=>data.id === item.id);
    // setCount(count + 1);
    item.quantity += item.quantity
    // item.price = item.price*count
    console.log('increas')
    setProduct([...product])
    // setTotal(price+shippingCharge);
  };

  const deleteItem = () => {
    setCount(0);
    setProduct();
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <div className="main container mt-3 pb-3">

      {
      product.map((item,index)=>{ return (
         <div className="row gy-2" key={index}>
          <div className="col-12 col-md-6 border border-1 border-secondary pb-3">
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
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <button className="btn btn-warning" onClick={deleteItem}>
                    <FontAwesomeIcon
                      className="trash"
                      icon={faTrashCan}
                      
                    />
                  </button>
                </div>
             
              <div className="col-8 col-md-12 col-lg-5   ">
                <div className="d-flex">
                  <button
                    className="btn btn-warning "
                    onClick={decreaseCount}
                    //disabled={!product}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    className="form-control  me-1 ms-1"
                    // disabled={!product}
                   
                  />
                  <button
                    className="btn btn-warning "
                    onClick={(item)=>{increaseCount(item)}}
                    //disabled={!product}
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card">
              <h3 className="card-header text-center">Summary</h3>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="m-1">Cost</p>
                 
                    <p className="m-1">${price}</p>
                  
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
                  <button
                    href="#"
                    className="btn btn-warning"
                    disabled={!product}
                  >
                    Checkout
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )
                })
              }

        {!product.length ?
        <p className="text-center mt-5 text-danger">Your cart is empty!. Please go back and add products to your cart</p> :""}
      </div> 
    </div>
  );
};

export default Cart;
