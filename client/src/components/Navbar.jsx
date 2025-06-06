import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./css/navbar.css"; 

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
      <span>📋 My To-Do</span>
      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
