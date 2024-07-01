import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import http from "./services/http";
import AnimeDetails from "./AnimeDetails";
import Loader from "./Loader";

const AnimeDetailsPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [news, setNews] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [voiceActors, setVoiceActors] = useState([]);
  const [galleryPictures, setGalleryPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const cachedAnimeDetails = sessionStorage.getItem(`animeDetails_${id}`);
        if (cachedAnimeDetails) {
          setAnime(JSON.parse(cachedAnimeDetails));
        } else {
          const animeResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}`);
          setAnime(animeResponse.data.data);
          sessionStorage.setItem(`animeDetails_${id}`, JSON.stringify(animeResponse.data.data));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [id]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const cachedNewsData = sessionStorage.getItem(`news_${id}`);
        if (cachedNewsData) {
          setNews(JSON.parse(cachedNewsData));
        } else {
          const newsResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}/news`);
          setNews(newsResponse.data.data);
          sessionStorage.setItem(`news_${id}`, JSON.stringify(newsResponse.data.data));
        }
      } catch (error) {
        setErrorNews(error.message);
      } finally {
        setLoadingNews(false);
      }
    };

    if (anime) {
      fetchNews();
    }
  }, [anime, id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const episodesResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}/episodes`);
        setEpisodes(episodesResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      }
    };

    fetchEpisodes();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}/reviews`);
        setReviews(reviewsResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchVoiceActors = async () => {
      try {
        const voiceActorsResponse = await http.get(`https://api.jikan.moe/v4/characters/${id}/voices`);
        setVoiceActors(voiceActorsResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch voice actors:", error);
      }
    };

    fetchVoiceActors();
  }, [id]);

  useEffect(() => {
    const fetchGalleryPictures = async () => {
      try {
        const picturesResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}/pictures`);
        setGalleryPictures(picturesResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch anime pictures:", error);
      }
    };

    fetchGalleryPictures();
  }, [id]);

  const memoizedAnimeDetails = useMemo(() => anime, [anime]);

  if (loading) {
    return (
      <div className="loading-icon">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return anime ? (
    <AnimeDetails
      anime={memoizedAnimeDetails}
      reviews={reviews}
      recentNews={news}
      loadingNews={loadingNews}
      errorNews={errorNews}
      episodes={episodes}
      voiceActors={voiceActors}
      galleryPictures={galleryPictures}
    />
  ) : (
    <div>No details available</div>
  );
};

export default AnimeDetailsPage;
