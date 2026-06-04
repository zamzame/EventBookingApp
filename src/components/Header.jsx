import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useUser } from "../context/UserContext.jsx";

export default function Header() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-brand">EventBook</div>

      <nav className="header-nav">
        <NavLink to="/" end>Events</NavLink>
        <NavLink to="/my-bookings">My Bookings</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      {user && (
        <span className="header-user muted small">Hi, {user.name}</span>
      )}

      <button
        type="button"
        className="theme-toggle"
        onClick={toggle}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? 'Switch to dark' : 'Switch to light'}
      </button>

      {user && (
        <button
          type="button"
          className="header-logout"
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
        >
          <LogOut size={18} />
          <span className="header-logout-label">Log out</span>
        </button>
      )}
    </header>
  );
}


