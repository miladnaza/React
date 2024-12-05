import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
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
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      console.log("Signup request data:", { firstName, lastName, phoneNumber, email, password });

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
        throw new Error(`Signup failed: ${response.status}`);
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
          type="text"
          placeholder="First name"
          className="register-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          className="register-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone number"
          className="register-input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
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
        <div className="email-offers-container">
          <input
            type="checkbox"
            id="emailOffers"
            className="email-offers-checkbox"
            checked={agreeToEmail}
            onChange={() => setAgreeToEmail(!agreeToEmail)}
          />
          <label htmlFor="emailOffers" className="email-offers-label">
            Join our email list to get exclusive offers, the best in books, and more. 
            <br />You may unsubscribe at any time.
          </label>
        </div>
        <p className="signup-text">
          By selecting "Create Account", you agree to our Terms of Use and Privacy Policy.
        </p>
        <button type="button" className="register-button" onClick={handleRegister}>
          Create Account
        </button>
      </form>
      <p className="signup-text">
        Already have an account?{" "}
        <Link to="/login" className="sign-link">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Register;
