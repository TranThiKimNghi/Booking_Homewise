import React from "react";
import { Routes, Route } from "react-router-dom";

// import AdminLayout from "../admin/layout/AdminLayout";
// import AdminGuard from "../pages/Auth/admin/AdminGuard";
import Dashboard from "../admin/pages/Dashboard";
import Rooms from "../admin/pages/Rooms";
import Bookings from "../admin/pages/Bookings";
import Users from "../admin/pages/Users";
import Hotels from "../admin/pages/Hotels";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminGuard>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </AdminGuard>
        }
      />

      <Route
        path="/rooms"
        element={
          <AdminGuard>
            <AdminLayout>
              <Rooms />
            </AdminLayout>
          </AdminGuard>
        }
      />

      <Route
        path="/bookings"
        element={
          <AdminGuard>
            <AdminLayout>
              <Bookings />
            </AdminLayout>
          </AdminGuard>
        }
      />

      <Route
        path="/users"
        element={
          <AdminGuard>
            <AdminLayout>
              <Users />
            </AdminLayout>
          </AdminGuard>
        }
      />

      <Route
        path="/hotels"
        element={
          <AdminGuard>
            <AdminLayout>
              <Hotels />
            </AdminLayout>
          </AdminGuard>
        }
      />

      <Route
        path="*"
        element={
          <AdminGuard>
            <AdminLayout>
              <h2 className="text-center mt-5">Page Not Found</h2>
            </AdminLayout>
          </AdminGuard>
        }
      />
    </Routes>
  );
}
