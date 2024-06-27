import PropTypes from "prop-types";
import "./VoiceActors.css";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VoiceActors = ({ voiceActors }) => {
  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="voice-actors-container">
      <div className="voice-actors-slider-container">
        <Slider ref={sliderRef} {...sliderSettings} className="voice-actors-slider">
          {voiceActors.map((actor) => (
            <div key={actor.person.mal_id} className="voice-actor-card">
              <div className="voice-actor-image">
                <img src={actor.person.images.jpg.image_url} alt={actor.person.name} />
              </div>
              <div className="voice-actor-info">
                <h3>{actor.person.name}</h3>
                <p className="voice-actor-language">{actor.language}</p>
                <a href={actor.person.url} target="_blank" rel="noopener noreferrer" className="voice-actor-link">
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

VoiceActors.propTypes = {
  voiceActors: PropTypes.array.isRequired,
};

export default VoiceActors;
