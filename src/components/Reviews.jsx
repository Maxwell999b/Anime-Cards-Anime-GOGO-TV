import PropTypes from "prop-types";
import "./Reviews.css";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = ({ reviews }) => {
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
      handleBeforeChange(oldIndex, newIndex);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const handleBeforeChange = (oldIndex, newIndex) => {
    if (isMountedRef.current) {
      setCurrentSlide(newIndex); // Update current slide index
    }
  };

  return (
    <div className="reviews-container">
      <Slider ref={sliderRef} {...sliderSettings} className="reviews-slider">
        {reviews.map((review, index) => (
          <div key={review.mal_id}>
            <ReviewCard review={review} currentSlide={currentSlide === index} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

const ReviewCard = ({ review, currentSlide }) => {
  const [showMore, setShowMore] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactions, setReactions] = useState({ ...review.reactions });

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleReactionClick = (reaction) => {
    setReactions((prevReactions) => {
      const updatedReactions = { ...prevReactions };
      if (selectedReaction === reaction) {
        updatedReactions[reaction]--;
        updatedReactions.overall--;
        setSelectedReaction(null);
      } else {
        if (selectedReaction !== null) {
          updatedReactions[selectedReaction]--;
          updatedReactions.overall--;
        }
        updatedReactions[reaction]++;
        updatedReactions.overall++;
        setSelectedReaction(reaction);
      }
      return updatedReactions;
    });
  };

  const reviewText = showMore ? review.review : review.review.slice(0, 300) + "...";

  const reactionEmojis = {
    nice: "😊",
    love_it: "💕",
    funny: "😂",
    confusing: "😕",
    informative: "💡",
    well_written: "📝",
    creative: "🎨",
  };

  useEffect(() => {
    if (!currentSlide) {
      setShowMore(false); // Reset showMore state when sliding away from this card
    }
  }, [currentSlide]);

  return (
    <div className={`review-card ${showMore ? "expanded" : ""}`}>
      <div className="review-header">
        <div className="user-info">
          {review.user.images.jpg && review.user.images.jpg.image_url && (
            <img src={review.user.images.jpg.image_url} alt={review.user.username} className="user-image" />
          )}
          <span className="username">{review.user.username}</span>
        </div>
        <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
      </div>
      <div className="review-tags">
        {review.tags.map((tag, index) => (
          <span key={index} className="review-tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="review-body">
        <ReactMarkdown>{reviewText}</ReactMarkdown>
      </div>
      <div className="review-footer">
        <div className="review-reactions">
          <span className="review-emoji-overall-total">
            Overall 📜: <span className="review-emoji-overall">{reactions.overall}</span>
          </span>
          <button onClick={handleToggleShowMore} className="show-more-less-btn">
            {showMore ? "Show less🔼" : "Show more🔽"}
          </button>
        </div>
        {showMore && (
          <div className="review-details">
            {Object.keys(reactionEmojis).map((reaction) => (
              <span
                key={reaction}
                className={`review-emoji ${selectedReaction === reaction ? "selected" : ""}`}
                onClick={() => handleReactionClick(reaction)}>
                {reaction.charAt(0).toUpperCase() + reaction.slice(1)} {reactionEmojis[reaction]}:{" "}
                <span className={`review-emoji-copy ${selectedReaction === reaction ? "selected" : ""}`}>
                  {reactions[reaction]}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  currentSlide: PropTypes.bool.isRequired,
};

export default Reviews;
