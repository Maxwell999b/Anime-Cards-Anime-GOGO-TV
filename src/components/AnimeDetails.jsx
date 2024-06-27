import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Details.css";
import Reviews from "./Reviews";
import News from "./News";
import Videos from "./Videos";
import VoiceActors from "./VoiceActors";

const AnimeDetails = ({ anime, reviews, recentNews, loadingNews, errorNews, episodes, voiceActors }) => {
  const scoreClassName = anime.score && anime.score >= 8 ? "anime-details-values-top" : "";
  const scoreClassNameBy = anime.scored_by && anime.scored_by >= 100000 ? "anime-details-values-top" : "";
  const rankClassName = anime.rank && anime.rank <= 100 ? "anime-details-values-top" : "";
  const handleRefresh = () => {
    window.location.reload();
  };

  const uniqueNews = recentNews.filter(
    (item, index, self) => index === self.findIndex((t) => t.mal_id === item.mal_id)
  );

  return (
    <div className="anime-details">
      <div className="title-row">
        <h1 className="anime-title">{anime.title}</h1>
      </div>
      <div className="details-container">
        <div className="left-side">
          <img src={anime.images.webp.large_image_url} alt={anime.title} className="detail-image" />
          <h3 className="sub-heading-left-side">Alternative Titles</h3>
          {/* Alternative Titles Content */}
          <p>
            <span className="anime-details-ids">Synonyms:</span>
            <span className="anime-details-values">
              {anime.title_synonyms && anime.title_synonyms.length > 0 ? (
                anime.title_synonyms.join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Japanese:</span>
            <span className="anime-details-values">
              {anime.title_japanese ? anime.title_japanese : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <h6 className="sub-heading-left-side">Information</h6>
          {/* Information Content */}
          <p>
            <span className="anime-details-ids">Type:</span>
            <span className="anime-details-values">
              {anime.type ? anime.type : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Year:</span>
            <span className="anime-details-values">
              {anime.year ? anime.year : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Season:</span>
            <span className="anime-details-values">
              {anime.season ? anime.season : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Episodes:</span>
            <span className="anime-details-values">
              {anime.episodes ? anime.episodes : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Status:</span>
            <span className="anime-details-values">
              {anime.status ? anime.status : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Aired:</span>
            <span className="anime-details-values">
              {anime.aired ? anime.aired.string : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Premiered:</span>
            <span className="anime-details-values">
              {anime.premiered ? anime.premiered : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Broadcast:</span>
            <span className="anime-details-values">
              {anime.broadcast ? anime.broadcast.string : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Producers:</span>
            <span className="anime-details-values">
              {anime.producers && anime.producers.length > 0 ? (
                anime.producers.map((producer) => producer.name).join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Licensors:</span>
            <span className="anime-details-values">
              {anime.licensors && anime.licensors.length > 0 ? (
                anime.licensors.map((licensor) => licensor.name).join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Studios:</span>
            <span className="anime-details-values">
              {anime.studios && anime.studios.length > 0 ? (
                anime.studios.map((studio) => studio.name).join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Source:</span>
            <span className="anime-details-values">
              {anime.source ? anime.source : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Genres:</span>
            <span className="anime-details-values">
              {anime.genres && anime.genres.length > 0 ? (
                anime.genres.map((genre) => genre.name).join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Themes:</span>
            <span className="anime-details-values">
              {anime.themes && anime.themes.length > 0 ? (
                anime.themes.map((theme) => theme.name).join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Demographic:</span>
            <span className="anime-details-values">
              {anime.demographics && anime.demographics.length > 0 ? (
                anime.demographics.map((demographic) => demographic.name).join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Duration:</span>
            <span className="anime-details-values">
              {anime.duration ? anime.duration : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Rating:</span>
            <span className="anime-details-values">
              {anime.rating ? anime.rating : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <h3 className="sub-heading-left-side">Statistics</h3>
          <p>
            <span className="anime-details-ids">Score:</span>
            <span className={`anime-details-values ${scoreClassName}`}>
              {anime.score ? anime.score : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Scored_by:</span>
            <span className={`anime-details-values ${scoreClassNameBy}`}>
              {anime.scored_by ? anime.scored_by : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Ranked:</span>
            <span className={`anime-details-values ${rankClassName}`}>
              {anime.rank ? anime.rank : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Popularity:</span>
            <span className="anime-details-values">
              #{anime.popularity ? anime.popularity : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Members:</span>
            <span className="anime-details-values">
              {anime.members ? (
                anime.members.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="anime-details-ids">Favorites:</span>
            <span className="anime-details-values">
              {anime.favorites ? (
                anime.favorites.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
        </div>
        <div className="right-side">
          <p className="breadcrumb-link-div">
            <Link to="/" className="breadcrumb-link">
              Anime
            </Link>{" "}
            -&gt;{" "}
            <Link to={`/anime/${anime.mal_id}`} className="breadcrumb-current" onClick={handleRefresh}>
              {anime.title}
            </Link>
          </p>
          <span className="synopsis-background-gap">
            <p>
              <span className="anime-details-ids">Synopsis:</span>
              <span className="anime-details-values">
                {anime.synopsis ? anime.synopsis : <span className="unknown-details">N/A</span>}
              </span>
            </p>
            <p>
              <span className="anime-details-ids">Background:</span>
              <span className="anime-details-values">
                {anime.background ? anime.background : <span className="unknown-details">N/A</span>}
              </span>
            </p>
          </span>
          <h3 className="sub-heading-right-side">Videos</h3>
          <Videos episodes={episodes} />
          <h3 className="sub-heading-right-side">Characters & Voice Actors</h3>
          <VoiceActors voiceActors={voiceActors} />
          <h3 className="sub-heading-right-side">Staff</h3>
          <div className="empty-section">{/* Staff Section */}</div>
          <h3 className="sub-heading-right-side">Reviews</h3>
          <Reviews reviews={reviews} />
          <h3 className="sub-heading-right-side">Recent News</h3>
          {loadingNews ? (
            <div className="loading-icon">
              <h1>Loading News...</h1>
            </div>
          ) : errorNews ? (
            <div>Error: {errorNews}</div>
          ) : (
            <News newsItems={uniqueNews} />
          )}
        </div>
      </div>
    </div>
  );
};

AnimeDetails.propTypes = {
  anime: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  recentNews: PropTypes.array.isRequired,
  loadingNews: PropTypes.bool.isRequired,
  errorNews: PropTypes.string,
  episodes: PropTypes.array.isRequired,
  voiceActors: PropTypes.array.isRequired,
};

export default AnimeDetails;
