import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="welcome">
      <h1>
        Hi Leon, welcome <br />
        to Zen
      </h1>
      <Link to="/reminders">
        <button className="default-btn">GET STARTED</button>
      </Link>
    </div>
  );
}
