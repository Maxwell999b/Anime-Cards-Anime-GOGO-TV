import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnimeDetails from "./AnimeDetails";
import "./Details.css";

const AnimeDetailsPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const animeResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(animeResponse.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [id]);

  useEffect(() => {
    if (!anime) return; // Wait until anime data is loaded

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/reviews`);
        setReviews(reviewsResponse.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReviews();
  }, [anime, id]);

  const memoizedAnimeDetails = useMemo(() => anime, [anime]);

  if (loading)
    return (
      <div className="loading-icon">
        <h1>Loading...</h1>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return anime ? <AnimeDetails anime={memoizedAnimeDetails} reviews={reviews} /> : <div>No details available</div>;
};

export default AnimeDetailsPage;
