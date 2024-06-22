import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Cards.css";

const AnimeCards = ({ searchTerm }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/anime");
        const animeData = response.data.data || [];

        setAnimeList(animeData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, []);

  const filteredAnimeList = animeList.filter((anime) => anime.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAnimeList = filteredAnimeList.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCardClick = (anime) => {
    navigate(`/anime/${anime.mal_id}`);
  };

  const getScoreClassName = (score) => {
    return score && score >= 8 ? "anime-card-top" : "";
  };

  const hasAwardWinningGenre = (genres) => {
    return genres.some((genre) => genre.name.toLowerCase().includes("award winning"));
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
      {filteredAnimeList.length === 0 ? (
        <div className="no-matches">No matches found</div>
      ) : (
        <div className="cards-grid">
          {currentAnimeList.map((anime) => (
            <div key={anime.mal_id} className="card" onClick={() => handleCardClick(anime)}>
              <div className="card-image-container">
                <img src={anime.images.jpg.image_url} alt={anime.title} className="card-image" />
              </div>
              <div className="card-info">
                <h2 className="card-title">{anime.title}</h2>
                <p className="card-tags">
                  Type: <span className="card-tags-type">{anime.type}</span>
                </p>
                <p className="card-tags">
                  Score:{" "}
                  <span className={`card-tags-score ${getScoreClassName(anime.score)}`}>
                    {anime.score ? anime.score : "Unknown"}
                  </span>
                </p>
                <p className="card-tags">
                  Genres:{" "}
                  <span className="card-tags-genres">
                    {anime.genres.map((genre, index) => (
                      <span
                        key={genre.name}
                        className={`${
                          hasAwardWinningGenre(anime.genres) && genre.name.toLowerCase().includes("award winning")
                            ? "anime-genre-award"
                            : ""
                        }`}>
                        {genre.name}
                        {index !== anime.genres.length - 1 && ", "}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredAnimeList.length > 0 && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredAnimeList.length / cardsPerPage) }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

AnimeCards.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default AnimeCards;
