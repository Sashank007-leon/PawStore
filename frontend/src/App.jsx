import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import Dogs from "./pages/Dogs";
import Accessories from "./pages/Accessories";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import DogDetails from "./pages/DogDetails";
import AccessoryDetails from "./pages/AccessoryDetails";
import BlogDetails from "./pages/BlogDetails";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import MyOrders from "./pages/MyOrders";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/accessories/:id" element={<AccessoryDetails />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> 
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="my-orders" element={<MyOrders />} />
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        
      </Routes>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default App;
