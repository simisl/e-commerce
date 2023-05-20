import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Base_Url } from "../config/config";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("DEFAUL");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [gender, setGender] = useState("DEFAULT");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  const formSubmitted = (event) => {
    console.log('nnn',name)
    event.preventDefault();
    if (
      name == "" ||
      category == "" ||
      price === "" ||
      picture == "" ||
      gender == "" ||
      description == ""
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
      .post(`${Base_Url}/addProduct`, product, HEADER)
      .then((result) => {
        setLoading(false);
        if (result.status === 200) {
          Swal.fire({
            title:result.data.message,
          icon: "success"
        }).then(()=>{
          console.log("sub");
            setName("")
            setCategory("DEFAUL")
            setDescription("")
            setGender("DEFAULT")
            setPrice("") 
            setPicture("")
            setQuantity("")
          })
          
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center spinner">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        ""
      )}
      <form
        className="row w-50 g-3 border border-3 p-3"
        onSubmit={formSubmitted}
      >
        <h3>New Product</h3>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="validationCustom04" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="validationCustom04"
            value={category}
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
            value={price}
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
            value={quantity}
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
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            required
          />
         
            <div className="border border-1 mt-1" style={{ width: 150, height: 200 }}>
            {picture!=""?
          <img
            src={picture}
            className="img-thumbnail"
            style={{ width: 150, height: 200 }}
          />:<p className="text-center">Image Preview</p>
        }
          </div>
         
          
        </div>
        <div className="col-12">
          <label htmlFor="inputState" className="form-label">
            Gender
          </label>
          <select
            className="form-select"
            id="validationCustom04"
            value={gender}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          {/* <Link to="/payment" type="submit" > */}
          <button type="submit" className="btn btn-warning">
            Save Product
          </button>
          {/* </Link> */}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
