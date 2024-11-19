import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <ul>
      <li>
        <img src="/src/assets/img/Yoga.png" alt="Yoga Icon" />
        <NavLink to="/yoga">Yoga</NavLink>
      </li>
      <li>
        <img src="/src/assets/img/Meditate.png" alt="Meditate Icon" />
        <NavLink to="/meditation">Meditate</NavLink>
      </li>
      <li>
        <img src="/src/assets/img/Home.png" alt="Home Icon" />
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>
        <img src="/src/assets/img/Music.png" alt="Music Icon" />
        <NavLink to="/music">Music</NavLink>
      </li>
      <li>
        <img src="/src/assets/img/Profile.png" alt="Profile Icon" />
        <NavLink to="/profile">Profile</NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
