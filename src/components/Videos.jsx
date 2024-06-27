import PropTypes from "prop-types";
import "./Videos.css";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material/styles";
import { Slider as MuiSlider } from "@mui/material";
const CustomSlider = styled(MuiSlider)({
  color: "var(--title-color-light)",
  height: 8,
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "var(--mode-theme-primary)",
    border: "2px solid var(--title-color-light)",
    "&:hover": {
      boxShadow: "0px 0px 0px 8px var(--pagination-bg-button-hover)",
    },
    "& .MuiSlider-valueLabel": {
      backgroundColor: "var(--title-color-light)",
      color: "#fff",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "var(--details-values-color-light)",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "var(--details-values-color-light)",
    height: 8,
    width: 8,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "var(--title-color-light)",
    },
  },
});
const Videos = ({ episodes }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 5,
    autoplay: true,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
      handleBeforeChange(oldIndex, newIndex);
    },
    afterChange: (index) => {
      if (isMountedRef.current) {
        setCurrentSlide(index);
      }
    },
  };

  const handleBeforeChange = (oldIndex, newIndex) => {
    if (isMountedRef.current) {
      setCurrentSlide(newIndex);
    }
  };

  const handleSliderChange = (event, newValue) => {
    sliderRef.current.slickGoTo(newValue);
  };

  return (
    <div className="videos-container">
      <Slider ref={sliderRef} {...sliderSettings} className="videos-slider">
        {episodes.map((episode, index) => (
          <div key={episode.mal_id}>
            <EpisodeCard episode={episode} currentSlide={currentSlide === index} />
          </div>
        ))}
      </Slider>
      <CustomSlider
        value={currentSlide}
        onChange={handleSliderChange}
        step={1}
        min={0}
        max={episodes.length - 1}
        valueLabelDisplay="auto"
        marks
        className="mui-slider"
      />
    </div>
  );
};

Videos.propTypes = {
  episodes: PropTypes.array.isRequired,
};

const EpisodeCard = ({ episode, currentSlide }) => {
  return (
    <div className={`episode-card ${currentSlide ? "current" : ""}`}>
      <h3>{episode.title}</h3>
      <span
        className={`title-japanese ${
          episode.title.toLowerCase() === episode.title_japanese.toLowerCase() ? "hidden" : ""
        }`}>
        {episode.title_japanese}
      </span>
      <p className="anime-details-ids">
        Aired: <span className="anime-details-values">{new Date(episode.aired).toLocaleDateString()}</span>
      </p>
      <p className="anime-details-values">
        Score: <span className="anime-details-values episode-score">{episode.score}</span>
      </p>
      <a href={episode.url} target="_blank" rel="noopener noreferrer" className="episode-link-btn">
        Watch Episode
      </a>
    </div>
  );
};

EpisodeCard.propTypes = {
  episode: PropTypes.object.isRequired,
  currentSlide: PropTypes.bool.isRequired,
};

export default Videos;
