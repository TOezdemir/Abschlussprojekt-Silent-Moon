import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

function FirstPage() {
  const { handleGuestLogin } = useUserContext()
  const navigate = useNavigate()

  const handleGuestLoginAndNavigate = async() => {
    await handleGuestLogin()
    navigate("/home")
  }

  return (
    <div className="first-page">
      <div className="fp-headline">
        <img src="/src/assets/img/fp-yogagirl.png" alt="yogagirl" />
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
          <button className="fp-guest-btn" onClick={handleGuestLoginAndNavigate}>LOGIN FOR GUESTS</button>
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
