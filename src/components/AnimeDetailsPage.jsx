import { useParams } from "react-router-dom";
import AnimeDetails from "./AnimeDetails";
import Loader from "./Loader";
import useFetchData from "./useFetchData";

const AnimeDetailsPage = () => {
  const { id } = useParams();
  const delayTime = 500;

  const {
    data: anime,
    loading: loadingAnime,
    error: errorAnime,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}`, `animeDetails_${id}`, delayTime);
  const {
    data: reviews,
    loading: loadingReviews,
    error: errorReviews,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/reviews`, `animeReviews_${id}`, delayTime);
  const {
    data: news,
    loading: loadingNews,
    error: errorNews,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/news`, `animeNews_${id}`, delayTime);
  const {
    data: episodes,
    loading: loadingEpisodes,
    error: errorEpisodes,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/episodes`, `animeEpisodes_${id}`, delayTime);
  const {
    data: voiceActors,
    loading: loadingVoiceActors,
    error: errorVoiceActors,
  } = useFetchData(`https://api.jikan.moe/v4/characters/${id}/voices`, `animeVoiceActors_${id}`, delayTime);
  const {
    data: galleryPictures,
    loading: loadingGalleryPictures,
    error: errorGalleryPictures,
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/pictures`, `animeGalleryPictures_${id}`, delayTime);
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

  const isLoading =
    loadingAnime ||
    loadingReviews ||
    loadingNews ||
    loadingEpisodes ||
    loadingVoiceActors ||
    loadingGalleryPictures ||
    loadingCharacters ||
    loadingExternalLinks ||
    loadingStaff ||
    loadingMoreInfo ||
    loadingStreaming ||
    loadingThemes;

  const isError =
    errorAnime ||
    errorReviews ||
    errorNews ||
    errorEpisodes ||
    errorVoiceActors ||
    errorGalleryPictures ||
    errorCharacters ||
    errorExternalLinks ||
    errorStaff ||
    errorMoreInfo ||
    errorStreaming ||
    errorThemes;

  if (isLoading) {
    return (
      <div className="loading-icon">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {isError}</div>;
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
  ) : (
    <div>No details available</div>
  );
};

export default AnimeDetailsPage;
