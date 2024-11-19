import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/yoga">Yoga</NavLink>
      <NavLink to="/meditation">Meditate</NavLink>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/music">Music</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
}

export default Navbar;
