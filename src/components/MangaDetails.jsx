import PropTypes from "prop-types";
import "./Details.css";

const MangaDetails = ({ manga }) => {
  const scoreClassName = manga.score && manga.score >= 8 ? "manga-details-values-top" : "";
  const rankClassName = manga.rank && manga.rank <= 100 ? "manga-details-values-top" : "";

  return (
    <div className="manga-details">
      <h2 className="manga-title">{manga.title}</h2>
      <div className="details-container">
        <div className="left-side">
          <img src={manga.images.jpg.image_url} alt={manga.title} className="detail-image" />
        </div>
        <div className="right-side">
          <p>
            <span className="manga-details-ids">Type:</span>
            <span className="manga-details-values">
              {manga.type ? manga.type : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Source:</span>
            <span className="manga-details-values">
              {manga.source ? manga.source : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Score:</span>
            <span className={`manga-details-values ${scoreClassName}`}>
              {manga.score ? manga.score : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Rank:</span>
            <span className={`manga-details-values ${rankClassName}`}>
              {manga.rank ? manga.rank : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Episodes:</span>
            <span className="manga-details-values">
              {manga.episodes ? manga.episodes : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Genres:</span>
            <span className="manga-details-values">
              {manga.genres && manga.genres.length > 0 ? (
                manga.genres.map((genre) => genre.name).join(", ")
              ) : (
                <span className="unknown-details">unknown</span>
              )}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Producers:</span>
            <span className="manga-details-values">
              {manga.producers && manga.producers.length > 0 ? (
                manga.producers[0].name
              ) : (
                <span className="unknown-details">unknown</span>
              )}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Studios:</span>
            <span className="manga-details-values">
              {manga.studios && manga.studios.length > 0 ? (
                manga.studios[0].name
              ) : (
                <span className="unknown-details">unknown</span>
              )}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Year:</span>
            <span className="manga-details-values">
              {manga.year ? manga.year : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Synopsis:</span>
            <span className="manga-details-values">
              {manga.synopsis ? manga.synopsis : <span className="unknown-details">unknown</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Background:</span>
            <span className="manga-details-values">
              {manga.background ? manga.background : <span className="unknown-details">unknown</span>}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

MangaDetails.propTypes = {
  manga: PropTypes.object.isRequired,
};

export default MangaDetails;
