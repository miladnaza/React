import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(), 
          password: password.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Login failed.: ${response.status}`);
      }

      const data = await response.json();
      if (data.message === "Login successful!") {
        console.log("Login successful.");
        setErrorMessage("");
        navigate("/"); 
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Login request error: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome Back</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="login-button" onClick={handleLogin}>
          Log in
        </button>
      </form>
      <p className="signup-text">
        Don't have an account?{" "}
        <a href="/register" className="signup-link">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default Login;
