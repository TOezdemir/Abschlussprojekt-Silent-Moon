import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="welcome">
      <h1>
        Hi Leon, <br />
        welcome <br />
        to Zen
      </h1>
      <img src="/src/assets/img/yoga-man.png" alt="" />
      <Link to="/reminders">
        <button className="default-btn">GET STARTED</button>
      </Link>
    </div>
  );
}
