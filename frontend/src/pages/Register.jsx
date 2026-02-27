import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../style/Register.css"
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);

      alert("Registration Successful ✅");
      navigate("/login");

    } catch (error) {
      alert("Error");
    }
  };
return (
  <div className="register-container">
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
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
      <button type="submit">Register</button>
    </form>
  </div>
);
}