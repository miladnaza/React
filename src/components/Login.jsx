import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "Lbody";
    return () => {
      document.body.className = "";
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}`);
      }

      if (data.message === "Login successful!") {
        setErrorMessage("");
        navigate("/MainPage");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Login request error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Llogin-container">
      <h1 className="Llogin-title">Welcome Back</h1>
      {errorMessage && <p className="Lerror-message">{errorMessage}</p>}
      <form className="Llogin-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          className="Llogin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="Password"
          className="Llogin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
        <button
          type="button"
          className="Llogin-button"
          onClick={handleLogin}
          disabled={!email || !password || loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p className="Lsignup-text">
        Don't have an account?{" "}
        <Link to="/Register" className="Lsignup-link">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
