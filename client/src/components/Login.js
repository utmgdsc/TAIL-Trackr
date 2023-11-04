import React, { useState } from "react";
import { AccountCircle, Lock } from "@material-ui/icons";
import useRegister from "../hooks/useRegister";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, error, isLoading } = useRegister();

  const handleSubmit = () => {
    // lofin(email, password);
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h1>
          Login
        </h1>
        <form className="form" name="login- form">
            <div className="padding-container">
          <div className="input-container">
            <div className="input-icon">
              <AccountCircle />
            </div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              placeholder="Email"
              className="field"
              required
            />
          </div>

          <div className="input-container">
            <div className="input-icon">
              <Lock />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="field"
              required
            />
          </div>
          </div>

          {error && <div className="error-message">Sorry, email is already in use.</div>}
        </form>

        <button onClick={handleSubmit} className="submit-button">
          Login
        </button>
      </div>
    </div>
  );
}
