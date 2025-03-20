//import useState to store form data
import { useState } from "react"; 

//SignUpForm component that handles user signup
export default function SignUpForm({ setToken, setUser }) {
  //state for storing input values and error messages
  //stores username input
  const [username, setUsername] = useState(""); 
  //stores password input
  const [password, setPassword] = useState(""); 
  //stores error messages if validation fails
  const [error, setError] = useState(null); 

  //function to handle form submission
  async function handleSubmit(event) {
    //prevents page refresh when form is submitted
    event.preventDefault(); 

    //basic form validation to check if username & password meet length requirements
    if (username.length < 8) {
      //sets error message
      setError("Username must be at least 8 characters."); 
      //stops function execution
      return; 
    }
    if (password.length < 6) {
      //sets error message
      setError("Password must be at least 6 characters."); 
      //stops function execution
      return; 
    }

    try {
      //sends user data to signup API
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST", //HTTP request method
        //sends JSON data
        headers: { "Content-Type": "application/json" }, 
        //converts state to JSON format
        body: JSON.stringify({ username, password }), 
      });

      //parses API response
      const result = await response.json(); 
      if (result.token) {
        //saves the token in state (passed from App.jsx)
        setToken(result.token); 
        //saves the username in state (passed from App.jsx)
        setUser(username); 
        //clears error messages if signup is successful
        setError(null); 
        //logs signup details
        console.log("User signed up:", username, "Token:", result.token); 
      } else {
        //if API returns an error, display it
        throw new Error(result.message); 
      }
    } catch (error) {
      //stores API error in state to show in UI
      setError(error.message); 
    }
  }

  return (
    <>
      <h2>Sign Up</h2>

      {/* shows error message if an error exists */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
          //binds input to state
            value={username} 
            //updates state when user types
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            //binds input to state
            value={password} 
            //updates state when user types
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </label>
        <button type="submit">Submit</button> {/* triggers handleSubmit function */}
      </form>
    </>
  );
}

