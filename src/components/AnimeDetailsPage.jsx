import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnimeDetails from "./AnimeDetails";
import "./Details.css";

const AnimeDetailsPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error, setError] = useState(null);
  const [errorNews, setErrorNews] = useState(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        // Check if anime details are already cached in sessionStorage
        const cachedAnimeDetails = sessionStorage.getItem(`animeDetails_${id}`);
        if (cachedAnimeDetails) {
          setAnime(JSON.parse(cachedAnimeDetails));
          setLoading(false);
        } else {
          const animeResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
          setAnime(animeResponse.data.data);
          sessionStorage.setItem(`animeDetails_${id}`, JSON.stringify(animeResponse.data.data)); // Cache the anime details
          setLoading(false);
        }

        // Fetch episodes data
        const episodesResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/episodes`);
        setEpisodes(episodesResponse.data.data);

        // Fetch reviews
        const reviewsResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/reviews`);
        setReviews(reviewsResponse.data.data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [id]);

  useEffect(() => {
    if (!anime) return;

    const fetchNews = async () => {
      try {
        // Check if news data is already cached in sessionStorage
        const cachedNewsData = sessionStorage.getItem(`news_${id}`);
        if (cachedNewsData) {
          setNews(JSON.parse(cachedNewsData));
          setLoadingNews(false);
        } else {
          const newsResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/news`);
          setNews(newsResponse.data.data);
          sessionStorage.setItem(`news_${id}`, JSON.stringify(newsResponse.data.data)); // Cache the news data
          setLoadingNews(false);
        }
      } catch (error) {
        setErrorNews(error.message);
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
      episodes={episodes}
    />
  ) : (
    <div>No details available</div>
  );
};

export default AnimeDetailsPage;
