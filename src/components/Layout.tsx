import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Logo from "./Logo";
import './layout.css'; 

export default function Layout() {
  return (
    <div className="layout">
      <div className="phone-frame">
        <div className="screen">
          <header className="header">
            <Logo />
          </header>
          <main className="content">
            <Outlet />
          </main>
          <footer className="footer">
            <nav className="navbar-bottom">
              <Navbar />
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}