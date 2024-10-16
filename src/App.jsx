import "./Styles/Global.css";
// React
import { useEffect } from "react";
// Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { fetchProducts } from "./features/products/productsSlice";
// Componetnts
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import Wish from "./Pages/Wish/Wish";
import CreateAcc from "./Pages/SignUp/CreateAcc";
import ManageAccount from "./Pages/SignUp/ManageAccount/ManageAccount";
import Login from "./Pages/SignUp/Login";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CheckOut from "./Pages/Cart/CheckOut/CheckOut";
import NotFound from "./Pages/Error/Error";
import AboutUs from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Footer from "./Components/Footer/Footer";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wish" element={<Wish />} />
        <Route path={`/login`} element={<Login />} />
        <Route path="/signUp" element={<CreateAcc />} />
        <Route path="/manageAccount" element={<ManageAccount />} />
        <Route path="/checkOut" element={<CheckOut />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
