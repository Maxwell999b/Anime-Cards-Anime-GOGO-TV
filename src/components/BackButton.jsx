import { useNavigate } from "react-router-dom";
import "./BackButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <button className="back-button" onClick={handleBackClick}>
      <FontAwesomeIcon icon={faArrowLeft} shake /> Back
    </button>
  );
};

export default BackButton;
