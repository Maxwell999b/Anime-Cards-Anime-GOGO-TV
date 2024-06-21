import { useState, useEffect } from "react";
import "./Cards.css";

const Cards = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const imageIds = [
          940, 1521, 363, 234, 3132, 1288, 2357, 3567, 3604, 3263, 77, 992, 1490, 2173, 2007, 71, 653, 3521, 1683, 2384,
          849, 1759, 1824, 1336, 3049, 1570, 1487, 2101, 2087, 420, 1015, 437, 2386, 1005, 467,
        ];
        const requests = imageIds.map((imageId) => fetch(`https://api.nekosapi.com/v3/images/${imageId}`));
        const responses = await Promise.all(requests);
        const dataArray = await Promise.all(responses.map((response) => response.json()));

        const charactersData = dataArray
          .map((data) => {
            const character = data.characters && data.characters[0];
            return {
              id: data.id || 0,
              name: character?.name || "Unknown", // Extract character name
              description: character?.description || "No description available", // Extract character description
              image_url: data.image_url || "",
              tags: data.tags || [],
            };
          })
          .filter((character) => !!character.image_url && !character.tags.some((tag) => tag.name === "Exposed")); // Filter out cards without image_url and those with "Exposed" tag

        setCharacters(charactersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = characters.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="cards-grid">
        {currentCards.map((character, index) => (
          <div key={index} className="card">
            <div className="card-image-container">
              <img
                src={character.image_url}
                alt={character.name}
                className={character.tags.some((tag) => tag.name === "Exposed") ? "card-image blurred" : "card-image"}
              />
              {character.tags.some((tag) => tag.name === "Exposed") && <div className="blur-overlay">+18</div>}
            </div>
            <div className="card-info">
              <h2 className="card-title">{character.name}</h2>
              <p className="card-description">{character.description}</p>
              <p className="card-tags">
                Tags:
                {character.tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    {tag.name}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(characters.length / cardsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cards;
