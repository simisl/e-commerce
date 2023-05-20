import React, { useEffect, useRef, useState } from "react";
import logo from "../img/l.png";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListSearch from "../components/ListSearch";
import axios from "axios";
import { Base_Url } from "../config/config";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [count, setCount] = useState();
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState(false);

  const user = useSelector((state) => state.userReducer);
  const cartItems = useSelector((state) => state.cartReducer);

  console.log("UUU", user);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "Login_Fail" });
    console.log("user0ut", user);

    // navigate("/login");
  };
  const login = () => {
    navigate("/login");
  };

  const formSubmitted = (event) => {
    console.log("FORM SUBMIT", list);
    event.preventDefault();

    navigate("/search", { state: { search: searchText } });
  };

  const changeSearch = (event) => {
    if (!list) {
      setList(true);
    }
    setSearchText(event.target.value);
  };

  useEffect(() => {
    console.log("CARRRT", cartItems.cart);
    setCount(cartItems.cart.length);
  }, [cartItems]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" id="header">
        <div className="container-fluid">
          <NavLink
            className="navbar-brand text-white ps-3"
            href="index.html"
            style={{ width: "30%" }}
          >
            <img src={logo} className="logo" />
          </NavLink>
          <button
            className="navbar-toggler bg-warning"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#toggleContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="toggleContent">
            <div className="row m-0 w-100 gy-2 ">
              <div className="col-md-10  p-0 border-0 position-relative">
                <form
                  className="form-control w-75 p-0 border-0 rounded-0 "
                  role="search"
                  onSubmit={formSubmitted}
                >
                  <div className="d-flex">
                    <input
                      className="form-control border-0"
                      type="search"
                      placeholder="Product name, Category name etc."
                      aria-label="Search"
                      value={searchText}
                      list="data"
                      onChange={(e) => changeSearch(e)}
                    />
                    <button
                      className="btn btn-warning bSearch border-0 rounded-0 "
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                  {list ? (
                    <ListSearch
                      searchText={searchText}
                      setSearchText={setSearchText}
                      setList={setList}
                    />
                  ) : (
                    ""
                  )}
                </form>
              </div>
              <div className="col-md-2  col-1 p-0">
                <ul className="nav ">
                  <li className="nav-item">
                    {!Object.keys(user.user).length == 0 ? (
                      <button
                        className="btn btn-warning nav-link p-1 rounded-1 me-2 border border-warning  lgBtn text-black"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning nav-link p-1 me-2 rounded-1 border border-warning  lgBtn text-black"
                        onClick={login}
                      >
                        Login
                      </button>
                    )}
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link cartIcon p-1" to="/cart">
                      <FontAwesomeIcon
                        className="cart text-warning"
                        icon={faCartShopping}
                      />
                      {count ? (
                        <p className="text-white  cart-item">{count}</p>
                      ) : (
                        ""
                      )}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <button
        className="btn sidebar-btn d-lg-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasResponsive"
        aria-controls="offcanvasResponsive"
      >
        Menu
      </button>
      <div
        className="offcanvas-lg offcanvas-end"
        tabIndex="-1"
        id="offcanvasResponsive"
        aria-labelledby="offcanvasResponsiveLabel"
        data-bs-scroll="true" 
        data-bs-backdrop="false" 
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasResponsive"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav mb-2 mb-lg-0 justify-content-center bg-light">
            <li className="nav-item me-5">
              <NavLink to="/" className="nav-link text-black">
                Home
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink to="/" className="nav-link text-black">
                Admin
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink className="nav-link text-black" to="/addproduct">
                Add Products
              </NavLink>
            </li>
            <li className="nav-item dropdown me-5">
              <NavLink
                className="nav-link dropdown-toggle text-black"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Women
              </NavLink>
              <ul
                className="dropdown-menu bg-light"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/allproducts"
                    state="women"
                  >
                    All Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/category"
                    state={{ name: "women", cat: "Shirt" }}
                  >
                    Shirts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/category"
                    state={{ name: "women", cat: "Pant" }}
                  >
                    Pants
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown me-5">
              <NavLink
                className="nav-link dropdown-toggle text-black"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Men
              </NavLink>
              <ul
                className="dropdown-menu bg-light"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/allproducts"
                    state="men"
                  >
                    All Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/category"
                    state={{ name: "men", cat: "Shirt" }}
                  >
                    Shirts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/category"
                    state={{ name: "men", cat: "Pant" }}
                  >
                    Pants
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item me-5">
              <NavLink
                className="nav-link text-black"
                to="/allproducts"
                state="kids"
              >
                Kids
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link text-black">
                Contact
              </NavLink>
            </li>
            <li className="nav-item dropdown me-5">
              <NavLink
                className="nav-link dropdown-toggle text-black"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User
              </NavLink>
              <ul
                className="dropdown-menu bg-light"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <NavLink className="dropdown-item" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/order_history">
                    Order History
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
