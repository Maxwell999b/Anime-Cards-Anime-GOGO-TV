import PropTypes from "prop-types";
import "./Reviews.css";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Reviews = ({ reviews }) => {
  return (
    <div className="reviews-container">
      {reviews.map((review) => (
        <ReviewCard key={review.mal_id} review={review} />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const [showMore, setShowMore] = useState(false);

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  const reviewText = showMore ? review.review : review.review.slice(0, 300) + "...";

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="user-info">
          <img src={review.user.images.jpg.image_url} alt={review.user.username} className="user-image" />
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
            Overall 📜: <span className="review-emoji-overall">{review.reactions.overall}</span>
          </span>
          <button onClick={handleToggleShowMore} className="show-more-less-btn">
            {showMore ? "Show less🔼" : "Show more🔽"}
          </button>
        </div>
        {showMore && (
          <div className="review-details">
            <span className="review-emoji">
              Nice: <span className="review-emoji-copy">{review.reactions.nice} 😊</span>
            </span>
            <span className="review-emoji">
              Love it: <span className="review-emoji-copy">{review.reactions.love_it} ❤️</span>
            </span>
            <span className="review-emoji">
              Funny: <span className="review-emoji-copy">{review.reactions.funny} 😂</span>
            </span>
            <span className="review-emoji">
              Confusing: <span className="review-emoji-copy">{review.reactions.confusing} 😕</span>
            </span>
            <span className="review-emoji">
              Informative: <span className="review-emoji-copy">{review.reactions.informative} 💡</span>
            </span>
            <span className="review-emoji">
              Well written: <span className="review-emoji-copy">{review.reactions.well_written} 📝</span>
            </span>
            <span className="review-emoji">
              Creative: <span className="review-emoji-copy">{review.reactions.creative} 🎨</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default Reviews;
