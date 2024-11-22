import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error) {
      alert(result.error.message);
    } else {
      setUser(result.data.user);
      navigate("/");
    }
  };

  return (
    <div className="login">
      <h1>Namaste!</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="default-btn">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span>
          <Link to="/signup">Sign up</Link>
        </span>
      </p>
    </div>
  );
}
