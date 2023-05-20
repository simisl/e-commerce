import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addr, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const navigate = useNavigate();

  const formSubmitted = (event) => {
    event.preventDefault();
    let ADDR = {
      firstName: firstName,
      lastName: lastName,
      address: addr,
      city: city,
      state: state,
      zip: zip,
    };
    localStorage.setItem("Address", JSON.stringify(ADDR));
    // navigate("/payment", {state:{data:ADDR}});
    navigate("/payment");
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <form
        className="row w-50 g-3 border border-3 p-3"
        onSubmit={formSubmitted}
      >
        <h3>Shipping Address</h3>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputname"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="1234 Main St"
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputState" className="form-label">
            State
          </label>
          <select
            defaultValue={"DEFAULT"}
            className="form-select"
            id="validationCustom04"
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option disabled value="DEFAULT">
              Choose...
            </option>
            <option>Assam</option>
            <option>Bihar</option>
            <option>Goa</option>
            <option>Gujarat</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input
            type="text"
            className="form-control"
            id="inputZip"
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          {/* <Link to="/payment" type="submit" > */}
          <button type="submit" className="btn btn-warning">
            Continue Checkout
          </button>
          {/* </Link> */}
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
