import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import http from "./services/http";
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
  const [moreInfo, setMoreInfo] = useState(null);
  const [loadingMoreInfo, setLoadingMoreInfo] = useState(true);
  const [errorMoreInfo, setErrorMoreInfo] = useState(null);
  const [galleryPictures, setGalleryPictures] = useState([]);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const cachedMangaDetails = sessionStorage.getItem(`mangaDetails_${id}`);
        if (cachedMangaDetails) {
          setManga(JSON.parse(cachedMangaDetails));
          setLoading(false);
        } else {
          const mangaResponse = await http.get(`https://api.jikan.moe/v4/manga/${id}`);
          setManga(mangaResponse.data.data);
          sessionStorage.setItem(`mangaDetails_${id}`, JSON.stringify(mangaResponse.data.data));
          setLoading(false);
        }

        const reviewsResponse = await http.get(`https://api.jikan.moe/v4/manga/${id}/reviews`);
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
        const cachedNewsData = sessionStorage.getItem(`mangaNews_${id}`);
        if (cachedNewsData) {
          setNews(JSON.parse(cachedNewsData));
          setLoadingNews(false);
        } else {
          const newsResponse = await http.get(`https://api.jikan.moe/v4/manga/${id}/news`);
          setNews(newsResponse.data.data);
          sessionStorage.setItem(`mangaNews_${id}`, JSON.stringify(newsResponse.data.data));
          setLoadingNews(false);
        }
      } catch (error) {
        setErrorNews(error.message);
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, [manga, id]);

  useEffect(() => {
    if (!manga) return;

    const fetchMoreInfo = async () => {
      try {
        const moreInfoResponse = await http.get(`https://api.jikan.moe/v4/manga/${id}/moreinfo`);
        setMoreInfo(moreInfoResponse.data.data.moreinfo);
        setLoadingMoreInfo(false);
      } catch (error) {
        setErrorMoreInfo(error.message);
        setLoadingMoreInfo(false);
      }
    };

    fetchMoreInfo();
  }, [manga, id]);

  useEffect(() => {
    const fetchGalleryPictures = async () => {
      try {
        const picturesResponse = await http.get(`https://api.jikan.moe/v4/manga/${id}/pictures`);
        setGalleryPictures(picturesResponse.data.data); // Update GalleryPictures state
      } catch (error) {
        console.error("Failed to fetch manga pictures:", error);
      }
    };

    fetchGalleryPictures();
  }, [id]);

  const memoizedMangaDetails = useMemo(() => manga, [manga]);

  if (loading || loadingMoreInfo)
    return (
      <div className="loading-icon">
        <h1>Loading...</h1>
      </div>
    );
  if (error || errorMoreInfo) return <div>Error: {error || errorMoreInfo}</div>;

  return manga ? (
    <MangaDetails
      manga={memoizedMangaDetails}
      reviews={reviews}
      recentNews={news}
      loadingNews={loadingNews}
      errorNews={errorNews}
      moreInfo={moreInfo}
      loadingMoreInfo={loadingMoreInfo}
      errorMoreInfo={errorMoreInfo}
      galleryPictures={galleryPictures}
    />
  ) : (
    <div>No details available</div>
  );
};

export default MangaDetailsPage;
