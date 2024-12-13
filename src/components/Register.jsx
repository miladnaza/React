//winter
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
// this is the page to register and create an account 
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
    document.body.className = "Rbody";
    return () => {
      document.body.className = "";
    };
  }, []);

  const handleRegister = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter your email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/register`, {
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
        setSuccessMessage("Signup successful! Redirecting to the login page...");
        // Redirect to login after showing the success message
        setTimeout(() => {
          navigate("/login");
        }, 2000); // 2 seconds delay for user feedback
      } else {
        setErrorMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Signup request failed. Please try again.");
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
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="Password"
          className="Rregister-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
        <div className="Remail-offers-container">
          <input
            type="checkbox"
            id="emailOffers"
            className="Remail-offers-checkbox"
            checked={agreeToEmail}
            onChange={() => setAgreeToEmail(!agreeToEmail)}
          />
          <label htmlFor="emailOffers" className="Remail-offers-label">
            Join our email list to get exclusive offers, the best in books, and more. 
            You may unsubscribe at any time.
          </label>
        </div>
        <p className="Rsignup-text">
          By selecting "Create Account", you agree to our Terms of Use and Privacy Policy.
        </p>
        <button type="button" className="Rregister-button" onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="Rsignup-text">
        Already have an account?{" "}
        <a href="/login" className="Rsignup-link">
          Sign in here
        </a>
      </p>
    </div>
  );
};

export default Register;
