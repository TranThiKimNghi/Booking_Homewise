import React, { useEffect } from "react";
import keycloak from "../../keycloak/Keycloak"; // import instance Keycloak

function Register() {
  useEffect(() => {
    // redirect tới trang đăng ký Keycloak
    keycloak.register();
  }, []);

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Redirecting to Register...</h2>
      <p>Đang chuyển hướng sang Keycloak để đăng ký tài khoản.</p>
    </div>
  );
}

export default Register;
