import movies from '../data/movies.json';
import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 8;

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Усі');
  const [sortBy, setSortBy] = useState('rating');

  const [searchParams, setSearchParams] = useSearchParams();
  const urlGenre = searchParams.get('genre');
  const urlHall = searchParams.get('hall');
  const urlFormat = searchParams.get('format');

  useEffect(() => {
    setSelectedGenre(urlGenre || 'Усі');
    setCurrentPage(1);
  }, [urlGenre, urlHall, urlFormat]);

  const filteredMovies = movies
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'Усі' || movie.genre === selectedGenre;
      const matchesHall = !urlHall || movie.hall === urlHall;
      const matchesFormat = !urlFormat || movie.format === urlFormat;
      return matchesSearch && matchesGenre && matchesFormat && matchesHall;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return b.rating - a.rating;
    });

  const GENRES = ['Усі', ...new Set(movies.map((m) => m.genre))];

  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentMovies = filteredMovies.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);

  useEffect(() => {
    document.querySelector('.content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
        value={selectedGenre}
        onChange={(e) => {
          setSelectedGenre(e.target.value);
          setSearchParams({});
          setCurrentPage(1);
        }}
      >
        {GENRES.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      <select
        className="filter-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="rating">За рейтингом</option>
        <option value="price-asc">Від дешевших</option>
        <option value="price-desc">Від дорожчих</option>
        <option value="title">За назвою (А–Я)</option>
      </select>
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