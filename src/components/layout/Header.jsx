import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { user, login, logout } = useAuth();

    return (
        <header className="header">
            <Link to="/" className='header-logo'></Link>
            <nav>
                <Link to="/">Афіша</Link> |{' '}
                <Link to="/about">Про кінотеатр</Link> |{' '}
                <Link to="/contacts">Контакти</Link>
            </nav>

            <div className="header-user">
                {user ? (
                    <div>
                        {user.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName} />
                        ) : (user.displayName?.[0])}
                        <span>{user.displayName}</span>
                        <button onClick={logout}>Вийти</button>
                    </div>
                )
                    : (<button onClick={login}>Увійти</button>)}
            </div>
        </header>
    );
}