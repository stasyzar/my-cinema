import { useParams, Link } from 'react-router-dom';
import movies from '../data/movies.json';
import Icon from '../components/common/Icon';
import ShareButtons from '../components/common/ShareButtons';
import ReviewSection from '../components/ReviewSection';

export default function MoviePage() {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return (
      <div className="movie-not-found">
        <h2>Фільм не знайдено</h2>
        <p>Схоже, цей сеанс уже завершився або адреса введена невірно.</p>
        <Link to="/" className="btn-back">Повернутися до афіші</Link>
      </div>
    );
  }

  return (
    <div className="movie-page">
      <div className="movie-details-card">

        <div className="movie-poster-wrap">
          <img src={movie.poster} alt={movie.title} className="movie-page-poster" />
          <span className="movie-age-badge">{movie.age}</span>
        </div>

        <div className="movie-info-wrap">
          <div className="movie-badges-row">
            <span className="badge badge-accent">{movie.genre}</span>
            <span className="badge badge-dark">{movie.format}</span>
            <span className="badge badge-outline">{movie.hall}</span>
          </div>

          <h1 className="movie-page-title">{movie.title}</h1>

          <div className="movie-specs-row">
            <span className="spec-item spec-rating">
              <Icon name="star" size={16} />
              <strong>{movie.rating}</strong> / 10
            </span>
            <span className="spec-item">
              <Icon name="clock" size={16} />
              {movie.duration}
            </span>
            <span className="spec-item spec-price">
              від {movie.price} грн
            </span>
          </div>

          <div className="movie-desc-block">
            <h3>Про що фільм</h3>
            <p>{movie.description}</p>
          </div>

          <ShareButtons title={movie.title} />
        </div>
      </div>
      <ReviewSection movieId={movie.id} />
    </div>
  );
}