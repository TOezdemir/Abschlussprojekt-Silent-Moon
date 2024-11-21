// import { useState } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useUserContext } from "../context/userContext";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";  

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { setUser } = useUserContext();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = await supabase.auth.signInWithPassword({ email, password });
//     if (result.error) {
//       alert(result.error.message);
//     } else {
//       setUser(result.data.user);
//       navigate("/");
//     }
//   };

//   return (
//     <div> 
//       <h1>Welcome Back!</h1>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button>Log in</button>
//       </form>
//       <p>
//         Don't have an account? <Link to="/signup">Sign up</Link>
//       </p>
//     </div>
//   );
// }


import { Link } from "react-router-dom";


export default function YogaPage() {
  return (
    <div>
      <h1>Yoga Page</h1>
      <p>Wähle dein Yoga-Erlebnis aus:</p>
      <div>
      <button>
          <Link to="/yogavideo">Yoga Video</Link>
        </button>
        <button>
          <Link to="/yogabinaural">Yoga Binaural</Link>
        </button>
        <button>
          <Link to="/yogapiano">Yoga Piano</Link>
        </button>
        <button>
          <Link to="/yogamantra">Yoga Mantra</Link>
        </button>
      </div>
    </div>
  );
}