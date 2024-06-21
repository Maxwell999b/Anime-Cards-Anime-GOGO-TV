import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes
import "./Cards.css";

const AnimeCards = ({ searchTerm }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/anime");
        const animeData = response.data.data || []; // Extract anime data from the response

        setAnimeList(animeData); // Storing the anime data in state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, []);

  // Apply search filter
  const filteredAnimeList = animeList.filter((anime) => anime.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // Calculate pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAnimeList = filteredAnimeList.slice(indexOfFirstCard, indexOfLastCard);

  // Handle page click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <div style={{ textAlign: "center", fontWeight: "bold", color: "Green" }}>
        <h1>Loading...</h1>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="cards-grid">
        {currentAnimeList.map((anime) => (
          <div key={anime.mal_id} className="card">
            <div className="card-image-container">
              <img src={anime.images.jpg.image_url} alt={anime.title} className="card-image" />
            </div>
            <div className="card-info">
              <h2 className="card-title">{anime.title}</h2>
              <p className="card-tags">
                Type: <span className="card-tags-type">{anime.type}</span>
              </p>
              <p className="card-tags">
                Score: <span className="card-tags-score">{anime.score}</span>
              </p>
              <p className="card-tags">
                Genres: <span className="card-tags-genres">{anime.genres.map((genre) => genre.name).join(", ")}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredAnimeList.length / cardsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

AnimeCards.propTypes = {
  searchTerm: PropTypes.string.isRequired, // Validate searchTerm prop
};

export default AnimeCards;
