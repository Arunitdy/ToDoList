import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/signup.css";


const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/signup`, form);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Signup</h2>
        <input className="signup-input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" 
          className="signup-button">Signup</button>

        <hr className="signup-divider"/>

        <button
        className="login-link-button"
          type="button"
          onClick={() => navigate("/login")}
          style={{ background: "transparent", border: "1px solid #ccc", padding: "8px", cursor: "pointer" }}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
