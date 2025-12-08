import { Navigate } from "react-router-dom";
import { useKeycloakAuth } from "../../../keycloak/KeycloakProvider";

export default function AdminGuard({ children }) {
  const auth = useKeycloakAuth();

  // Chưa init keycloak
  if (!auth.keycloak) return <div>Checking admin authentication...</div>;

  // Không login thì chuyển login admin
  if (!auth.authenticated) return <Navigate to="/admin/login" />;

  // Check quyền admin trong Keycloak
  const roles = auth.keycloak?.tokenParsed?.realm_access?.roles || [];

  if (!roles.includes("admin")) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
