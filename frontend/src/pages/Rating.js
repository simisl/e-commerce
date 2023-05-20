import React, { useEffect, useState } from "react";
import { Base_Url } from "../config/config";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

export const Rating = ({location, getProduct, pdtRating, pdtComment, reviewUser}) => {

    const [loading, setLoading] = useState(false);
    const [rating, setrating] = useState(pdtRating);
    const [comment, setComment] = useState(pdtComment);
    const [userReview, setUserReview] = useState(reviewUser);
    const user = useSelector((state) => state.userReducer);


    const HEADER = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      };

    const editReview = () => {
        console.log("iD", userReview, HEADER);
        if (rating == "default" || comment == "") {
          Swal.fire("Please fill all the fields");
          return;
        }
        let updatedReview = {
          rating: Number(rating),
          comment: comment,
          date: moment(new Date()).format("YYYY-MM-DD"),
        };
        axios
          .put(
            `${Base_Url}/editReview/` + location?.state?.id + "/" + userReview,
            updatedReview,
            HEADER
          )
          .then((result) => {
            console.log("res", result.data);
            setLoading(false);
            Swal.fire({
              title: result.data.message,
              icon: "success",
            }).then(() => {
              setrating("default");
              setComment("");
              setUserReview("");
              getProduct();
            });
          })
          .catch((err) => {
            console.log("loading", err.response.data);
            setLoading(false);
          });
      };
      const deleteReview = () => {
        console.log("iD", userReview);
        axios
          .delete(
            `${Base_Url}/deleteReview/` + location?.state?.id + "/" + userReview,
            HEADER
          )
          .then((result) => {
            console.log("res", result.data);
            setLoading(false);
            Swal.fire({
              title: result.data.message,
              icon: "success",
            }).then(() => {
              setrating("default");
              setComment("");
              setUserReview("");
              getProduct();
            });
          })
          .catch((err) => {
            console.log("loading", err.response.data);
            setLoading(false);
          });
      };
    

    const submitted = (event) => {
        event.preventDefault();
        if (!Object.keys(user.user).length) {
          Swal.fire({
            title: "Please login to leave a review",
            icon: "warning",
          });
    
          return;
        }
        if (rating == "default" || comment == "") {
          Swal.fire("Please fill all the fields");
          return;
        }
        let review = {
          rating: Number(rating),
          comment: comment,
          date: moment(new Date()).format("YYYY-MM-DD"),
        };
        axios
          .put(`${Base_Url}/productReview/` + location?.state?.id, review, HEADER)
          .then((result) => {
            console.log("res", result.data);
            setLoading(false);
            Swal.fire({
              title: result.data.message,
              icon: "success",
            }).then(() => {
              setrating("default");
              setComment("");
              getProduct();
            });
          })
          .catch((err) => {
            console.log("loading", err.response.data);
            setLoading(false);
          });
      };

      useEffect(() => {
        setLoading(true);
    
        // getProduct();
        setrating(pdtRating);
        setComment(pdtComment);
        setUserReview(reviewUser);
        console.log('ratinggggg',location, 'rrrr',pdtRating,'cccc',pdtComment)
      }, [location?.state, user.user, pdtRating, pdtComment, reviewUser]);

      

  return (
    <div>
        <form className="row g-3" onSubmit={submitted}>
          <div className="col-12">
            <select
              className="form-select"
              value={rating}
              onChange={(e) => setrating(e.target.value)}
            >
              <option value="default">choose...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Unsatisfactory</option>
              <option value="3">3 - Satisfactory</option>
              <option value="4">4 - Very Satisfactory</option>
              <option value="5">5 - Outstanding</option>
            </select>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                value={comment}
                style={{ height: 100 }}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <label htmlFor="floatingTextarea2">Comments</label>
            </div>
          </div>
          {userReview === "" ? (
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-warning"
                disabled={!rating && !comment}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="col-12">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => editReview()}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-warning ms-2"
                onClick={() => deleteReview()}
              >
                Delete
              </button>
            </div>
          )}
        </form>
    </div>
  )
}
