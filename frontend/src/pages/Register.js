import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./styles.css";
import { Base_Url } from "../config/config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(email, firstname, lastname, password);
    const data = {
      email: email,
      firstName: firstname,
      lastName: lastname,
      password: password,
    };
    axios
      .post(`${Base_Url}/registration`, data)
      .then((result) => {
        // console.log("res", result);
        setLoading(false);
        Swal.fire(result.data.message);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire(err.response.data.error);
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center fw-bold">REGISTRATION FORM</h3>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center spinner">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        ""
      )}
      <form
        className="border p-3 shadow-sm"
        onSubmit={(event) => submitForm(event)}
      >
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
