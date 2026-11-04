import Icon from '../components/common/Icon';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <div className="movie-body">
                <div className="movie-meta">
                    <span>{movie.genre} • {movie.format}</span>
                    <span className="movie-rating"><Icon name="star" size={14} /> {movie.rating}</span>
                </div>
                <h3>{movie.title}</h3>
                <p>{movie.hall} • {movie.duration}</p>
            </div>
            <div className="movie-footer">
                <span className="movie-price">{movie.price} грн</span>
                <Link to={`/movie/${movie.id}`} className="btn-ticket">
                    Купити квиток
                </Link>
            </div>
        </div>
    )
}