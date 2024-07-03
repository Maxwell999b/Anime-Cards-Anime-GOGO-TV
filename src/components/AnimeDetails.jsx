import { useParams } from "react-router-dom";
import AnimeDetails from "./AnimeDetails";
import Loader from "./Loader";
import useFetchData from "./useFetchData";

const AnimeDetailsPage = () => {
  const { id } = useParams();
  const delayTime = 350; // delay time between requests

  const {
    data: anime,
    loading,
    error,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}`, `animeDetails_${id}`, delayTime);
  const { data: reviews } = useFetchData(
    `https://api.jikan.moe/v4/anime/${id}/reviews`,
    `animeReviews_${id}`,
    delayTime
  );
  const {
    data: news,
    loading: loadingNews,
    error: errorNews,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/news`, `animeNews_${id}`, delayTime);
  const { data: episodes } = useFetchData(
    `https://api.jikan.moe/v4/anime/${id}/episodes`,
    `animeEpisodes_${id}`,
    delayTime
  );
  const { data: voiceActors } = useFetchData(
    `https://api.jikan.moe/v4/characters/${id}/voices`,
    `animeVoiceActors_${id}`,
    delayTime
  );
  const { data: galleryPictures } = useFetchData(
    `https://api.jikan.moe/v4/anime/${id}/pictures`,
    `animeGalleryPictures_${id}`,
    delayTime
  );
  const {
    data: characters,
    loading: loadingCharacters,
    error: errorCharacters,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/characters`, `animeCharacters_${id}`, delayTime);
  const {
    data: externalLinks,
    loading: loadingExternalLinks,
    error: errorExternalLinks,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/external`, `animeExternalLinks_${id}`, delayTime);
  const {
    data: staff,
    loading: loadingStaff,
    error: errorStaff,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/staff`, `animeStaff_${id}`, delayTime);
  const {
    data: moreInfo,
    loading: loadingMoreInfo,
    error: errorMoreInfo,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/moreinfo`, `animeMoreInfo_${id}`, delayTime);
  const {
    data: streaming,
    loading: loadingStreaming,
    error: errorStreaming,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/streaming`, `animeStreaming_${id}`, delayTime);
  const {
    data: themes,
    loading: loadingThemes,
    error: errorThemes,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/themes`, `animeThemes_${id}`, delayTime);

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
      anime={anime}
      reviews={reviews}
      recentNews={news}
      loadingNews={loadingNews}
      errorNews={errorNews}
      episodes={episodes}
      voiceActors={voiceActors}
      galleryPictures={galleryPictures}
      characters={characters}
      externalLinks={externalLinks}
      loadingCharacters={loadingCharacters}
      errorCharacters={errorCharacters}
      staff={staff}
      loadingStaff={loadingStaff}
      errorStaff={errorStaff}
      moreInfo={moreInfo}
      loadingMoreInfo={loadingMoreInfo}
      errorMoreInfo={errorMoreInfo}
      streaming={streaming}
      loadingStreaming={loadingStreaming}
      errorStreaming={errorStreaming}
      themes={themes}
      loadingThemes={loadingThemes}
      errorThemes={errorThemes}
    />
  ) : (
    <div>No details available</div>
  );
};

export default AnimeDetailsPage;
