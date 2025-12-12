import React from "react";
import { Routes, Route } from "react-router-dom";

// User Pages
import Home from "../pages/Home/Home";
import RoomList from "../pages/Rooms/RoomList";
import BookingForm from "../pages/Booking/BookingForm";
import Profile from "../pages/UserProfile/Profile";
import HotelList from "../pages/Hotels/HotelList";

// Auth (Customer)
import Login from "../pages/Auth/customer/Login";
import Register from "../pages/Auth/customer/Register";

// Admin
import AdminLogin from "../pages/Auth/admin/AdminLogin"; 
import AdminRoutes from "./AdminRoutes";
import AdminGuard from "../pages/Auth/admin/AdminGuard";
import AdminLayout from "../admin/layout/AdminLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* --- USER ROUTES --- */}
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<RoomList />} />
      <Route path="/booking" element={<BookingForm />} />
      <Route path="/booking/:id" element={<BookingForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/hotels" element={<HotelList />} />

      {/* --- AUTH (USER) --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* --- AUTH (ADMIN) --- */}
      <Route path="/admin/login" element={<AdminLogin />} />
      

      {/* --- ADMIN SECURED ROUTES --- */}
      <Route
        path="/admin/*"
        element={
          <AdminGuard>
            <AdminLayout>
              <AdminRoutes />
            </AdminLayout>
          </AdminGuard>
        }
      />

      {/* --- 404 NOT FOUND --- */}
      <Route
        path="*"
        element={<h2 className="text-center mt-5">Page Not Found</h2>}
      />
    </Routes>
  );
}

export default AppRoutes;
