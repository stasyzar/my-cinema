import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../common/Icon'
import { memo } from 'react'; 

const NAV_ITEMS = [
    {
        label: 'Афіша',
        to: '/',
        submenu: [
            { label: 'Усі фільми', to: '/', reset: true },
            { label: 'Формат IMAX', to: '/', format: 'IMAX' },
            { label: 'Формат 3D', to: '/', format: '3D' },
            { label: 'Формат 2D', to: '/', format: '2D' },
        ],
    },
    {
        label: 'Про кінотеатр',
        to: '/about',
        submenu: [
            { label: 'Наші зали', to: '/about' },
            { label: 'Фотогалерея', to: '/about#gallery' },
        ],
    },
    {
        label: 'Контакти',
        to: '/contacts',
    },
];

function Header({ toggleFilter, resetFilters }) {
    const { user, login, logout } = useAuth();

    return (
        <header className="header">
            <span className="logo-mark"><Icon name="brand" size={22} /></span>
            <Link to="/" className='header-logo' onClick={resetFilters}>
                MY<span>CINEMA</span>
            </Link>

            <div className="header-nav">
                {NAV_ITEMS.map((item) => (
                    <div key={item.label} className="nav-item">
                        <Link to={item.to} className="nav-link">{item.label} {item.submenu && <Icon name="chevron" size={12} />}</Link>
                        {item.submenu && (
                            <div className="submenu">
                                {item.submenu.map((subItem, subIndex) => (
                                    <Link
                                        key={subIndex}
                                        to={subItem.to}
                                        onClick={() => {
                                            if (subItem.reset) resetFilters();
                                            if (subItem.format) toggleFilter('format', subItem.format);
                                        }}
                                    >
                                        {subItem.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>


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

export default memo(Header);