import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnimeDetails from "./AnimeDetails";
import "./Details.css";

const AnimeDetailsPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [news, setNews] = useState([]); // State to store news
  const [loading, setLoading] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true); // Loading state for news
  const [error, setError] = useState(null);
  const [errorNews, setErrorNews] = useState(null); // Error state for news

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
    if (!anime) return;

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

  // Fetch news data
  useEffect(() => {
    if (!anime) return;

    const fetchNews = async () => {
      try {
        const newsResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/news`);
        setNews(newsResponse.data.data);
      } catch (error) {
        setErrorNews(error.message);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, [anime, id]);

  const memoizedAnimeDetails = useMemo(() => anime, [anime]);

  if (loading)
    return (
      <div className="loading-icon">
        <h1>Loading...</h1>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return anime ? (
    <AnimeDetails
      anime={memoizedAnimeDetails}
      reviews={reviews}
      recentNews={news}
      loadingNews={loadingNews}
      errorNews={errorNews}
    />
  ) : (
    <div>No details available</div>
  );
};

export default AnimeDetailsPage;
