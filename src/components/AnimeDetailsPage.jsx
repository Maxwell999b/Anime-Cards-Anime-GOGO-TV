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
  const [characters, setCharacters] = useState([]);
  const [externalLinks, setExternalLinks] = useState(null);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState(null);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [errorCharacters, setErrorCharacters] = useState(null);
  const [loadingExternalLinks, setLoadingExternalLinks] = useState(true);
  const [errorExternalLinks, setErrorExternalLinks] = useState(null);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [errorStaff, setErrorStaff] = useState(null);
  const [moreInfo, setMoreInfo] = useState(null);
  const [loadingMoreInfo, setLoadingMoreInfo] = useState(true);
  const [errorMoreInfo, setErrorMoreInfo] = useState(null);
  const [streaming, setStreaming] = useState([]);
  const [themes, setThemes] = useState([]);
  const [loadingStreaming, setLoadingStreaming] = useState(true);
  const [errorStreaming, setErrorStreaming] = useState(null);
  const [loadingThemes, setLoadingThemes] = useState(true);
  const [errorThemes, setErrorThemes] = useState(null);

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

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const charactersResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
        setCharacters(charactersResponse.data.data);
        setLoadingCharacters(false);
      } catch (error) {
        setErrorCharacters(error.message);
        setLoadingCharacters(false);
      }
    };

    fetchCharacters();
  }, [id]);

  useEffect(() => {
    const fetchExternalLinks = async () => {
      try {
        const externalLinksResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}/external`);
        setExternalLinks(externalLinksResponse.data.data);
        setLoadingExternalLinks(false);
      } catch (error) {
        setErrorExternalLinks(error.message);
        setLoadingExternalLinks(false);
      }
    };

    fetchExternalLinks();
  }, [id]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staffResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}/staff`);
        setStaff(staffResponse.data.data);
      } catch (error) {
        setErrorStaff(error.message);
      } finally {
        setLoadingStaff(false);
      }
    };

    fetchStaff();
  }, [id]);

  useEffect(() => {
    const fetchMoreInfo = async () => {
      try {
        const moreInfoResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}/moreinfo`);
        setMoreInfo(moreInfoResponse.data.data.moreinfo);
        setLoadingMoreInfo(false);
      } catch (error) {
        setErrorMoreInfo(error.message);
        setLoadingMoreInfo(false);
      }
    };

    fetchMoreInfo();
  }, [id]);

  useEffect(() => {
    const fetchStreaming = async () => {
      try {
        const streamingResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}/streaming`);
        setStreaming(streamingResponse.data.data);
      } catch (error) {
        setErrorStreaming(error.message);
      } finally {
        setLoadingStreaming(false);
      }
    };

    fetchStreaming();
  }, [id]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const themesResponse = await http.get(`https://api.jikan.moe/v4/anime/${id}/themes`);
        setThemes(themesResponse.data.data);
      } catch (error) {
        setErrorThemes(error.message);
      } finally {
        setLoadingThemes(false);
      }
    };

    fetchThemes();
  }, [id]);

  const memoizedAnimeDetails = useMemo(() => anime, [anime]);

  if (
    loading ||
    loadingNews ||
    loadingCharacters ||
    loadingExternalLinks ||
    loadingStaff ||
    loadingMoreInfo ||
    loadingStreaming ||
    loadingThemes
  )
    return (
      <div className="loading-icon">
        <Loader />
      </div>
    );

  if (
    error ||
    errorNews ||
    errorCharacters ||
    errorExternalLinks ||
    errorStaff ||
    errorMoreInfo ||
    errorStreaming ||
    errorThemes
  )
    return (
      <div>
        Error:{" "}
        {error ||
          errorNews ||
          errorCharacters ||
          errorExternalLinks ||
          errorStaff ||
          errorMoreInfo ||
          errorStreaming ||
          errorThemes}
      </div>
    );

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
      characters={characters}
      externalLinks={externalLinks}
      staff={staff}
      loadingStaff={loadingStaff}
      errorStaff={errorStaff}
      moreInfo={moreInfo}
      loadingMoreInfo={loadingMoreInfo}
      errorMoreInfo={errorMoreInfo}
      streaming={streaming}
      themes={themes}
    />
  ) : (
    <div>No details available</div>
  );
};

export default AnimeDetailsPage;
