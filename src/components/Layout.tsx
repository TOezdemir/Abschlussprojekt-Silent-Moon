import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Logo from "./Logo";
import './layout.css'; 

export default function Layout() {
  return (
    <div className="phone-frame">
      <div className="app-layout">
        {/* Header */}
        <header className="header">
          <Logo />
        </header>

        {/* Main Content */}
        <main className="content">
          <Outlet />
        </main>

        <footer className="footer">
          {/* Navbar am unteren Rand */}
          <nav className="navbar-bottom">
            <Navbar />
          </nav>
        </footer>
      </div>
    </div>
  );
}