import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Auth/Login";
import BooksList from "./Components/Cart/BooksList";
import Signup from "./Components/Auth/Signup";
import Cart from "./Components/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import About from "./Components/Page/About";
import Privacy from "./Components/Page/Privacy";
import Replacement from "./Components/Page/Replacement";
import Contactus from "./Components/Page/Contactus";

const AppLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login","/signup"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details" element={<BooksList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/replacement" element={<Replacement />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>
      {!hideNavbarRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
