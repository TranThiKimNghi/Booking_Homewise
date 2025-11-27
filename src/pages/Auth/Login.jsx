import React, { useEffect } from "react";
import keycloak from "../../keycloak/Keycloak"; // import instance Keycloak

function Login() {
  useEffect(() => {
    // tự động redirect đến trang login của Keycloak
    keycloak.login();
  }, []);

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Redirecting to login...</h2>
      <p>Đang chuyển hướng sang Keycloak để đăng nhập.</p>
    </div>
  );
}

export default Login;
