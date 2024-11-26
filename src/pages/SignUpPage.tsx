import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

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
    <div className="signup">
      <h1>Create your account!</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          className="signup-input"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="signup-input"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          className="signup-input"
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          className="signup-input"
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <button className="default-btn" type="submit">
          REGISTER
        </button>  
      </form>


      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
