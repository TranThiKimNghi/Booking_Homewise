import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooter from "../components/AdminFooter";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: 250, minHeight: "100vh" }}>
        <h3>Admin Panel</h3>
        <ul className="list-unstyled mt-3">
          <li><a href="/admin" className="text-white">Dashboard</a></li>
          <li><a href="/admin/rooms" className="text-white">Rooms</a></li>
          <li><a href="/admin/bookings" className="text-white">Bookings</a></li>
          <li><a href="/admin/users" className="text-white">Users</a></li>
          <li><a href="/admin/hotels" className="text-white">Hotels</a></li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-fill p-4 bg-light">
        <div className="bg-white rounded shadow p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
