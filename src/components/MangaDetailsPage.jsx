import { useParams } from "react-router-dom";
import MangaDetails from "./MangaDetails";
import Loader from "./Loader";
import useFetchData from "./useFetchData";
import "./Details.css";

const MangaDetailsPage = () => {
  const { id } = useParams();
  const { data: manga, loading, error } = useFetchData(`https://api.jikan.moe/v4/manga/${id}`, `mangaDetails_${id}`);
  const { data: reviews } = useFetchData(`https://api.jikan.moe/v4/manga/${id}/reviews`, `mangaReviews_${id}`);
  const {
    data: news,
    loading: loadingNews,
    error: errorNews,
  } = useFetchData(`https://api.jikan.moe/v4/manga/${id}/news`, `mangaNews_${id}`);
  const {
    data: moreInfoData,
    loading: loadingMoreInfo,
    error: errorMoreInfo,
  } = useFetchData(`https://api.jikan.moe/v4/manga/${id}/moreinfo`, `mangaMoreInfo_${id}`);
  const { data: galleryPictures } = useFetchData(
    `https://api.jikan.moe/v4/manga/${id}/pictures`,
    `mangaGalleryPictures_${id}`
  );
  const {
    data: externalLinks,
    loading: loadingExternalLinks,
    error: errorExternalLinks,
  } = useFetchData(`https://api.jikan.moe/v4/manga/${id}/external`, `mangaExternalLinks_${id}`);
  const {
    data: characters,
    loading: loadingCharacters,
    error: errorCharacters,
  } = useFetchData(`https://api.jikan.moe/v4/manga/${id}/characters`, `mangaCharacters_${id}`);

  const moreInfo = moreInfoData?.moreinfo ? moreInfoData.moreinfo : "No additional information available.";

  if (loading || loadingNews || loadingMoreInfo || loadingExternalLinks || loadingCharacters)
    return (
      <div className="loading-icon">
        <Loader />
      </div>
    );

  if (error || errorNews || errorMoreInfo || errorExternalLinks || errorCharacters)
    return <div>Error: {error || errorNews || errorMoreInfo || errorExternalLinks || errorCharacters}</div>;

  return manga ? (
    <MangaDetails
      manga={manga}
      reviews={reviews}
      recentNews={news}
      loadingNews={loadingNews}
      errorNews={errorNews}
      moreInfo={moreInfo}
      loadingMoreInfo={loadingMoreInfo}
      errorMoreInfo={errorMoreInfo}
      galleryPictures={galleryPictures}
      externalLinks={externalLinks}
      loadingExternalLinks={loadingExternalLinks}
      errorExternalLinks={errorExternalLinks}
      characters={characters}
      loadingCharacters={loadingCharacters}
      errorCharacters={errorCharacters}
    />
  ) : (
    <div>No details available</div>
  );
};

export default MangaDetailsPage;
