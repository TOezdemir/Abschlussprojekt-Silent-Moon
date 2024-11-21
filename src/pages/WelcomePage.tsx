import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div>
      <h1>Hi Leon, welcome to Silent Moon</h1>
      <Link to="/reminder">
        <button>GET STARTED</button>
      </Link>
    </div>
  );
}
