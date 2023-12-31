import React, { useState } from "react";
import { AccountCircle, Lock } from "@material-ui/icons";
// import useRegister from "../hooks/useRegister";
import {useNavigate} from "react-router-dom"
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { register, error, isLoading, ok } = useRegister();
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOk, setIsOk] = useState(false)
  const navigate = useNavigate()
  const baseURL = "http://127.0.0.1:5000"

  const handleSubmit = () => {
    register(email, password)
  };
  const register = async (email, password) => {
    // used for error handling
    setIsLoading(true)
    setError(null)

    // POST request into db
    const response = await fetch(baseURL + '/api/user/register/', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email, password})
    })

    // logging the response data
    console.log(response)
    
    const json = await response.json()
    
    // checking response
    if (!response.ok) {
        setIsLoading(false)
        setError(json.Error)
    }
    if (response.ok) {
        // save user to local storage
        await localStorage.setItem("user", JSON.stringify(json))
        // update auth context
        setIsOk(true)
        setIsLoading(false)
    }

    return response
  }

  return (
    <div className="register-container">
      <div className="register-content">
        <h1>Register</h1>
        <h2>Register to make an account and find your missing pet</h2>
        <form className="form" name="register-form">
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
          {error && (
              <div className="error-message">
                  {error.includes("Invalid email format") && "Invalid email format"}
                  {error.includes("Password must be at least 8 characters long") && "Password must be at least 8 characters long"}
                  {error.includes("Email is already in use") && "Email is already in use"}
              </div>
          )}
          {isLoading ? <div>Wait a moment please...</div> : ((isOk && !error) ? (() => { window.location.reload(); navigate("/email-verification"); })() : null)}
        </form>

        <button onClick={handleSubmit} className="submit-button">
          Register
        </button>
      </div>
    </div>
  );
}
