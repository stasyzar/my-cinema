import movies from '../data/movies.json';
import MovieCard from '../components/MovieCard';
import { useState, useEffect, useMemo } from 'react';
import Pagination from '../components/Pagination';
import { useOutletContext } from 'react-router-dom';

const ITEMS_PER_PAGE = 8;

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const { filters } = useOutletContext();
  const [prevFilters, setPrevFilters] = useState(filters);

  const filteredMovies = useMemo(() => {
    return [...movies]
      .filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = filters.genre.length === 0 || filters.genre.includes(movie.genre);
        const matchesHall = !filters.hall || movie.hall === filters.hall;
        const matchesFormat = !filters.format || movie.format === filters.format;
        return matchesSearch && matchesFormat && matchesGenre && matchesHall;
      })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return b.rating - a.rating;
    })
  }, [searchQuery, filters, sortBy]);

  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentMovies = filteredMovies.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);

  useEffect(() => {
    document.querySelector('.content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

   if (prevFilters !== filters) {
    setPrevFilters(filters);
    setCurrentPage(1);
  }

  return <div className="home-page">
    <div className="section-header">
      <span className="section-subtitle">ЗАРАЗ У КІНО</span>
      <h1>АФІША ФІЛЬМІВ</h1>
    </div>
    <div className="filters-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Пошук фільму за назвою..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />
      <select
        className="filter-select"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value)
          setCurrentPage(1)
        }}
      >
        <option value="rating">За рейтингом</option>
        <option value="price-asc">Від дешевших</option>
        <option value="price-desc">Від дорожчих</option>
        <option value="title">За назвою (А–Я)</option>
      </select>
    </div>
    {currentMovies.length > 0 ? <div className="movies-grid">
      {currentMovies.map((movie) =>
        <MovieCard key={movie.id} movie={movie} />
      )}
    </div> : <div className="empty-state">За обраними параметрами фільмів не знайдено.</div>}

    {totalPages > 1 && <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
    />}
  </div>;
}