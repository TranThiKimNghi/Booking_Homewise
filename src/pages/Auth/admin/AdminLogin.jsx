import { useEffect } from "react";
import { useKeycloakAuth } from "../../../keycloak/KeycloakProvider"; 
import { useAuth } from "../../../contexts/AuthContext"; // đúng đường dẫn
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const keycloak = useKeycloakAuth();   // hook => luôn gọi như function
  const { loginAdmin } = useAuth();     // lấy hàm loginAdmin từ Context
  const navigate = useNavigate();

  
    useEffect(() => {
    keycloak.init({ onLoad: "login-required" }).then(authenticated => {
      if (authenticated) {
        const token = keycloak.token;

        // truyền token + instance
        loginAdmin(token, keycloak);

        navigate("/admin");
      }
    });
  }, []);

  return <div>Redirecting to Admin Login...</div>;
}

export default AdminLogin;
