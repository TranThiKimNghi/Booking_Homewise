import React from "react";
import { Routes, Route } from "react-router-dom";

// User Pages
import Home from "../pages/Home/Home";
import RoomList from "../pages/Rooms/RoomList";
import BookingForm from "../pages/Booking/BookingForm";
import Login from "../pages/Auth/customer/Login";
import Register from "../pages/Auth/customer/Register";
import Profile from "../pages/UserProfile/Profile";
import HotelList from "../pages/Hotels/HotelList";

// Admin
import AdminRoutes from "./AdminRoutes";
import AdminLogin from "../pages/Auth/admin/AdminLogin";   
function AppRoutes() {
  return (
    <Routes>

      {/* User Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<RoomList />} />
      <Route path="/booking" element={<BookingForm />} />
      <Route path="/booking/:id" element={<BookingForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/hotels" element={<HotelList />} />

      {/* Admin Login Page */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Secured Pages */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* 404 */}
      <Route path="*" element={<h2 className="text-center mt-5">Page Not Found</h2>} />
    </Routes>
  );
}

export default AppRoutes;
