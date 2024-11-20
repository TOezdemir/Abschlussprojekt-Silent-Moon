import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import React from "react";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); 
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstname, last_name: lastname },
        },
      });

      if (error) {
        setError(error.message); 
      } else {
        setUser(data.user);
        navigate("/login"); 
      }
    } catch (err) {
      setError("An error occurred during registration.");
      console.error(err);
    }
  };


  return (
    <div>
      <h1>Create your account!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <button type="submit">REGISTER</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      


<ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
    </div>
  );
}