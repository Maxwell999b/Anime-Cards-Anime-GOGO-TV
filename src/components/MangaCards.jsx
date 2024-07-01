import { useState, useEffect } from "react";
import http from "./services/http";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Cards.css";
import Loader from "./Loader";

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
        // Check if manga data is already cached in sessionStorage
        const cachedMangaData = sessionStorage.getItem("mangaData");
        if (cachedMangaData) {
          setMangaList(JSON.parse(cachedMangaData));
          setLoading(false);
        } else {
          const response = await http.get("https://api.jikan.moe/v4/manga");
          const mangaData = response.data.data || [];
          setMangaList(mangaData);
          sessionStorage.setItem("mangaData", JSON.stringify(mangaData)); // Cache the manga data
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
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

  const getScoreClassName = (score) => {
    return score && score >= 8 ? "manga-card-top" : "";
  };

  const hasAwardWinningGenre = (genres) => {
    return genres.some((genre) => genre.name.toLowerCase().includes("award winning"));
  };

  if (loading)
    return (
      <div className="loading-icon">
        Loading
        <Loader />
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
            <div key={manga.mal_id} className={"card"} onClick={() => handleCardClick(manga)}>
              <div className="card-image-container">
                <img src={manga.images.webp.image_url} alt={manga.title} className="card-image" />
              </div>
              <div className="card-info">
                <h2 className="card-title">{manga.title}</h2>
                <p className="card-tags">
                  Type: <span className="card-tags-type">{manga.type}</span>
                </p>
                <p className="card-tags">
                  Score:{" "}
                  <span className={`card-tags-score ${getScoreClassName(manga.score)}`}>
                    {manga.score ? manga.score : "Unknown"}
                  </span>
                </p>
                <p className="card-tags">
                  Genres:{" "}
                  <span className="card-tags-genres">
                    {manga.genres.map((genre, index) => (
                      <span
                        key={genre.name}
                        className={
                          hasAwardWinningGenre(manga.genres) && genre.name.toLowerCase().includes("award winning")
                            ? "manga-genre-award"
                            : ""
                        }>
                        {genre.name}
                        {index !== manga.genres.length - 1 && ", "}
                      </span>
                    ))}
                  </span>
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
