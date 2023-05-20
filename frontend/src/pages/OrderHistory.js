import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Base_Url } from "../config/config";

const OrderHistory = () => {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const orderData = useSelector((state) => state.orderReducer);
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  useEffect(() => {
    // setOrder(orderData.order);
    getOrders();
  }, []);

  const getOrders = ()=>{
    axios
    .get(`${Base_Url}/allOrders`, HEADER)
    .then((result) => {
      console.log(result.data);
      setOrder(result.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("loading", err.response.data);
      setLoading(false);
      // Swal.fire(err.response.data.error);
    });
  }

  const productDetails = (item)=>{
    axios
    .get(`${Base_Url}/order/${item._id}`, HEADER)
    .then((result) => {
      console.log(result.data);
      setProduct(result.data.product);
      setAddress(result.data.address);
      setLoading(false);
    })
    .catch((err) => {
      console.log("loading", err.response.data);
      setLoading(false);
      // Swal.fire(err.response.data.error);
    });
  }

  return (
    <div>
      <div className="container mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">DATE</th>
              <th scope="col">TOTAL</th>
              <th scope="col">PAID</th>
              <th scope="col">DELIVERED</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {order.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.date}</td>
                  <td>{item.total}</td>
                  <td>{item.paid}</td>
                  <td>{item.delivered}</td>
                  <td>
                    <button className="btn btn-warning" onClick={()=>productDetails(item)} data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop">Details</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Order Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <table className="table">
  <thead>
    <tr>
    <th scope="col">#</th>
      <th scope="col">Product Name</th>
      <th scope="col">Category</th>
      <th scope="col">Image</th>
      <th scope="col">Unit Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total Price</th>
      <th scope="col">Description</th>
      <th scope="col">Address</th>
    </tr>
  </thead>
  <tbody>
  {product.map((item, index) => {
          return (
      <tr  key={index}>
      <th scope="row">{index+1}</th>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>
        <img src={item.pic} style={{width:50, height:50}}></img>
        </td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <td>{item.totalPrice}</td>
      <td>{item.description}</td>
      <td>
        <div>{address.name},</div>
        <div>{address.add}</div>
      </td>
    </tr>
          )
    })
  }
    
   
    
  </tbody>
</table>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default OrderHistory;
