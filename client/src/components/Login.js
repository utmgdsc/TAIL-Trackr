import React, { useState } from "react";
import { AccountCircle, Iso, Lock } from "@material-ui/icons";
// import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import {login} from "../features/user"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOk, setIsOk] = useState(false)
  // const { login, error, isLoading } = useLogin();
  const navigate = useNavigate()
  const baseURL = "http://127.0.0.1:5000"
  const dispatch = useDispatch()

  const handleSubmit = () => {
    loginUser(email, password);
  };

  const loginUser = async (email, password) => {
    // used for error handling
    setIsLoading(true)
    setError(null)

    // POST request into db
    const response = await fetch(baseURL + '/api/user/login/', {
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
        setError(json.error)
    }
    if (response.ok) {
        // save user to local storage
        // localStorage.setItem("user", JSON.stringify(json))
        const user = await JSON.stringify(json)
        dispatch(login(user))

        console.log(user)

        // update auth context
        setIsOk(true)
        setIsLoading(false)
    }
}

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>
          Login
        </h1>
        <form className="form" name="login-form">
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

          {error && <div className="error-message">Sorry, incorrect email or password.</div>}
          {isLoading ? <div>Wait a moment please...</div> : ((isOk && !error) ? (() => {navigate("/")})() : null)}
        </form>

        <button onClick={handleSubmit} className="submit-button">
          Login
        </button>
      </div>
    </div>
  );
}
