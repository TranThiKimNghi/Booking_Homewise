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
      {/* /admin => Dashboard */}
       <Route index element={<Dashboard />} />
    <Route path="users" element={<Users />} />
    <Route path="rooms" element={<Rooms />} />
    <Route path="hotels" element={<Hotels />} />
    <Route path="bookings" element={<Bookings />} />

      {/* fallback */}
      <Route
        path="*"
        element={<h2 className="text-center mt-5">Page Not Found</h2>}
      />
    </Routes>
  );
}
