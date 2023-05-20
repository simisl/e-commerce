import React from 'react'
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const GuardRoute = ({Component, authProps}) => {
  const location = useLocation();
  console.log("LLL",location)
  return (
      authProps.authenticated
        ? <Component />
        : <Navigate
            to="/login"
            state={{from: location}}
          />
  
  )
}

export default GuardRoute