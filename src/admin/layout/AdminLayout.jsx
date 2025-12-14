import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooter from "../components/AdminFooter";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Content */}
      <div className="flex-fill d-flex flex-column" style={{ minHeight: "100vh" }}>
        {/* Header */}
        <AdminHeader />

        {/* Main Content */}
        <div className="flex-fill p-4 bg-light">
          <div className="bg-white rounded shadow p-4">
            {children}
          </div>
        </div>

        {/* Footer */}
        <AdminFooter />

   

      </div>
    </div>
  );
}
