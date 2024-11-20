import { Link } from "react-router-dom"


export default function WelcomePage(){
    return(
        <div>
              <h1>Welcome to Silent Moon</h1>
            <h2>Your Relaxing App</h2>
            <Link to="/signup">
        <button>SIGN UP</button>
      </Link>
            <p>
        ALREADY HAVE AN ACCOUNT? <Link to="/login">LOG IN</Link>
      </p>
      <Link to="/home">
        <button>LOGIN FOR GUESTS</button>
      </Link>
        </div>
    )
}