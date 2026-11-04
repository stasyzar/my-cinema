import movies from '../data/movies.json';
import MovieCard from '../components/MovieCard';

export default function HomePage() {
  return <div className="home-page">
    <div className="section-header">
      <span className="section-subtitle">ЗАРАЗ У КІНО</span>
      <h1>АФІША ФІЛЬМІВ</h1>
    </div>
    <div className="movies-grid">
  {movies.map((movie) => 
    <MovieCard key={movie.id} movie={movie} />
  )}
    </div>
  </div>;
}