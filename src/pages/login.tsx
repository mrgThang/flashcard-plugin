import React, { useState } from "react";
import { LoginHandler } from '../requests/request';

export default function LoginView({ onLoginSuccess, onClickSignUp }: { onLoginSuccess: () => void, onClickSignUp: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      await LoginHandler({ email: username, password });
      onLoginSuccess();
    } catch {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Flashcard</h2>
      <div className="login-form">
        <div className="login-row">
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
        </div>
        <div className="login-row">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="login-signup-link">
          <span>Don't have an account? </span>
          <a href="#signup" className="signup-link" onClick={e => { e.preventDefault(); onClickSignUp(); }}>Sign up</a>
        </div>
        <div className="login-message">{message}</div>
      </div>
    </div>
  );
}