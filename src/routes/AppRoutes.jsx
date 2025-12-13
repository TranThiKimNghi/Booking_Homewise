import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

/* ================= USER PAGES ================= */
import Home from "../pages/Home/Home";
import RoomList from "../pages/Rooms/RoomList";
import BookingForm from "../pages/Booking/BookingForm";
import Profile from "../pages/UserProfile/Profile";
import HotelList from "../pages/Hotels/HotelList";

/* ================= AUTH ================= */
import Login from "../pages/Auth/customer/CustomerHome";
import Register from "../pages/Auth/customer/Register";
import AdminLogin from "../pages/Auth/admin/AdminLogin";

/* ================= ADMIN ================= */
import AdminRoutes from "./AdminRoutes";
import AdminLayout from "../admin/layout/AdminLayout";

/* ================= COMMON ================= */
import Forbidden from "../pages/Error/Forbidden";

function AppRoutes() {
  return (
    <Routes>
      {/* ===== PUBLIC ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<HotelList />} />
      <Route path="/rooms" element={<RoomList />} />

      {/* ===== AUTH ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ===== CUSTOMER PROTECTED ===== */}
      <Route
        path="/booking"
        element={
          <ProtectedRoute role="customer">
            <BookingForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute role="customer">
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ===== ADMIN PROTECTED ===== */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminRoutes />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* ===== ERROR ===== */}
      <Route path="/403" element={<Forbidden />} />

      <Route
        path="*"
        element={<h2 className="text-center mt-5">404 - Page Not Found</h2>}
      />
    </Routes>
  );
}

export default AppRoutes;
