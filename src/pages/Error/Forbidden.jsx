import React from "react";
import { Link } from "react-router-dom";

function Forbidden() {
  return (
    <div className="text-center py-5">
      <h1 className="text-danger">403</h1>
      <h3>Forbidden</h3>
      <p>Bạn không có quyền truy cập trang này</p>

      <Link to="/" className="btn btn-primary mt-3">
        Về trang chủ
      </Link>
    </div>
  );
}

export default Forbidden;
