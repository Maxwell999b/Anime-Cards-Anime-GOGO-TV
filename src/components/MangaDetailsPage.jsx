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
        // Check if manga details are already cached in sessionStorage
        const cachedMangaDetails = sessionStorage.getItem(`mangaDetails_${id}`);
        if (cachedMangaDetails) {
          setManga(JSON.parse(cachedMangaDetails));
          setLoading(false);
        } else {
          const mangaResponse = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
          setManga(mangaResponse.data.data);
          sessionStorage.setItem(`mangaDetails_${id}`, JSON.stringify(mangaResponse.data.data)); // Cache the manga details
          setLoading(false);
        }

        // Fetch reviews
        const reviewsResponse = await axios.get(`https://api.jikan.moe/v4/manga/${id}/reviews`);
        setReviews(reviewsResponse.data.data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMangaData();
  }, [id]);

  useEffect(() => {
    if (!manga) return;

    const fetchNews = async () => {
      try {
        // Check if news data is already cached in sessionStorage
        const cachedNewsData = sessionStorage.getItem(`mangaNews_${id}`);
        if (cachedNewsData) {
          setNews(JSON.parse(cachedNewsData));
          setLoadingNews(false);
        } else {
          const newsResponse = await axios.get(`https://api.jikan.moe/v4/manga/${id}/news`);
          setNews(newsResponse.data.data);
          sessionStorage.setItem(`mangaNews_${id}`, JSON.stringify(newsResponse.data.data)); // Cache the news data
          setLoadingNews(false);
        }
      } catch (error) {
        setErrorNews(error.message);
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
