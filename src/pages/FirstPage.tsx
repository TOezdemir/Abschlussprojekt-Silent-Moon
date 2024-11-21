import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <div className="first-page">
      <div>
        <h1>We are what we do</h1>
      </div>
      <p>
        Thousand of people are using silent moon for meditation and yoga
        classes.
      </p>

      <button>SIGN UP</button>
      <p>
        Already have an account?{" "}
        <span>
          <Link to="/signup">Login</Link>
        </span>
      </p>
      <Link to="/welcome">
        <button className="welcome-btn">LOGIN FOR GUESTS</button>
      </Link>
    </div>
  );
}

export default FirstPage;
