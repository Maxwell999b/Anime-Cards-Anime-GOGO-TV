import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SunIcon from "../assets/brand-sun.svg";
import MoonIcon from "../assets/brand-moon.svg";
import SearchBar from "./SearchBar";
import Icon2 from "../assets/pnga1.svg";
import { Fade as Hamburger } from "hamburger-react";
import "./Navbar.css";

const Navbar = ({ lightMode, toggleLightMode, searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${lightMode ? "light-mode" : ""}`}>
      <div className="navbar-content">
        <div className="logo">
          <Link to="/">
            <img className="icon-sizing1" src={Icon2} alt="Icon" />
          </Link>
        </div>

        <div className="hamburger-container">
          <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
        </div>
        <div className={`nav-items ${isMenuOpen ? "open" : ""}`}>
          <span className="dropdown-toggle">Categories</span>
          <Link to="/" className="category-link" onClick={() => setIsMenuOpen(false)}>
            Anime
          </Link>
          <Link to="/manga" className="category-link" onClick={() => setIsMenuOpen(false)}>
            Manga
          </Link>
          <div className="toggle-mode">
            <button className="toggle-mode-btn" onClick={toggleLightMode}>
              {lightMode ? <img src={MoonIcon} alt="Dark Mode" /> : <img src={SunIcon} alt="Light Mode" />}
            </button>
            <div className="search-bar">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  lightMode: PropTypes.bool.isRequired,
  toggleLightMode: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Navbar;
