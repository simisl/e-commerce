import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../config/config";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  useEffect(() => {
    console.log("l", location.state);
    setLoading(true);
    axios
      .get(`${Base_Url}/gender/` + `${location.state}`, HEADER)
      .then((result) => {
        console.log(result.data);
        setProductList(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("loading", err.response.data);
        setLoading(false);
        // Swal.fire(err.response.data.error);
      });
  }, [location]);

  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center spinner">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        ""
      )}
        {
        productList.length ?
      <div className=" row  g-4">
        {productList.map((item, index) => {
          return (
            <div className="col-lg-4 col-md-4" key={index}>
              <div className="card h-100">
                <img
                  src={item.productPic}
                  className="card-img-top h-75"
                  alt="image"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.productName}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
                <Link
                  to="/product_details"
                  state={{ id: item._id }}
                  className="btn btn-warning m-3"
                >
                  View Product
                </Link>
              </div>
            </div>
          );
        })}
        
      
      </div>
:
<p className="text-center mt-5 text-danger">Sorry, there are no products to display!</p>
}
    </div>
  );
};

export default AllProducts;
