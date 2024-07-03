import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnimeDetails from "./AnimeDetails";
import Loader from "./Loader";
import fetchAnimeDetails from "./fetchAnimeDetails";

const AnimeDetailsPage = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animeDetailsData = await fetchAnimeDetails(id);
        setData(animeDetailsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  if (!data) {
    return <div>No details available</div>;
  }

  return (
    <AnimeDetails
      anime={data.anime}
      reviews={data.reviews}
      recentNews={data.news}
      episodes={data.episodes}
      voiceActors={data.voiceActors}
      galleryPictures={data.galleryPictures}
      characters={data.characters}
      externalLinks={data.externalLinks}
      staff={data.staff}
      moreInfo={data.moreInfo}
      streaming={data.streaming}
      themes={data.themes}
    />
  );
};

export default AnimeDetailsPage;
