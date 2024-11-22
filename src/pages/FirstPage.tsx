import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <div className="first-page">
      <div className="fp-headline">
        <h1>We are what we do</h1>
        <p>
          Thousands of people are using zen for meditation and yoga classes.
        </p>
      </div>
      <div className="fp-btn">
        <Link to="/signup">
          <button className="fp-signup-btn">SIGN UP</button>
        </Link>
        <Link to="/welcome">
          <button className="fp-guest-btn">LOGIN FOR GUESTS</button>
        </Link>
      </div>
      <p>
        Already have an account?{" "}
        <span>
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
}

export default FirstPage;
