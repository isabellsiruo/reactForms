import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    //prevents page refresh
    event.preventDefault(); 

    //client-side validation
    if (username.length < 8) {
      setError("Username must be at least 8 characters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();

      if (result.token) {
        //store token in App.jsx state
        setToken(result.token); 
        //clear error on success
        setError(null); 
      } else {
        //API error handling
        throw new Error(result.message); 
      }
    } catch (error) {
      //store error message in state
      setError(error.message); 
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      
      {/* show error message if it exists */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
