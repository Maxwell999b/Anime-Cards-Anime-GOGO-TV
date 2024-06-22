import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Cards.css";

const MangaCards = ({ searchTerm }) => {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/manga");
        const mangaData = response.data.data || [];

        setMangaList(mangaData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaData();
  }, []);

  const filteredMangaList = mangaList.filter((manga) => manga.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentMangaList = filteredMangaList.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCardClick = (manga) => {
    navigate(`/manga/${manga.mal_id}`);
  };

  if (loading)
    return (
      <div className="loading-icon">
        <h1>Loading...</h1>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="cards-container">
      {filteredMangaList.length === 0 ? (
        <div className="no-matches">No matches found</div>
      ) : (
        <div className="cards-grid">
          {currentMangaList.map((manga) => (
            <div key={manga.mal_id} className="card" onClick={() => handleCardClick(manga)}>
              <div className="card-image-container">
                <img src={manga.images.jpg.image_url} alt={manga.title} className="card-image" />
              </div>
              <div className="card-info">
                <h2 className="card-title">{manga.title}</h2>
                <p className="card-tags">
                  Type: <span className="card-tags-type">{manga.type}</span>
                </p>
                <p className="card-tags">
                  Score: <span className="card-tags-score">{manga.score}</span>
                </p>
                <p className="card-tags">
                  Genres: <span className="card-tags-genres">{manga.genres.map((genre) => genre.name).join(", ")}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredMangaList.length > 0 && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredMangaList.length / cardsPerPage) }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

MangaCards.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default MangaCards;
