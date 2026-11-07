import { useLocation, Link } from "react-router-dom";
import movies from '../../data/movies.json';
import { memo } from 'react'; 

function Breadcrumbs() {
  const location = useLocation();
  const pathName = location.pathname;
  let breadcrumbs = '';

  if (pathName === '/') {
    breadcrumbs = [
      { label: 'Головна', to: '/' },
      { label: 'Афіша' }
    ];
  } else if (pathName === '/about') {
    breadcrumbs = [
      { label: 'Головна', to: '/' },
      { label: 'Про кінотеатр' }
    ];
  } else if (pathName === '/contacts') {
    breadcrumbs = [
      { label: 'Головна', to: '/' },
      { label: 'Контакти' }
    ];
  } else if (pathName.startsWith('/movie/')) {
    const id = Number(location.pathname.split('/')[2]);
    const movie = movies.find((m) => m.id === id);
    const name = movie ? movie.title : 'Фільм';
    breadcrumbs = [
      { label: 'Головна', to: '/' },
      { label: 'Афіша', to: '/' },
      { label: name }
    ];
  } else {
    breadcrumbs = [
      { label: 'Головна', to: '/' }
    ];
  }

  return <div className="breadcrumbs">
    {breadcrumbs.map((crumb, index) => (
      <span key={index}>
        {crumb.to ? (
          <Link to={crumb.to} className="breadcrumb-link">{crumb.label}</Link>
        ) : (
          <span className="breadcrumb-current">{crumb.label}</span>
        )}
        {index < breadcrumbs.length - 1 && ' / '}
      </span>
    ))}
  </div>;
}

export default memo(Breadcrumbs);