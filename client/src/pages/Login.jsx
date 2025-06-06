import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./css/login.css";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/login`, form);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Login</h2>
      <input
      className="login-input" 
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
      className="login-input"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" className="login-button">Login</button>

      <hr className="login-divider" />

      {/* Sign Up Button */}
      <button
        className = "signup-link-button"
        type="button"
        onClick={() => navigate("/signup")}
       >
        Don't have an account? Sign up
      </button>
    </form>
    </div>
  );
};

export default Login;
