import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Base_Url } from "../config/config";
import axios from "axios";
import './Dashboard.css';
import { NavLink } from "react-router-dom";

export const Dashboard = () => {
  const [name, setName] = useState("");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("DEFAUL");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [picture, setPicture] = useState("");
  const [gender, setGender] = useState("DEFAULT");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  useEffect(() => {
    setLoading(true);
    loadProducts();
  }, []);

  const loadProducts = () => {
    axios
      .get(`${Base_Url}/allProducts`, HEADER)
      .then((result) => {
        console.log("res", result);

        setProductList(result.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log("loading", err.response.data);
        setLoading(false);
        //Swal.fire(err.response.data.error);
      });
  };
  const formSubmitted = (event) => {
    console.log("nnn", name);
    event.preventDefault();
    if (
      name === "" ||
      category === "" ||
      price === "" ||
      picture === "" ||
      gender === "" ||
      description === ""
    ) {
      Swal.fire("Fields should not be empty");
      return;
    }

    setLoading(true);
    let product = {
      productName: name,
      gender: gender,
      productPrice: price,
      productPic: picture,
      category: category,
      description: description,
      quantity: quantity
    };
    axios
      .put(`${Base_Url}/editProduct/${productId}`, product, HEADER)
      .then((result) => {
        setLoading(false);
        if (result.status === 200) {
          Swal.fire({
            title: result.data.message,
            icon: "success",
          }).then(() => {
            console.log("sub");
            loadProducts();
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Failed to update",
        });
      });
  };

  const editProduct = (item) => {
    console.log(item);
    setName(item.productName);
    setCategory(item.category);
    setDescription(item.description);
    setGender(item.gender);
    setPicture(item.productPic);
    setPrice(item.productPrice);
    setProductId(item._id)
    setQuantity(item.quantity)
  };

  return (
    <div
      className="container-fluid pl-2"
      style={{ height: "100vh", overflow: "scroll" }}
    >
      <div className="row ">
        <div
          className="col-3 bg-dark text-white "
          style={{ height: "100vh", overflow: "scroll" }}
        >
        <hr className="m-0"></hr>
        <ul className="menu mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link ">
                Home
              </NavLink>
            </li>
            
            <li className="nav-item ">
              <NavLink className="nav-link " to="/addproduct">
                Add Products
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link ">
                Contact
              </NavLink>
            </li>
           
          </ul>
        </div>
        <div className="col-9" style={{ height: "100vh", overflow: "scroll" }}>
          <div className="container d-flex justify-content-center mt-5 mb-5">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center spinner">
                <div className="spinner-border" role="status"></div>
              </div>
            ) : (
              ""
            )}
            {productList.length ? (
              <div className=" row  g-4">
                {productList.map((item, index) => {
                  return (
                    <div className="col-lg-4 col-md-4" key={index}>
                      <div className="card h-100">
                        <img
                          src={item.productPic}
                          className="card-img-top h-75"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.productName}</h5>
                          <p className="card-text">{item.description}</p>
                        </div>
                        <button
                          className="btn btn-warning m-3"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => editProduct(item)}
                        >
                          Edit Product
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center mt-5 text-danger">
                Sorry, there are no products to display!
              </p>
            )}

            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Edit Product
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form
                      className="row w-50 g-3 border border-3 p-3"
                      onSubmit={formSubmitted}
                    >
                      <div className="col-12">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={name || ""}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="validationCustom04"
                          className="form-label"
                        >
                          Category
                        </label>
                        <select
                          className="form-select"
                          id="validationCustom04"
                          value={category || ""}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        >
                          <option disabled value="DEFAUL">
                            Choose...
                          </option>
                          <option>Shirt</option>
                          <option>Pant</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputAddress"
                          value={price || 0}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="inputquantity" className="form-label">
                          Quantity
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputquantity"
                          value={quantity || 0}
                          onChange={(e) => setQuantity(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="inputCity" className="form-label">
                          Picture URL
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputCity"
                          value={picture || ""}
                          onChange={(e) => setPicture(e.target.value)}
                          required
                        />

                        <div
                          className="border border-1 mt-1"
                          style={{ width: 150, height: 200 }}
                        >
                          {picture !== "" ? (
                            <img
                              src={picture || ""}
                              className="img-thumbnail"
                              style={{ width: 150, height: 200 }}
                            />
                          ) : (
                            <p className="text-center">Image Preview</p>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="inputState" className="form-label">
                          Gender
                        </label>
                        <select
                          className="form-select"
                          id="validationCustom04"
                          value={gender || ""}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        >
                          <option disabled value="DEFAULT">
                            Choose...
                          </option>
                          <option>men</option>
                          <option>women</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label htmlFor="inputZip" className="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputZip"
                          value={description || ""}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-warning" data-bs-dismiss="modal">
                      Edit Product
                      
                    </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
