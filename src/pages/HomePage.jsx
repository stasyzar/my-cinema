import movies from '../data/movies.json';
import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 8;

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentMovies = movies.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

  useEffect(() => {
    document.querySelector('.content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return <div className="home-page">
    <div className="section-header">
      <span className="section-subtitle">ЗАРАЗ У КІНО</span>
      <h1>АФІША ФІЛЬМІВ</h1>
    </div>
    <div className="movies-grid">
      {currentMovies.map((movie) =>
        <MovieCard key={movie.id} movie={movie} />
      )}
    </div>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
    />

  </div>;
}