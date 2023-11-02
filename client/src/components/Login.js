import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Handle login submission
  };

  return (
    <div className="container">
      <form name="login-form">
        <h1>Login</h1>
        <h2>Enter your credentials to log in</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          className="field"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="field"
          required
        />

        <button onClick={() => handleSubmit()}>Log In</button>
      </form>
    </div>
  );
}
