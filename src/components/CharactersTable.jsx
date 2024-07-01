import { useState } from "react";
import PropTypes from "prop-types";
import "./CharactersTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CharactersTable = ({ characters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(characters.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleImageClick = (image) => {
    setZoomedImage(image);
    setIsZoomed(true);
  };

  const handleZoomOut = () => {
    setIsZoomed(false);
    setZoomedImage(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = characters.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="characters-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((character, index) => (
            <tr key={indexOfFirstItem + index + 1}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{character.character.name}</td>
              <td>{character.role}</td>
              <td>
                <img
                  className="unzoomed-image"
                  src={character.character.images.webp.image_url}
                  alt={character.character.name}
                  onClick={() => handleImageClick(character.character.images.webp.image_url)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            className={index + 1 === currentPage ? "active" : ""}>
            {index + 1}
          </button>
        ))}
      </div>
      {isZoomed && (
        <>
          <div className="zoomed-image-overlay" onClick={handleZoomOut}>
            <div className="zoomed-image-container">
              <img src={zoomedImage} alt="Zoomed" className="zoomed-image" />
              <FontAwesomeIcon icon={faTimes} className="zoom-out-button" onClick={handleZoomOut} />
            </div>
          </div>
          <div className="page-overlay" onClick={handleZoomOut}></div>
        </>
      )}
    </div>
  );
};

CharactersTable.propTypes = {
  characters: PropTypes.array.isRequired,
};

export default CharactersTable;
