import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Details.css";
import Reviews from "./Reviews";
import News from "./News";
import AnimeEpisodes from "./AnimeEpisodes";
import VoiceActors from "./VoiceActors";
import GalleryPictures from "./GalleryPictures";
import CharactersTable from "./CharactersTable";
import StaffTable from "./StaffTable";
import Loader from "./Loader";

const AnimeDetails = ({
  anime,
  reviews,
  recentNews,
  loadingNews,
  errorNews,
  episodes,
  voiceActors,
  galleryPictures,
  externalLinks,
  loadingExternalLinks,
  errorExternalLinks,
  characters,
  loadingCharacters,
  errorCharacters,
  staff,
  loadingStaff,
  errorStaff,
  moreInfo,
  loadingMoreInfo,
  errorMoreInfo,
  streaming,
  loadingStreaming,
  errorStreaming,
  themes,
  loadingThemes,
  errorThemes,
}) => {
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
            <p>
              <span className="anime-details-ids">More Info:</span>
              {loadingMoreInfo ? (
                <span>
                  Loading More Info
                  <Loader />
                </span>
              ) : errorMoreInfo ? (
                <div>Error: {errorMoreInfo}</div>
              ) : (
                <span className="anime-details-values">
                  {moreInfo ? moreInfo : <span className="unknown-details">N/A</span>}
                </span>
              )}
            </p>
            <span className="anime-details-ids">Themes:</span>
            {loadingThemes ? (
              <span>
                Loading themes
                <Loader />
              </span>
            ) : errorThemes ? (
              <div>Error: {errorThemes}</div>
            ) : (
              <span className="anime-details-values">
                {themes.openings.length > 0 || themes.endings.length > 0 ? (
                  <>
                    {themes.openings.length > 0 && (
                      <>
                        <br />
                        <strong className="strong-theme">Opening🎶:</strong>
                        {themes.openings.map((opening, index) => (
                          <div key={index} className="strong-theme-inside">
                            {opening}
                          </div>
                        ))}
                      </>
                    )}
                    {themes.endings.length > 0 && (
                      <>
                        <strong className="strong-theme">Ending🎶:</strong>
                        {themes.endings.map((ending, index) => (
                          <div key={index} className="strong-theme-inside">
                            {ending}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <span className="unknown-details">N/A</span>
                )}
              </span>
            )}

            <span className="anime-details-ids">Streaming:</span>
            {loadingStreaming ? (
              <span>
                Loading Streaming
                <Loader />
              </span>
            ) : errorStreaming ? (
              <div>Error: {errorStreaming}</div>
            ) : (
              <div className="external-links">
                {streaming.length > 0 ? (
                  streaming.map((platform, index) => (
                    <span key={index} className="external-links-span">
                      {index + 1} -&nbsp;
                      <a href={platform.url} target="_blank" rel="noopener noreferrer" className="external-links-a">
                        {platform.name} <br></br>
                      </a>
                    </span>
                  ))
                ) : (
                  <span className="unknown-details">N/A</span>
                )}
              </div>
            )}

            <span className="anime-details-ids">External Links:</span>
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
          <h3 className="sub-heading-right-side">Anime Episodes</h3>
          <AnimeEpisodes episodes={episodes} />
          <h3 className="sub-heading-right-side">Characters</h3>
          {loadingCharacters ? (
            <Loader />
          ) : errorCharacters ? (
            <div>Error: {errorCharacters}</div>
          ) : (
            <CharactersTable characters={characters} />
          )}
          <h3 className="sub-heading-right-side">Voice Actors</h3>
          <VoiceActors voiceActors={voiceActors} />
          <h3 className="sub-heading-right-side">Staff</h3>
          {loadingStaff ? <Loader /> : errorStaff ? <div>Error: {errorStaff}</div> : <StaffTable staff={staff} />}
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
            <News newsItems={uniqueNews} />
          )}
          <h3 className="sub-heading-right-side">Anime Pictures</h3>
          <GalleryPictures pictures={galleryPictures} />
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
  galleryPictures: PropTypes.array.isRequired,
  externalLinks: PropTypes.array.isRequired,
  loadingExternalLinks: PropTypes.bool,
  errorExternalLinks: PropTypes.string,
  characters: PropTypes.array.isRequired,
  loadingCharacters: PropTypes.bool,
  errorCharacters: PropTypes.string,
  staff: PropTypes.array.isRequired,
  loadingStaff: PropTypes.bool.isRequired,
  errorStaff: PropTypes.string,
  moreInfo: PropTypes.string,
  loadingMoreInfo: PropTypes.bool.isRequired,
  errorMoreInfo: PropTypes.string,
  streaming: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  loadingStreaming: PropTypes.bool,
  errorStreaming: PropTypes.string,
  themes: PropTypes.shape({
    openings: PropTypes.arrayOf(PropTypes.string.isRequired),
    endings: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  loadingThemes: PropTypes.bool,
  errorThemes: PropTypes.string,
};

export default AnimeDetails;
