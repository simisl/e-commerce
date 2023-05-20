import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_Url } from "../config/config";
import Swal from "sweetalert2";

const Profile = () => {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  const submitHandle = (event) => {
    setLoading(true);
    event.preventDefault();

    console.log("fir", firstname);
    if (
      firstname == "" ||
      lastname == "" ||
      email === "" ||
      password == "" ||
      newpassword == ""
    ) {
      Swal.fire("Fields should not be empty");
      return;
    }

    let updatedUser = {
      email: email,
      password: password,
      firstName: firstname,
      lastName: lastname,
      id: user.id,
    };

    axios.put(`${Base_Url}/edit`, updatedUser, HEADER).then((result) => {
     
      if (result) {
        setLoading(false);
        Swal.fire({
          title: result.data.message,
          icon: "success",
        }).then(() => {
          setEdit(false);
        });
      } else {
        setLoading(false);
      }
    }).catch((err)=>{
      console.log(err)
      setLoading(false);
    });
  };

  const passwordCheck = (e) => {
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
    if (e.target.name == "confirmpassword") {
      setNewPassword(e.target.value);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    setFirstname(userData.firstName);
    setLastname(userData.lastName);
    setEmail(userData.email);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center spinner">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        ""
      )}
      <div className="container mt-5 mb-5">
        <h3 className="mb-5">My Profile </h3>
        {user ? (
          <div className="row">
            <form onSubmit={submitHandle}>
              <div className="col-12">
                <h6>First Name:</h6>
                {edit ? (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                ) : (
                  <p>{firstname}</p>
                )}
              </div>
              <div className="col-12">
                <h6>Last Name:</h6>
                {edit ? (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                ) : (
                  <p>{lastname}</p>
                )}
              </div>
              <div className="col-12">
                <h6>Email:</h6>
                {edit ? (
                  <input
                    type="email"
                    className="form-control mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <p>{email}</p>
                )}
              </div>
              {edit ? (
                <div className="col-12">
                  <h6>New Password</h6>

                  <input
                    type="text"
                    className="form-control mb-3"
                    value={password}
                    onChange={(e) => passwordCheck(e)}
                    name="password"
                  />
                </div>
              ) : (
                ""
              )}

              {edit ? (
                <div className="col-12">
                  <h6>Confirm Password</h6>
                  <input
                    type="password"
                    className="form-control"
                    value={newpassword}
                    onChange={(e) => passwordCheck(e)}
                    name="confirmpassword"
                  />
                  {newpassword != password ? (
                    <span className="text-danger ">
                      *Passwords do not match
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
              {!edit ? (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => setEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                ""
              )}
              {edit ? (
                <button
                  type="submit"
                  className="btn btn-warning mt-4"
                  disabled={password != newpassword}
                >
                  Save Changes
                </button>
              ) : (
                ""
              )}
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Profile;
