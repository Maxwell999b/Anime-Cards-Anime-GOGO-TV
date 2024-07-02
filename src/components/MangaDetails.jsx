import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Details.css";
import Reviews from "./Reviews";
import News from "./News";
import GalleryPictures from "./GalleryPictures";
import CharactersTable from "./CharactersTable";
import Loader from "./Loader";

const MangaDetails = ({
  manga,
  reviews,
  recentNews,
  loadingNews,
  errorNews,
  moreInfo,
  loadingMoreInfo,
  errorMoreInfo,
  galleryPictures,
  externalLinks,
  loadingExternalLinks,
  errorExternalLinks,
  characters,
  loadingCharacters,
  errorCharacters,
}) => {
  const scoreClassName = manga.score && manga.score >= 8 ? "manga-details-values-top" : "";
  const scoreClassNameBy = manga.scored_by && manga.scored_by >= 100000 ? "manga-details-values-top" : "";
  const rankClassName = manga.rank && manga.rank <= 100 ? "manga-details-values-top" : "";
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="manga-details">
      <div className="title-row">
        <h1 className="manga-title">{manga.title}</h1>
      </div>
      <div className="details-container">
        <div className="left-side">
          <img src={manga.images.webp.image_url} alt={manga.title} className="detail-image" />
          <h3 className="sub-heading-left-side">Alternative Titles</h3>
          {/* Alternative Titles Content */}
          <p>
            <span className="manga-details-ids">Synonyms:</span>
            <span className="manga-details-values">
              {manga.title_synonyms && manga.title_synonyms.length > 0 ? (
                manga.title_synonyms.join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Japanese:</span>
            <span className="manga-details-values">
              {manga.title_japanese ? manga.title_japanese : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <h6 className="sub-heading-left-side">Information</h6>
          {/* Information Content */}
          <p>
            <span className="manga-details-ids">Type:</span>
            <span className="manga-details-values">
              {manga.type ? manga.type : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Year:</span>
            <span className="manga-details-values">
              {manga.published.string ? manga.published.string : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Chapters:</span>
            <span className="manga-details-values">
              {manga.chapters ? manga.chapters : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Volumes:</span>
            <span className="manga-details-values">
              {manga.volumes ? manga.volumes : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Status:</span>
            <span className="manga-details-values">
              {manga.status ? manga.status : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">authors:</span>
            <span className="manga-details-values">
              {manga.authors ? manga.authors[0].name : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">serializations:</span>
            <span className="manga-details-values">
              {manga.serializations ? manga.serializations[0].name : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Genres:</span>
            <span className="manga-details-values">
              {manga.genres && manga.genres.length > 0 ? (
                manga.genres.map((genre) => genre.name).join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Themes:</span>
            <span className="manga-details-values">
              {manga.themes && manga.themes.length > 0 ? (
                manga.themes.map((theme) => theme.name).join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Demographic:</span>
            <span className="manga-details-values">
              {manga.demographics && manga.demographics.length > 0 ? (
                manga.demographics.map((demographic) => demographic.name).join(", ")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <h3 className="sub-heading-left-side">Statistics</h3>
          <p>
            <span className="manga-details-ids">Score:</span>
            <span className={`manga-details-values ${scoreClassName}`}>
              {manga.score ? manga.score : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Scored_by:</span>
            <span className={`manga-details-values ${scoreClassNameBy}`}>
              {manga.scored_by ? manga.scored_by : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Ranked:</span>
            <span className={`manga-details-values ${rankClassName}`}>
              {manga.rank ? manga.rank : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Popularity:</span>
            <span className="manga-details-values">
              #{manga.popularity ? manga.popularity : <span className="unknown-details">N/A</span>}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Members:</span>
            <span className="manga-details-values">
              {manga.members ? (
                manga.members.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
          <p>
            <span className="manga-details-ids">Favorites:</span>
            <span className="manga-details-values">
              {manga.favorites ? (
                manga.favorites.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              ) : (
                <span className="unknown-details">N/A</span>
              )}
            </span>
          </p>
        </div>
        <div className="right-side">
          <p className="breadcrumb-link-div">
            <Link to="/manga" className="breadcrumb-link">
              manga
            </Link>{" "}
            -&gt;{" "}
            <Link to={`/manga/${manga.mal_id}`} className="breadcrumb-current" onClick={handleRefresh}>
              {manga.title}
            </Link>
          </p>
          <span className="synopsis-background-gap">
            <p>
              <span className="manga-details-ids">Synopsis:</span>
              <span className="manga-details-values">
                {manga.synopsis ? manga.synopsis : <span className="unknown-details">N/A</span>}
              </span>
            </p>
            <p>
              <span className="manga-details-ids">Background:</span>
              <span className="manga-details-values">
                {manga.background ? manga.background : <span className="unknown-details">N/A</span>}
              </span>
            </p>
            <p>
              <span className="manga-details-ids">More Info:</span>
              {loadingMoreInfo ? (
                <span>
                  Loading More Info
                  <Loader />
                </span>
              ) : errorMoreInfo ? (
                <div>Error: {errorMoreInfo}</div>
              ) : (
                <span className="manga-details-values">
                  {moreInfo ? moreInfo : <span className="unknown-details">N/A</span>}
                </span>
              )}
            </p>
            <span className="manga-details-ids">External Links:</span>
            {loadingExternalLinks ? (
              <span>
                Loading External Links
                <Loader />
              </span>
            ) : errorExternalLinks ? (
              <div>Error: {errorExternalLinks}</div>
            ) : (
              <div className="external-links">
                {externalLinks.map((link, index) => (
                  <span key={index} className="external-links-span">
                    {index + 1} -&nbsp;
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="external-links-a">
                      {link.name} <br></br>
                    </a>
                  </span>
                ))}
              </div>
            )}
          </span>
          <h3 className="sub-heading-right-side">Characters</h3>
          {loadingCharacters ? (
            <Loader />
          ) : errorCharacters ? (
            <div>Error: {errorCharacters}</div>
          ) : (
            <CharactersTable characters={characters} />
          )}
          <h3 className="sub-heading-right-side">Reviews</h3>
          <Reviews reviews={reviews} />
          <h3 className="sub-heading-right-side">Recent News</h3>
          {loadingNews ? (
            <div className="loading-icon">
              Loading News
              <Loader />
            </div>
          ) : errorNews ? (
            <div>Error: {errorNews}</div>
          ) : (
            <News newsItems={recentNews} />
          )}
          <h3 className="sub-heading-right-side">Manga Pictures</h3>
          <GalleryPictures pictures={galleryPictures} />
        </div>
      </div>
    </div>
  );
};

MangaDetails.propTypes = {
  manga: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  recentNews: PropTypes.array.isRequired,
  loadingNews: PropTypes.bool.isRequired,
  errorNews: PropTypes.string,
  moreInfo: PropTypes.string,
  loadingMoreInfo: PropTypes.bool.isRequired,
  errorMoreInfo: PropTypes.string,
  externalLinks: PropTypes.array,
  loadingExternalLinks: PropTypes.bool.isRequired,
  errorExternalLinks: PropTypes.string,
  galleryPictures: PropTypes.array.isRequired,
  characters: PropTypes.array.isRequired,
  loadingCharacters: PropTypes.bool.isRequired,
  errorCharacters: PropTypes.string,
};

export default MangaDetails;
