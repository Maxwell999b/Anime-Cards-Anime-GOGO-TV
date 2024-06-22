import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SunIcon from "../assets/brand-sun.svg";
import MoonIcon from "../assets/brand-moon.svg";
import SearchBar from "./SearchBar";
import Icon2 from "../assets/pnga1.svg";
import "./Navbar.css";

const Navbar = ({ lightMode, toggleLightMode, searchTerm, setSearchTerm }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img className="icon-sizing" src={Icon2} alt="Icon" />
        </Link>
      </div>
      <div className="categories">
        <Link to="/" className="category-link">
          Anime
        </Link>
        <Link to="/manga" className="category-link">
          Manga
        </Link>
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
