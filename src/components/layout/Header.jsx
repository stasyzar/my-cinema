import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/">Афіша</Link> |{' '}
        <Link to="/about">Про кінотеатр</Link> |{' '}
        <Link to="/contacts">Контакти</Link>
      </nav>
    </header>
  );
}