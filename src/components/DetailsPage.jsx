import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnimeDetails from "./AnimeDetails";
import MangaDetails from "./MangaDetails";
import "./Details.css";

const DetailsPage = () => {
  const { id, type } = useParams();
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryAttempt, setRetryAttempt] = useState(0); // Track retry attempts

  const fetchDetails = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/${type}/${id}`);
      setDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const delay = Math.min(2 ** retryAttempt * 1000, 30000); // max delay of 30 seconds
        setTimeout(() => {
          setRetryAttempt(retryAttempt + 1);
          fetchDetails(); // retry with incremented attempt
        }, delay);
      } else if (error.response && error.response.status === 404) {
        setError("Resource not found");
        setLoading(false);
      } else {
        setError("Error fetching data");
        setLoading(false);
      }
    }
  }, [id, type, retryAttempt]);

  const fetchReviews = useCallback(async () => {
    try {
      const reviewsResponse = await axios.get(`https://api.jikan.moe/v4/${type}/${id}/reviews`);
      setReviews(reviewsResponse.data.data);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const delay = Math.min(2 ** retryAttempt * 1000, 30000); // max delay of 30 seconds
        setTimeout(() => {
          setRetryAttempt(retryAttempt + 1);
          fetchReviews(); // retry with incremented attempt
        }, delay);
      } else {
        setError("Error fetching reviews");
      }
    }
  }, [id, type, retryAttempt]);

  useEffect(() => {
    setRetryAttempt(0); // Reset retry attempts on component mount
    fetchDetails();
  }, [id, type, fetchDetails]);

  useEffect(() => {
    if (details) {
      fetchReviews();
    }
  }, [details, fetchReviews]);

  useEffect(() => {
    // Clear reviews if details change to prevent mismatch
    setReviews([]);
  }, [id, type]);

  if (loading) {
    return (
      <div className="loading-icon">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return details ? (
    type === "anime" ? (
      <AnimeDetails anime={details} reviews={reviews} />
    ) : (
      <MangaDetails manga={details} reviews={reviews} />
    )
  ) : (
    <div>No details available</div>
  );
};

export default DetailsPage;
