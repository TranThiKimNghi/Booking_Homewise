import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

/* ================= USER PAGES ================= */
import Home from "../pages/Home/Home";
import Rooms from "../pages/Rooms/Room";
import BookingForm from "../pages/Booking/BookingForm";
import BookingDetail from "../pages/Booking/Booking_detail";
import Profile from "../pages/UserProfile/Profile";
import HotelList from "../pages/Hotels/HotelList";
import BookingList from "../pages/Booking/BookingList";
import BookingSchedule from "../pages/Schedule/BookingSchedule";

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
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/rooms-hotel" element={<Rooms />} />
      <Route path="/bookings/me" element={<BookingList />} />

      {/* ===== CUSTOMER PROTECTED ===== */}
      <Route
        path="/booking-detail"
        element={
          <ProtectedRoute role="customer">
            <BookingDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute role="customer">
            <BookingSchedule />
          </ProtectedRoute>
        }
      />
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

      {/* ===== AUTH ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<AdminLogin />} />

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
