import { useState } from "react";
import SignUpForm from "./components/SignUpForm.jsx";
import Authenticate from "./components/Authenticate.jsx";


export default function App() {
  //create state for storing token
  const [token, setToken] = useState(null);

  return (
    <>
      {/* pass setToken to SignUpForm */}
      <SignUpForm setToken={setToken} />

      {/* pass token to Authenticate */}
      <Authenticate token={token} />
    </>
  );
}
