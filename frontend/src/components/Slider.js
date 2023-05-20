import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_Url } from "../config/config";

const Slider = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    setLoading(true);
    loadProducts();
  }, []);

  const loadProducts = () => {
    axios
      .get(`${Base_Url}/allProducts`)
      .then((result) => {
        console.log("res", result);
        setLoading(false);
        setProductList(result.data);
        
      })
      .catch((err) => {
        // console.log("loading", err.response.data);
        setLoading(false);
        //Swal.fire(err.response.data.error);
      });
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
      <div
        id="carouselExampleInterval"
        className="carousel slide bg-light "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner p-5 ">
          <h2 className="text-center pb-4 pt-3">Featured Products</h2>

          <div className="carousel-item active " data-bs-interval="5000">
            <div className="row  gy-2  ">
              {productList.slice(0,4).map((item, index) => {
                return (
                  <div className="  col-12 col-md-6 col-lg-3" key={index}>
                    {item.category == "Shirt" ? (
                      <div className="card h-100">
                        <img
                          src={item.productPic}
                          height="235"
                          alt="White Shirt"
                          className="img-responsive"
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title">{item.productName}</h5>
                          <p className="mb-0 fw-bold">${item.productPrice}</p>
                          <p className="card-text">{item.description}</p>
                          <NavLink
                            // to={`/product_details/${item._id}`}
                            to="/product_details"
                            state={{ id: item._id }}
                            className="btn btn-warning"
                          >
                            <i className="fa-solid fa-cart-shopping me-2"></i>
                            Add to cart
                          </NavLink>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="carousel-item " data-bs-interval="5000">
            <div className="row  gy-2  ">
              {productList.slice(4,8).map((item, index) => {
                return (
                  <div className="  col-12 col-md-6 col-lg-3" key={index}>
                    {item.category == "Pant" ? (
                      <div className="card h-100">
                        <img
                          src={item.productPic}
                          height="235"
                          alt="White Shirt"
                          className="img-responsive"
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title">{item.productName}</h5>
                          <p className="mb-0 fw-bold">${item.productPrice}</p>
                          <p className="card-text">{item.description}</p>
                          <NavLink
                            to="/product_details"
                            state={{ id: item._id }}
                          
                            className="btn btn-warning"
                          >
                            <i className="fa-solid fa-cart-shopping me-2"></i>
                            Add to cart
                          </NavLink>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev "
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon  bg-dark "
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next "
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bg-dark"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
