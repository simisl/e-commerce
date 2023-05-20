import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid  mt-2 p-3 bg-dark text-white">
      <div className="row ">
        <div className="col-md-3 text-center ">
          <h3>Women</h3>
          <ul className="nav flex-column ">
            <li className="nav-item ">
              <a className="nav-link text-white">Dresses</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white">Pants</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white">Skirts</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 text-center">
          <h3>Men</h3>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-white">Shirts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white">Pants</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white">Hoodies</a>
            </li>
          </ul>
        </div>
        <div className="col-md-3 text-center">
          <h3>Kids</h3>
        </div>
        <div className="col-md-3 text-center">
          <h3>Links</h3>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-white" href="index.html">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="login.html">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="contact.html">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="me-5 ms-5" />
      <p className="text-center text-white">Copyright@MyTrends 2022-23</p>
    </div>
  );
};

export default Footer;
