import { useState } from "react";
import PropTypes from "prop-types";
import "./StaffTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const StaffTable = ({ staff }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(staff.length / itemsPerPage);

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
  const currentItems = staff.slice(indexOfFirstItem, indexOfLastItem);

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
          {currentItems.map((staffMember, index) => (
            <tr key={indexOfFirstItem + index + 1}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>
                <a href={staffMember.person.url} target="_blank" rel="noopener noreferrer" className="">
                  {staffMember.person.name}
                </a>
              </td>
              <td>{staffMember.positions.join(", ")}</td>
              <td>
                <img
                  className="unzoomed-image"
                  src={staffMember.person.images.jpg.image_url}
                  alt={staffMember.person.name}
                  onClick={() => handleImageClick(staffMember.person.images.jpg.image_url)}
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

StaffTable.propTypes = {
  staff: PropTypes.array.isRequired,
};

export default StaffTable;
