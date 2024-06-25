import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SunIcon from "../assets/brand-sun.svg";
import MoonIcon from "../assets/brand-moon.svg";
import SearchBar from "./SearchBar";
import Icon2 from "../assets/pnga1.svg";
import "./Navbar.css";

const Navbar = ({ lightMode, toggleLightMode, searchTerm, setSearchTerm }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={`navbar ${lightMode ? "light-mode" : ""}`}>
      <div className="logo">
        <Link to="/">
          <img className="icon-sizing1" src={Icon2} alt="Icon" />
        </Link>
      </div>
      <div className="dropdown categories">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          Categories
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/" className="category-link" onClick={() => setIsDropdownOpen(false)}>
              Anime
            </Link>
            <Link to="/manga" className="category-link" onClick={() => setIsDropdownOpen(false)}>
              Manga
            </Link>
          </div>
        )}
      </div>
      <div className="search-bar">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="toggle-mode">
        <button className="toggle-mode-btn" onClick={toggleLightMode}>
          {lightMode ? <img src={MoonIcon} alt="Dark Mode" /> : <img src={SunIcon} alt="Light Mode" />}
        </button>
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
