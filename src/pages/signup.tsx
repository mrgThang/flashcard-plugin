import React, { useState } from "react";
import "../../styles.css";
import { SignupHandler } from "src/requests/request";
import { ShowInfo } from "src/helpers/notify";

interface SignupViewProps {
  onSignupSuccess: () => void;
}

export default function SignupView({ onSignupSuccess }: SignupViewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    SignupHandler({"name": name, "email": email, "password": password}).then(
      () => {
        ShowInfo("Signup success!")
        onSignupSuccess()
      }
    )
  };

  return (
    <div>
      <h2>Flashcard</h2>
      <form className="login-form" onSubmit={handleSignup}>
        <div className="login-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="login-row">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-row">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
