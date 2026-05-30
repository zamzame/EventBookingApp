import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="header">
      <div className="header-brand">EventBook</div>

      <nav className="header-nav">
        <NavLink to="/" end>Events</NavLink>
        <NavLink to="/my-bookings">My Bookings</NavLink>
      </nav>

      <button
        type="button"
        className="theme-toggle"
        onClick={toggle}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? 'Switch to dark' : 'Switch to light'}
      </button>
    </header>
  );
}