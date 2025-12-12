import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../admin/pages/Dashboard";
import Rooms from "../admin/pages/Rooms";
import Bookings from "../admin/pages/Bookings";
import Users from "../admin/pages/Users";
import Hotels from "../admin/pages/Hotels";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/users" element={<Users />} />
      <Route path="/hotels" element={<Hotels />} />

      <Route
        path="*"
        element={<h2 className="text-center mt-5">Page Not Found</h2>}
      />
    </Routes>
  );
}
