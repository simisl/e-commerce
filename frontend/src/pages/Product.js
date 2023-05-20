import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Base_Url } from "../config/config";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as star } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";
import { useParams } from "react-router";
import { Rating } from "./Rating";

export const Product = () => {
  const [product, setProduct] = useState({});
  const [reviewData, setReview] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.log("PPPaaa", params);
  // const cartItems = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.userReducer);
  const userId = user.user.id || null;
  // console.log("userpppp",user)

  const [loading, setLoading] = useState(false);
  const [rating, setrating] = useState("default");
  const [comment, setComment] = useState("");
  const [userReview, setUserReview] = useState("");
  const [avg, setAvg] = useState(0);
  const [integer, setInteger] = useState(0);
  const [decimal, setDecimal] = useState(0);
 
  const location = useLocation();

  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  const addToCart = () => {
    let cartProduct = {
      name: product.productName,
      description: product.description,
      category: product.category,
      pic: product.productPic,
      price: product.productPrice,
      quantity: 1,
      id: product._id,
      totalPrice: product.productPrice,
      itemQuantity: product.quantity
    };
    if(product.quantity >0){
      dispatch({ type: "Cart_Update", payload: cartProduct });

      navigate("/cart");
    }
    else{
      Swal.fire("You cannot add an out of stock product to cart");
    }

    
  };

  useEffect(() => {
    setLoading(true);

    getProduct();
  }, [location?.state, user.user]);

  const getProduct = () => {
    console.log("called product", location, location.state);
    if (location?.state !== null) {
      axios
        .get(
          `${Base_Url}/product/` + location?.state?.id + "/" + userId,
          HEADER
        )
        .then((result) => {
          console.log("res", result.data.review, result.data);
          setLoading(false);
          setProduct(result.data);
          setReview(result.data.review);
          var avgRating;
          if(result.data.review.length){
            avgRating = result.data.review.reduce((total,item)=> total + item?.rating, 0) / result.data.review.length
            setAvg(avgRating);
            console.log("AVG", avgRating)
          }
          else{
            avgRating = 0
            setAvg(0);
          }


          
          
          const decimalPart = avgRating.toString().split('.')[1];
          setInteger(avgRating.toString().split('.')[0]);
          setDecimal(decimalPart);
          console.log("DECI", decimalPart, integer)
          const index = result.data.review.findIndex((item) =>item.reviewedBy._id === userId)
          console.log(index, userId)
          if(index>=0){
            setComment(result.data.review[index].comment);
              setrating(result.data.review[index].rating);
              setUserReview(result.data.review[index]._id);
          }
          else{
            setComment("");
            setrating("default");
            setUserReview("");
          }
       })
        .catch((err) => {
          // console.log('loading',err.response.data)
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center spinner">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        ""
      )}
      <div className="main container mt-3 pb-3">
        <div className="row gy-2">
          <div
            className="col-12 col-md-4 border-secondary pb-3"
            style={{ height: "75vh" }}
          >
            <img
              src={product.productPic}
              height="100%"
              width="100%"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-12 col-md-4">
            <div className="card">
              <h3 className="card-header text-center">{product.productName}</h3>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p >Reviews</p>{avg}
                  <div>
                  {[...Array(5)].map((_, i) => {
                          return (
                            
                              avg >= i+1 ?
                              <FontAwesomeIcon icon={faStar}  style={{ color: "#ffe11f" }} key={i}/>
                              :
                              i == integer && decimal ? <FontAwesomeIcon icon={faStarHalfStroke} style={{ color: "#ffe11f" }} key={i} /> :
                           
                            <FontAwesomeIcon icon={star} style={{ color: "#ffe11f" }} key={i}/>
                         
                          )
                        })}
                  </div>
                  
                </div>
                <hr className="m-1" />
                <div className="d-flex justify-content-between">
                  <p className="m-1">Price</p>
                  <p className="m-1">${product.productPrice}</p>
                </div>
                <hr className="m-1" />
                <div className="d-flex justify-content-between ">
                  <p className="m-1">Description: </p>
                  <p className="m-1">{product.description}</p>
                </div>
                {
                  product.quantity === 0 ?
                  <p className="text-danger" >*Out of stock</p>:""
                }
                
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card">
              <h3 className="card-header text-center">Summary</h3>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="m-1">Cost</p>
                  <p className="m-1">${product.productPrice}</p>
                </div>
                <hr className="m-1" />
                <div className="d-flex justify-content-between">
                  <p className="m-1">Shipping</p>
                  <p className="m-1">$5</p>
                </div>
                <hr className="m-1" />

                <div className="text-center">
                  <button className="btn btn-warning" onClick={addToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h2>Reviews</h2>
            {!reviewData?.length?
            <div className="alert alert-info">
              <p >There is no review</p>
            </div>:""
}
            <hr className="m-1" />
            <div>
              {reviewData
                .slice()
                .reverse()
                .map((item, index) => {
                  return (
                    <div className="row border-bottom" key={index}>
                      <div className="col-12 mt-2">
                        {item.reviewedBy.firstName}
                      </div>

                      <div>
                        {[...Array(item.rating)].map((_, i) => {
                          return (
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#ffe11f" }}
                              key={i}
                            />
                          );
                        })}
                      </div>
                      <div className="col-12">{item.date}</div>
                      <div className="col-12 mt-3 mb-1">{item.comment}</div>
                    </div>
                  );
                })}
            </div>
            {/* <hr className="m-1" /> */}
            <div className="row mt-4">
              <div className="col-12">
                <h2>Write a customer review</h2>
              </div>
            </div>
          </div>
        </div>
        <h3>Rating</h3>
        <Rating location={location} getProduct={getProduct} pdtRating = {rating} pdtComment = {comment} reviewUser = {userReview} />
        
      </div>
    </div>
  );
};
