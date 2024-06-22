import PropTypes from "prop-types";
import "./Details.css";

const AnimeDetails = ({ anime }) => {
  const scoreClassName = anime.score && anime.score >= 8 ? "anime-details-values-top" : "";
  const rankClassName = anime.rank && anime.rank <= 100 ? "anime-details-values-top" : "";

  return (
    <div className="anime-details">
      <h2 className="anime-title">{anime.title}</h2>
      <div className="details-container">
        <div className="left-side">
          <img src={anime.images.jpg.image_url} alt={anime.title} className="detail-image" />
        </div>
        <div className="right-side">
          <p>
            <span className="anime-details-ids">Type:</span>
            <span className="anime-details-values">
              {anime.type ? anime.type : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Source:</span>
            <span className="anime-details-values">
              {anime.source ? anime.source : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Score:</span>
            <span className={`anime-details-values ${scoreClassName}`}>
              {anime.score ? anime.score : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Rank:</span>
            <span className={`anime-details-values ${rankClassName}`}>
              {anime.rank ? anime.rank : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Episodes:</span>
            <span className="anime-details-values">
              {anime.episodes ? anime.episodes : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Genres:</span>
            <span className="anime-details-values">
              {anime.genres && anime.genres.length > 0 ? (
                anime.genres.map((genre) => genre.name).join(", ")
              ) : (
                <span className="unknown-details">unknown</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Producers:</span>
            <span className="anime-details-values">
              {anime.producers && anime.producers.length > 0 ? (
                anime.producers[0].name
              ) : (
                <span className="unknown-details">unknown</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Studios:</span>
            <span className="anime-details-values">
              {anime.studios && anime.studios.length > 0 ? (
                anime.studios[0].name
              ) : (
                <span className="unknown-details">unknown</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Year:</span>
            <span className="anime-details-values">
              {anime.year ? anime.year : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Synopsis:</span>
            <span className="anime-details-values">
              {anime.synopsis ? anime.synopsis : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Background:</span>
            <span className="anime-details-values">
              {anime.background ? anime.background : <span className="unknown-details">unknown</span>}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

AnimeDetails.propTypes = {
  anime: PropTypes.object.isRequired,
};

export default AnimeDetails;
