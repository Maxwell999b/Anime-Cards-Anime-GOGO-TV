import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MangaDetails from "./MangaDetails";
import "./Details.css";

const MangaDetailsPage = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
        setManga(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaData();
  }, [id]);

  if (loading)
    return (
      <div className="loading-icon">
        <h1>Loading...</h1>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return manga ? <MangaDetails manga={manga} /> : <div>No details available</div>;
};

export default MangaDetailsPage;
