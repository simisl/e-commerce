import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./styles.css";
import { Base_Url } from "../config/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const returnUrl = location.state?.from || "/"
  // console.log("authreturn",location)
  const submitForm = (event) => {
    // console.log("submitt")
    event.preventDefault();
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`${Base_Url}/login`, data)
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data.userInfo);
          setLoading(false);
          localStorage.setItem("token", JSON.stringify(result.data.token));
          localStorage.setItem("user", JSON.stringify(result.data.userInfo));
          dispatch({ type: "Login_Success", payload: result.data.userInfo });
          console.log('return', returnUrl)
          navigate(returnUrl);
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: err.response.data.error,
        });
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="row w-100  d-flex justify-content-center">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center spinner">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        ""
      )}

      <div className="col-12 col-md-8 col-lg-7 border border-1 border-secondary pb-3">
        <h2 className="text-center">Login</h2>

        <form
          className="form-control border-0border p-3 shadow-sm"
          onSubmit={(event) => submitForm(event)}
        >
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              value={email}
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              value={password}
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
