import { Link } from "react-router-dom";

export default function MusicPage() {
  return (
    <>
      <div>Music</div>
      <section className="test-links">
        {" "}
        <li>
          <Link to="/firstpage">First Site</Link>{" "}
        </li>{" "}
        <li>
          <Link to="/login">Login Site</Link>{" "}
        </li>{" "}
        <li>
          <Link to="/signup">Signup Site</Link>{" "}
        </li>{" "}
        <li>
          <Link to="/welcome">Welcome Site</Link>{" "}
        </li>{" "}
        <li>
          <Link to="/reminders">Reminder Site</Link>{" "}
        </li>{" "}
      </section>
    </>
  );
}
