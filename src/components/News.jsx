import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./News.css";

const News = ({ newsItems }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const uniqueNewsItems = newsItems.filter(
    (item, index, self) => index === self.findIndex((t) => t.mal_id === item.mal_id)
  );

  return (
    <div className="news-container">
      {uniqueNewsItems.length > 1 ? (
        <Slider {...sliderSettings}>
          {uniqueNewsItems.map((news) => (
            <div key={news.mal_id}>
              <NewsCard news={news} />
            </div>
          ))}
        </Slider>
      ) : (
        uniqueNewsItems.map((news) => (
          <div key={news.mal_id}>
            <NewsCard news={news} />
          </div>
        ))
      )}
    </div>
  );
};

const NewsCard = ({ news }) => {
  return (
    <div className="news-card">
      <div className="news-header">
        <div className="news-info">
          <img src={news.images.jpg.image_url} alt={news.title} className="news-image" />
          <div className="news-title">
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              {news.title}
            </a>
          </div>
        </div>
        <span className="news-date">{new Date(news.date).toLocaleDateString()}</span>
      </div>
      <div className="news-body">
        <ReactMarkdown>{news.excerpt}</ReactMarkdown>
      </div>
      <div className="news-footer">
        <div className="news-author">
          By{" "}
          <a href={news.author_url} target="_blank" rel="noopener noreferrer">
            {news.author_username}
          </a>
        </div>
        <div className="news-comments">{news.comments} Comments</div>
        <a href={news.forum_url} target="_blank" rel="noopener noreferrer" className="news-link">
          Discuss on MAL Forums
        </a>
      </div>
    </div>
  );
};

News.propTypes = {
  newsItems: PropTypes.arrayOf(
    PropTypes.shape({
      mal_id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      author_username: PropTypes.string.isRequired,
      author_url: PropTypes.string.isRequired,
      forum_url: PropTypes.string.isRequired,
      images: PropTypes.shape({
        jpg: PropTypes.shape({
          image_url: PropTypes.string,
        }),
      }),
      comments: PropTypes.number.isRequired,
      excerpt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};

export default News;
