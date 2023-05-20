import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Payment = () => {
  // const location = useLocation();
  // console.log("LLL", location.state.data)
  return (
    <div className="container  mt-5 mb-5 border border-1  p-4">
      <h2 className="mt-5 mb-5">Payment Method</h2>
      <div className="form-check ">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          readOnly
          checked
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Paypal
        </label>
      </div>
      <Link to="/order_review">
        <button className="btn btn-warning mt-5 mb-5">Continue</button>
      </Link>
    </div>
  );
};
export default Payment;
