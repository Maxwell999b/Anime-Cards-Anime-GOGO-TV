import { useParams } from "react-router-dom";
import AnimeDetails from "./AnimeDetails";
import Loader from "./Loader";
import useFetchData from "./useFetchData";

const AnimeDetailsPage = () => {
  const { id } = useParams();
<<<<<<< HEAD
  const delayTime = 350; // delay time between requests

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

||||||| merged common ancestors
  const { data: anime, loading, error } = useFetchData(`https://api.jikan.moe/v4/anime/${id}`, `animeDetails_${id}`);
  const { data: reviews } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/reviews`, `animeReviews_${id}`);
=======
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
>>>>>>> d36af9a68be66ea23be539e963cfc1768147facc
  const {
    data: news,
    loading: loadingNews,
    error: errorNews,
<<<<<<< HEAD
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

||||||| merged common ancestors
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/news`, `animeNews_${id}`);
  const { data: episodes } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/episodes`, `animeEpisodes_${id}`);
  const { data: voiceActors } = useFetchData(
    `https://api.jikan.moe/v4/characters/${id}/voices`,
    `animeVoiceActors_${id}`
  );
  const { data: galleryPictures } = useFetchData(
    `https://api.jikan.moe/v4/anime/${id}/pictures`,
    `animeGalleryPictures_${id}`
  );
=======
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
>>>>>>> d36af9a68be66ea23be539e963cfc1768147facc
  const {
    data: characters,
    loading: loadingCharacters,
    error: errorCharacters,
<<<<<<< HEAD
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/characters`, `animeCharacters_${id}`, delayTime);

||||||| merged common ancestors
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/characters`, `animeCharacters_${id}`);
=======
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/characters`, `animeCharacters_${id}`, delayTime);
>>>>>>> d36af9a68be66ea23be539e963cfc1768147facc
  const {
    data: externalLinks,
    loading: loadingExternalLinks,
    error: errorExternalLinks,
<<<<<<< HEAD
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/external`, `animeExternalLinks_${id}`, delayTime);

||||||| merged common ancestors
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/external`, `animeExternalLinks_${id}`);
=======
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/external`, `animeExternalLinks_${id}`, delayTime);
>>>>>>> d36af9a68be66ea23be539e963cfc1768147facc
  const {
    data: staff,
    loading: loadingStaff,
    error: errorStaff,
<<<<<<< HEAD
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/staff`, `animeStaff_${id}`, delayTime);

||||||| merged common ancestors
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/staff`, `animeStaff_${id}`);
=======
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/staff`, `animeStaff_${id}`, delayTime);
>>>>>>> d36af9a68be66ea23be539e963cfc1768147facc
  const {
    data: moreInfo,
    loading: loadingMoreInfo,
    error: errorMoreInfo,
<<<<<<< HEAD
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/moreinfo`, `animeMoreInfo_${id}`, delayTime);

||||||| merged common ancestors
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/moreinfo`, `animeMoreInfo_${id}`);
=======
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/moreinfo`, `animeMoreInfo_${id}`, delayTime);
>>>>>>> d36af9a68be66ea23be539e963cfc1768147facc
  const {
    data: streaming,
    loading: loadingStreaming,
    error: errorStreaming,
<<<<<<< HEAD
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/streaming`, `animeStreaming_${id}`, delayTime);

||||||| merged common ancestors
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/streaming`, `animeStreaming_${id}`);
=======
  } = useFetchData(`https://api.jikan.moe/v4/anime/${id}/streaming`, `animeStreaming_${id}`, delayTime);
>>>>>>> d36af9a68be66ea23be539e963cfc1768147facc
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
