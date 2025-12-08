import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooter from "../components/AdminFooter";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <AdminHeader />
        <div className="p-4 flex-fill">{children}</div>
        <AdminFooter />
      </div>
    </div>
  );
}
