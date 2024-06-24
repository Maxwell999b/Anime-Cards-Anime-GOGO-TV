import PropTypes from "prop-types";
import "./Reviews.css";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

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
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactions, setReactions] = useState({ ...review.reactions });

  useEffect(() => {
    if (!review) return;

    const fetchReactions = async () => {
      try {
        const reactionResponse = await axios.get(`https://api.jikan.moe/v4/reactions/${review.mal_id}`);
        setReactions(reactionResponse.data.data.reactions);
      } catch (error) {
        console.error("Error fetching reactions:", error.message);
      }
    };

    fetchReactions();
  }, [review]);

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
    love_it: "❤️",
    funny: "😂",
    confusing: "😕",
    informative: "💡",
    well_written: "📝",
    creative: "🎨",
  };

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

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default Reviews;
