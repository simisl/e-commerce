import React, { useEffect, useState, useRef } from "react";
import "./ListSearch.css";
import axios from "axios";
import { Base_Url } from "../config/config";

const ListSearch = ({searchText, setSearchText, setList}) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchList, setSearchList] = useState([]);

  const refOne = useRef(null)

  const handleClickOutside = (e) =>{
    if(refOne.current !==null ){
      if(!refOne.current.contains(e.target) ){
        console.log(e.target)
        setList(false)
      }

    }
    
   
  }

  useEffect(() => {
    // setLoading(true);
    console.log("PPPPPP", searchText, productList.length,productList);
    document.addEventListener("click", handleClickOutside, true)
    if (!productList.length) {
      loadProducts();
      
    }
    setSearchList(
      productList.filter((item) =>
        item.productName.match(new RegExp(searchText, "i")) 
      )
    );
  }, [searchText]);

  const loadProducts = () => {
    axios
      .get(`${Base_Url}/allProducts`)
      .then((result) => {
        console.log("res loading", result);
        setLoading(false);
        setProductList(result.data);
        setSearchList(
          result.data.filter((item) =>
            item.productName.match(new RegExp(searchText, "i")) 
          )
        );
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const loadSearch = (item) =>{
    console.log("load search");
    setSearchText(item.productName);
    setList(false);
   
  }

  return (
    <div className="list-search position-absolute w-75 bg-white z-1" ref={refOne}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center spinner">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        ""
      )}

      {searchList.length ? (
        <ul className="list-ul">
          {searchList.map((item, index) => {
            return (
              <li key={index} value={item.productName}  onClick={()=>loadSearch(item)}>
                {item.productName} 
              </li>
              
            );
          })}
        </ul>
      ) : 
      <ul className="list-ul">
        <li >----  No products found  ----</li>
        </ul>
      }
       
    </div>
   
  );
};

export default ListSearch;
