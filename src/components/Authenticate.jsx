//import useState to store authentication messages
import { useState } from "react"; 

//authenticate component that verifies user's token
export default function Authenticate({ token }) {
   //stores success message
  const [message, setMessage] = useState(null);
  //stores error message
  const [error, setError] = useState(null); 
  //stores username from API response
  const [user, setUser] = useState(null); 

  //function to handle authentication request
  async function handleClick() {
    try {
      //sends GET request to authenticate user with token
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
      //HTTP request method  
      method: "GET", 
        headers: {
          //sends JSON data
          "Content-Type": "application/json", 
          //includes token for authentication
          Authorization: `Bearer ${token}`, 
        },
      });
//parses API response
      const result = await response.json(); 

      //saves success message from API response
      setMessage(result.message); 
      //saves username (if exists)
      setUser(result.data?.username || "Unknown User"); 
      //logs username in console
      console.log("Authenticated User:", result.data?.username); 
    } catch (error) {
      //stores API error in state to show in UI
      setError(error.message); 
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {message && <p style={{ color: "green" }}>{message}</p>} {/* shows success message */}
      {user && <p>Logged in as: {user}</p>} {/* shows username */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* shows error message */}
      <button onClick={handleClick}>Authenticate Token!</button> {/* calls handleClick function */}
    </div>
  );
}
