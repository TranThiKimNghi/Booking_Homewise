// src/admin/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import AdminFooter from "./components/AdminFooter";

import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Hotels from "./pages/Hotels";

function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <AdminHeader />
        <div className="p-4 flex-fill">{children}</div>
        <AdminFooter />
      </div>
    </div>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      {/* / → Dashboard */}
      <Route
        path="/"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />

      <Route
        path="/rooms"
        element={
          <AdminLayout>
            <Rooms />
          </AdminLayout>
        }
      />

      <Route
        path="/bookings"
        element={
          <AdminLayout>
            <Bookings />
          </AdminLayout>
        }
      />

      <Route
        path="/users"
        element={
          <AdminLayout>
            <Users />
          </AdminLayout>
        }
      />

       <Route
        path="/hotels"   // <- thêm route hotels
        element={
          <AdminLayout>
            <Hotels />
          </AdminLayout>
        }
      />

      {/* 404 cho admin */}
      <Route
        path="*"
        element={
          <AdminLayout>
            <h2 className="text-center mt-5">Page Not Found</h2>
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default AdminRoutes;
