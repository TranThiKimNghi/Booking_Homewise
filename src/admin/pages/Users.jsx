// src/admin/pages/Users.jsx
import React, { useEffect, useState } from "react";
import userService from "../../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError("Không tải được danh sách người dùng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    // Bạn có thể mở modal hoặc redirect sang trang chỉnh sửa
    alert(`Sửa người dùng: ${user.fullName || user.username || user.name}`);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      await userService.delete(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      alert("Xóa người dùng thất bại.");
    }
  };

  const getDisplayName = (user) =>
    user.fullName || user.username || user.name || "Không rõ tên";

  const getAvatarChar = (user) => getDisplayName(user).charAt(0).toUpperCase();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Manage Users</h2>
        </div>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Đang tải danh sách người dùng...</p>
        </div>
      )}

      {!loading && error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && users.length === 0 && <p className="text-muted">Hiện chưa có người dùng nào.</p>}

      {!loading && !error && users.length > 0 && (
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="rounded-circle d-flex justify-content-center align-items-center"
                            style={{ width: "36px", height: "36px", backgroundColor: "#e9f2ff", fontWeight: "600", fontSize: "0.9rem" }}
                          >
                            {getAvatarChar(user)}
                          </div>
                          <div className="fw-semibold">{getDisplayName(user)}</div>
                        </div>
                      </td>
                      <td>{user.email || "—"}</td>
                      <td>{user.phone || user.phoneNumber || "—"}</td>
                      <td className="text-capitalize">{user.role || "user"}</td>
                      <td>
                        <span className="badge bg-success-subtle text-success border border-success-subtle">
                          Active
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditUser(user)}>
                          Sửa
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.id)}>
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1); }
          .border-success-subtle { border-color: rgba(25, 135, 84, 0.2); }
        `}
      </style>
    </div>
  );
}

export default Users;
