// // src/routes/AppRoutes.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home/Home";
// import RoomList from "../pages/Rooms/RoomList";
// import RoomDetail from "../pages/Rooms/RoomDetail";
// import BookingForm from "../pages/Booking/Booking";
// import Login from "../pages/Auth/Login";
// import Register from "../pages/Auth/Register";
// import Profile from "../pages/UserProfile/Profile";

// function AppRoutes() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/rooms" element={<RoomList />} />
//         <Route path="/rooms/:id" element={<RoomDetail />} />
//         <Route path="/booking/:id" element={<BookingForm />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default AppRoutes;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import RoomList from "../pages/Rooms/RoomList";
import RoomDetail from "../pages/Rooms/RoomDetail";
import BookingForm from "../pages/Booking/Booking";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/UserProfile/Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<RoomList />} />
      <Route path="/rooms/:id" element={<RoomDetail />} />
      <Route path="/booking/:id" element={<BookingForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRoutes;
