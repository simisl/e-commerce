import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Contact } from "./pages/Contact";
import Footer from "./components/Footer";
import { Product } from "./pages/Product";
import Cart from "./pages/cart";
import CheckOut from "./pages/CheckOut";
import Payment from "./pages/Payment";
import OrderReview from "./pages/OrderReview";
import Receipt from "./pages/Receipt";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import AllProducts from "./pages/AllProducts";
import Category from "./pages/category";
import AddProduct from "./pages/AddProduct";
import GuardRoute from "./AuthGuard/GuardRoute";
import SearchProduct from "./pages/SearchProduct";
import Dashboard from "./pages/Dashboard";


function App() {
  function DynamivRoute() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      console.log("userrr", user, Object.keys(user.user).length);
      if (Object.keys(user.user).length) {
        console.log("userrr inside", user);
        setAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        //   localStorage.removeItem("user");
        console.log("userrr outside", user);
        setAuthenticated(false);
      }
    }, [user]);

    return (
      <Routes>
        <Route
          path="/profile"
          element={
            <GuardRoute Component={Profile} authProps={{ authenticated }} />
          }
        />
        <Route
          path="/addproduct"
          element={
            <GuardRoute Component={AddProduct} authProps={{ authenticated }} />
          }
        />
        <Route
          path="/order_history"
          element={
            <GuardRoute
              Component={OrderHistory}
              authProps={{ authenticated }}
            />
          }
        />
        <Route path="/receipt" element={<GuardRoute
              Component={Receipt}  authProps={{ authenticated }}/>} />
        <Route path="/checkout" element={<CheckOut />} />

        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product_details" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order_review" element={<OrderReview />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/category" element={<Category />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    );
  }

  return (
    <div className="app-bg">
      <Router>
        <Header />
        <DynamivRoute />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
