import { useEffect, useState } from "react";
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
        const reviewsResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/reviews`);
        setAnime(animeResponse.data.data);
        setReviews(reviewsResponse.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [id]);

  if (loading)
    return (
      <div className="loading-icon">
        <h1>Loading...</h1>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return anime ? <AnimeDetails anime={anime} reviews={reviews} /> : <div>No details available</div>;
};

export default AnimeDetailsPage;
