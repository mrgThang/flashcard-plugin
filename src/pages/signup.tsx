import React, { useState } from "react";
import "../../styles.css";

interface SignupViewProps {
  onSignupSuccess: () => void;
}

export default function SignupView({ onSignupSuccess }: SignupViewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add your signup logic here (API call)
    // If successful:
    onSignupSuccess();
    // If failed, setMessage("Signup failed. Please try again.");
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
