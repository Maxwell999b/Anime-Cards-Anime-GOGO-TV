import PropTypes from "prop-types";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  // Remove handleSearchChange from props
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
