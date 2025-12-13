import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>

      {user?.role === "admin" && <Link to="/admin">Admin</Link>}

      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;
