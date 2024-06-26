import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MangaDetails from "./MangaDetails";
import "./Details.css";

const MangaDetailsPage = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error, setError] = useState(null);
  const [errorNews, setErrorNews] = useState(null);

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
  // Fetch news data
  useEffect(() => {
    if (!manga) return;

    const fetchNews = async () => {
      try {
        const newsResponse = await axios.get(`https://api.jikan.moe/v4/manga/${id}/news`);
        setNews(newsResponse.data.data);
      } catch (error) {
        setErrorNews(error.message);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, [manga, id]);
  const memoizedMangaDetails = useMemo(() => manga, [manga]);

  if (loading)
    return (
      <div className="loading-icon">
        <h1>Loading...</h1>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return manga ? (
    <MangaDetails
      manga={memoizedMangaDetails}
      reviews={reviews}
      recentNews={news}
      loadingNews={loadingNews}
      errorNews={errorNews}
    />
  ) : (
    <div>No details available</div>
  );
};

export default MangaDetailsPage;
