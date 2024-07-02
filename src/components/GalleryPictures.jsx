import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "./GalleryPictures.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";

const GalleryPictures = ({ pictures }) => {
  const sliderRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentImageIndex);
    }
  }, [currentImageIndex, isZoomed]);
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(pictures.length, 5), // Ensure it doesn't exceed the number of pictures
    slidesToScroll: 1,
    autoplay: false,
    arrows: !isZoomed, // Show arrows only when not zoomed
    centerMode: pictures.length < 5, // Enable center mode if there are fewer than 5 pictures
    centerPadding: "50px", // for spacing between slides
  };
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsZoomed(true);
  };

  const handleZoomOut = () => {
    setIsZoomed(false);
  };

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(pictures.length - 1); // Loop to last image
    }
  };

  const handleNext = () => {
    if (currentImageIndex < pictures.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0); // Loop to first image
    }
  };
  if (!pictures || pictures.length === 0) {
    return <h2 className="checking-no-data">&quot;&gt; Pictures Found 😔&quot;</h2>;
  }

  return (
    <div className={`galleryPic-pictures-container ${isZoomed ? "zoomed" : ""}`}>
      <Slider ref={sliderRef} {...sliderSettings} className="galleryPic-pictures-slider">
        {pictures.map((picture, index) => (
          <div key={index} className="galleryPic-picture-card" onClick={() => handleImageClick(index)}>
            <img src={picture.jpg.large_image_url} alt={`galleryPic Picture ${index + 1}`} />
          </div>
        ))}
      </Slider>
      {isZoomed && (
        <>
          <div className="zoomed-image-overlay">
            <FontAwesomeIcon icon={faChevronLeft} className="zoomed-prev" onClick={handlePrev} />
            <div className="zoomed-image-container">
              <img src={pictures[currentImageIndex].jpg.large_image_url} alt={`Zoomed galleryPic Picture`} />
              <FontAwesomeIcon icon={faTimes} className="zoom-out-button" onClick={handleZoomOut} />
            </div>
            <FontAwesomeIcon icon="fa-solid fa-forward" />
            <FontAwesomeIcon icon={faChevronRight} className="zoomed-next" onClick={handleNext} />
          </div>
          <div className="page-overlay" onClick={handleZoomOut}></div>
        </>
      )}
    </div>
  );
};

GalleryPictures.propTypes = {
  pictures: PropTypes.array.isRequired,
};

export default GalleryPictures;
