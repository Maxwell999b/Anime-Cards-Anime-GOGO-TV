import { useState, useEffect } from "react";
import axios from "axios";

const AnimeCards = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const cardsPerPage = 10;

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/anime/1/full");
        const animeData = response.data.data; // Extracting anime data from the response

        setAnimeList([animeData]); // Storing the anime data in state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAnimeList = animeList.filter((anime) => anime.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAnimeList = filteredAnimeList.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input type="text" placeholder="Search by title..." value={searchTerm} onChange={handleSearchChange} />
      <div className="cards-grid">
        {currentAnimeList.map((anime) => (
          <div key={anime.mal_id} className="card">
            <img src={anime.images.large_image_url} alt={anime.title} />
            <h2>{anime.title}</h2>
            <p>Type: {anime.type}</p>
            <p>Score: {anime.score}</p>
            <p>Genres: {anime.genres.map((genre) => genre.name).join(", ")}</p>
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

export default AnimeCards;
