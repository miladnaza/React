import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToEmail, setAgreeToEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "Rbody"; // Apply styling to the body
    return () => {
      document.body.className = ""; // Cleanup on unmount
    };
  }, []);

  const handleRegister = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    // Validation
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phoneNumber: phoneNumber.trim(),
          email: email.trim(),
          password: password.trim(),
          agreeToEmail,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed.");
      }

      const data = await response.json();
      if (data.message === "Signup successful!") {
        setSuccessMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setErrorMessage(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Rregister-container">
      <h1 className="Rregister-title">Create Account</h1>
      {errorMessage && <p className="Rerror-message">{errorMessage}</p>}
      {successMessage && <p className="Rsuccess-message">{successMessage}</p>}
      <form className="Rregister-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="First name"
          className="Rregister-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          className="Rregister-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone number"
          className="Rregister-input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="Rregister-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="Rregister-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="Rregister-checkbox">
          <input
            type="checkbox"
            checked={agreeToEmail}
            onChange={(e) => setAgreeToEmail(e.target.checked)}
          />
          I agree to receive emails about updates.
        </label>
        <button
          type="button"
          className="Rregister-button"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="Rsignup-text">
        Already have an account?{" "}
        <a href="/login" className="Rsignup-link">
          Log in here
        </a>
      </p>
    </div>
  );
};

export default Register;
