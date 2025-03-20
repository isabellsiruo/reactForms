//import useState to manage state
import { useState } from "react"; 
//import SignUpForm component
import SignUpForm from "./components/SignUpForm.jsx"; 
//import Authenticate component
import Authenticate from "./components/Authenticate.jsx"; 

//main App component that manages token and username
export default function App() {
  //stores token from API
  const [token, setToken] = useState(null); 
  //stores username from signup
  const [user, setUser] = useState(null); 

  return (
    <>
      {/* pass setToken and setUser to SignUpForm */}
      <SignUpForm setToken={setToken} setUser={setUser} />

      {/* pass token to Authenticate */}
      <Authenticate token={token} />
    </>
  );
}
