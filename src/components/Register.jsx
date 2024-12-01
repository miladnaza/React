import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter your email and password");
      return;
    }

    try {
      console.log("Signup request data:", { email, password });

      const response = await fetch("http://localhost:3000/register", {
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
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.message === "Signup successful!") {
        setSuccessMessage("Signup successful! Redirecting to the login page.");
        setTimeout(() => {
          navigate("/login"); 
        }, 2000); 
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Signup request error:", error);
      setErrorMessage("Signup request failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">CREATE ACCOUNT</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="register-button" onClick={handleRegister}>
          Register
        </button>
      </form>
      <p className="signup-text">
        Already have an account?{" "}
        <a href="/login" className="signup-link">
          Log in here
        </a>
      </p>
    </div>
  );
};

export default Register;
