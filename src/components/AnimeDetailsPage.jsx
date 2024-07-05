import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "./services/http";
import AnimeDetails from "./AnimeDetails";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

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
  const [moreInfo, setMoreInfo] = useState(null);
  const [streaming, setStreaming] = useState([]);
  const [themes, setThemes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [loadingExternalLinks, setLoadingExternalLinks] = useState(true);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [loadingMoreInfo, setLoadingMoreInfo] = useState(true);
  const [loadingStreaming, setLoadingStreaming] = useState(true);
  const [loadingThemes, setLoadingThemes] = useState(true);

  const [error, setError] = useState(null);
  const [errorNews, setErrorNews] = useState(null);
  const [errorCharacters, setErrorCharacters] = useState(null);
  const [errorExternalLinks, setErrorExternalLinks] = useState(null);
  const [errorStaff, setErrorStaff] = useState(null);
  const [errorMoreInfo, setErrorMoreInfo] = useState(null);
  const [errorStreaming, setErrorStreaming] = useState(null);
  const [errorThemes, setErrorThemes] = useState(null);

  const handleRefresh = () => {
    window.location.reload(); // Refresh the entire page
  };

  const fetchWithRetry = async (url, options = {}) => {
    let retryDelay = 500; // Initial delay in milliseconds
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await http.get(url, options);
        return response;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Exponential backoff
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          retryDelay *= 2; // Double the delay for the next attempt
        } else if (error.response && error.response.status === 404) {
          // Do nothing for 404, just exit
          return null;
        } else {
          throw error; // Rethrow for other errors
        }
      }
    }

    throw new Error("Request failed after maximum attempts");
  };

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const cachedAnimeDetails = sessionStorage.getItem(`animeDetails_${id}`);
        if (cachedAnimeDetails) {
          setAnime(JSON.parse(cachedAnimeDetails));
        } else {
          const animeResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}`);
          if (animeResponse) {
            setAnime(animeResponse.data.data);
            sessionStorage.setItem(`animeDetails_${id}`, JSON.stringify(animeResponse.data.data));
          }
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
          const newsResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/news`);
          if (newsResponse) {
            setNews(newsResponse.data.data);
            sessionStorage.setItem(`news_${id}`, JSON.stringify(newsResponse.data.data));
          }
        }
      } catch (error) {
        setErrorNews(error.message);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, [id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const cachedEpisodesData = sessionStorage.getItem(`episodes_${id}`);
        if (cachedEpisodesData) {
          setEpisodes(JSON.parse(cachedEpisodesData));
        } else {
          const episodesResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/episodes`);
          if (episodesResponse) {
            setEpisodes(episodesResponse.data.data);
            sessionStorage.setItem(`episodes_${id}`, JSON.stringify(episodesResponse.data.data));
          }
        }
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      }
    };

    fetchEpisodes();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const cachedReviewsData = sessionStorage.getItem(`reviews_${id}`);
        if (cachedReviewsData) {
          setReviews(JSON.parse(cachedReviewsData));
        } else {
          const reviewsResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/reviews`);
          if (reviewsResponse) {
            setReviews(reviewsResponse.data.data);
            sessionStorage.setItem(`reviews_${id}`, JSON.stringify(reviewsResponse.data.data));
          }
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchVoiceActors = async () => {
      try {
        const cachedVoiceActorsData = sessionStorage.getItem(`voiceActors_${id}`);
        if (cachedVoiceActorsData) {
          setVoiceActors(JSON.parse(cachedVoiceActorsData));
        } else {
          const voiceActorsResponse = await fetchWithRetry(`https://api.jikan.moe/v4/characters/${id}/voices`);
          if (voiceActorsResponse) {
            setVoiceActors(voiceActorsResponse.data.data);
            sessionStorage.setItem(`voiceActors_${id}`, JSON.stringify(voiceActorsResponse.data.data));
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Voice actors not found for this anime.");
        } else {
          console.error("Failed to fetch voice actors:", error);
          setError(error.message);
        }
      }
    };

    fetchVoiceActors();
  }, [id]);

  useEffect(() => {
    const fetchGalleryPictures = async () => {
      try {
        const cachedPictures = sessionStorage.getItem(`galleryPictures_${id}`);
        if (cachedPictures) {
          setGalleryPictures(JSON.parse(cachedPictures));
        } else {
          const picturesResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/pictures`);
          if (picturesResponse) {
            setGalleryPictures(picturesResponse.data.data);
            sessionStorage.setItem(`galleryPictures_${id}`, JSON.stringify(picturesResponse.data.data));
          }
        }
      } catch (error) {
        console.error("Failed to fetch anime pictures:", error);
      }
    };

    fetchGalleryPictures();
  }, [id]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const cachedCharacters = sessionStorage.getItem(`characters_${id}`);
        if (cachedCharacters) {
          setCharacters(JSON.parse(cachedCharacters));
        } else {
          const charactersResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/characters`);
          if (charactersResponse) {
            setCharacters(charactersResponse.data.data);
            sessionStorage.setItem(`characters_${id}`, JSON.stringify(charactersResponse.data.data));
          }
        }
      } catch (error) {
        setErrorCharacters(error.message);
      } finally {
        setLoadingCharacters(false);
      }
    };

    fetchCharacters();
  }, [id]);

  useEffect(() => {
    const fetchExternalLinks = async () => {
      try {
        const cachedExternalLinks = sessionStorage.getItem(`externalLinks_${id}`);
        if (cachedExternalLinks) {
          setExternalLinks(JSON.parse(cachedExternalLinks));
        } else {
          const externalLinksResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/external`);
          if (externalLinksResponse) {
            setExternalLinks(externalLinksResponse.data.data);
            sessionStorage.setItem(`externalLinks_${id}`, JSON.stringify(externalLinksResponse.data.data));
          }
        }
      } catch (error) {
        setErrorExternalLinks(error.message);
      } finally {
        setLoadingExternalLinks(false);
      }
    };

    fetchExternalLinks();
  }, [id]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const cachedStaff = sessionStorage.getItem(`staff_${id}`);
        if (cachedStaff) {
          setStaff(JSON.parse(cachedStaff));
        } else {
          const staffResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/staff`);
          if (staffResponse) {
            setStaff(staffResponse.data.data);
            sessionStorage.setItem(`staff_${id}`, JSON.stringify(staffResponse.data.data));
          }
        }
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
        const cachedMoreInfo = sessionStorage.getItem(`moreInfo_${id}`);
        if (cachedMoreInfo) {
          setMoreInfo(JSON.parse(cachedMoreInfo));
        } else {
          const moreInfoResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/moreinfo`);
          if (moreInfoResponse) {
            setMoreInfo(moreInfoResponse.data.data);
            sessionStorage.setItem(`moreInfo_${id}`, JSON.stringify(moreInfoResponse.data.data));
          }
        }
      } catch (error) {
        setErrorMoreInfo(error.message);
      } finally {
        setLoadingMoreInfo(false);
      }
    };

    fetchMoreInfo();
  }, [id]);

  useEffect(() => {
    const fetchStreaming = async () => {
      try {
        const cachedStreaming = sessionStorage.getItem(`streaming_${id}`);
        if (cachedStreaming) {
          setStreaming(JSON.parse(cachedStreaming));
        } else {
          const streamingResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/streaming`);
          if (streamingResponse) {
            setStreaming(streamingResponse.data.data);
            sessionStorage.setItem(`streaming_${id}`, JSON.stringify(streamingResponse.data.data));
          }
        }
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
        const cachedThemes = sessionStorage.getItem(`themes_${id}`);
        if (cachedThemes) {
          setThemes(JSON.parse(cachedThemes));
        } else {
          const themesResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/themes`);
          if (themesResponse) {
            setThemes(themesResponse.data.data);
            sessionStorage.setItem(`themes_${id}`, JSON.stringify(themesResponse.data.data));
          }
        }
      } catch (error) {
        setErrorThemes(error.message);
      } finally {
        setLoadingThemes(false);
      }
    };

    fetchThemes();
  }, [id]);

  useEffect(() => {
    // Manage session storage size
    const sessionSize = Object.keys(sessionStorage).length;
    const maxSize = 100; // Maximum session storage size

    if (sessionSize > maxSize) {
      const keysToRemove = Object.keys(sessionStorage)
        .filter(
          (key) =>
            key.startsWith("animeDetails_") ||
            key.startsWith("news_") ||
            key.startsWith("characters_") ||
            key.startsWith("externalLinks_") ||
            key.startsWith("staff_") ||
            key.startsWith("moreInfo_") ||
            key.startsWith("streaming_") ||
            key.startsWith("themes_")
        )
        .sort((a, b) => sessionStorage.getItem(a).timestamp - sessionStorage.getItem(b).timestamp);

      keysToRemove.forEach((key) => sessionStorage.removeItem(key));
    }
  }, []);

  if (
    loading ||
    loadingNews ||
    loadingCharacters ||
    loadingExternalLinks ||
    loadingStaff ||
    loadingMoreInfo ||
    loadingStreaming ||
    loadingThemes
  ) {
    return (
      <div className="loading-icon">
        <Loader />
      </div>
    );
  }

  if (
    error ||
    errorNews ||
    errorCharacters ||
    errorExternalLinks ||
    errorStaff ||
    errorMoreInfo ||
    errorStreaming ||
    errorThemes
  ) {
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
        {error && error.response && error.response.status === 429 ? <ErrorComponent onRefresh={handleRefresh} /> : null}
      </div>
    );
  }

  return anime ? (
    <AnimeDetails
      anime={anime}
      reviews={reviews}
      recentNews={news}
      episodes={episodes}
      voiceActors={voiceActors}
      galleryPictures={galleryPictures}
      characters={characters}
      externalLinks={externalLinks}
      staff={staff}
      moreInfo={moreInfo}
      streaming={streaming}
      themes={themes}
    />
  ) : null;
};

export default AnimeDetailsPage;
