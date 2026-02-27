import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import "../style/Login.css"
export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");
      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };

 return (
  <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  </div>
);
}