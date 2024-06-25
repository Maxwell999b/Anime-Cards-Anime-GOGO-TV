import PropTypes from "prop-types";
import "./Navbar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return <input type="text" placeholder="Search by title..." value={searchTerm} onChange={handleInputChange} />;
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
