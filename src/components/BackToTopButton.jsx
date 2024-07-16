import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import "./BackToTopButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 300,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="back-to-top">
      <button type="button" onClick={scrollToTop} className={`scroll-to-top-btn ${isVisible ? "show" : ""}`}>
        <FontAwesomeIcon icon={faArrowUp} bounce />
        Top
      </button>
    </div>
  );
};

export default BackToTopButton;
