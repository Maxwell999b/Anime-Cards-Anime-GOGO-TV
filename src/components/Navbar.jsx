import PropTypes from "prop-types";
import SunIcon from "../assets/brand-sun.svg";
import MoonIcon from "../assets/brand-moon.svg";
import SearchBar from "./SearchBar";
import Icon2 from "../assets/pnga1.png";
import "./Navbar.css";

const Navbar = ({ lightMode, toggleLightMode, searchTerm, setSearchTerm }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="./">
          <img className="icon-sizing" src={Icon2} alt="Icon" />
        </a>
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
