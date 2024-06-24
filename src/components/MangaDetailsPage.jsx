import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MangaDetails from "./MangaDetails";
import "./Details.css";

const MangaDetailsPage = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
        setManga(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaData();
  }, [id]);

  useEffect(() => {
    if (!manga) return;

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get(`https://api.jikan.moe/v4/manga/${id}/reviews`);
        setReviews(reviewsResponse.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReviews();
  }, [manga, id]);

  const memoizedMangaDetails = useMemo(() => manga, [manga]);

  if (loading)
    return (
      <div className="loading-icon">
        <h1>Loading...</h1>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return manga ? <MangaDetails manga={memoizedMangaDetails} reviews={reviews} /> : <div>No details available</div>;
};

export default MangaDetailsPage;
