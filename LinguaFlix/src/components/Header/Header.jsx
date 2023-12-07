import Nav from './Nav.jsx';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import Logo from '../../assets/logo.svg';
import SearchIcon from '../../assets/search.svg';
import { Link } from 'react-router-dom';
import HeaderUser from './HeaderUser.jsx';
import { getUserFromLocalStorage } from '../../store/userUtils.js';
import { userActions } from '../../store/index.js';
import { useTranslation } from 'react-i18next';
import i18n from '../../store/i18n.js';

import multilanguage from '../../store/i18n.js';

import { Globe } from 'react-bootstrap-icons';
import i18next from 'i18next';

function Header({ onSearch, results, isVisible }) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [userLoaded, setUserLoaded] = useState(false);

    const [showLanguageOptions, setShowLanguageOptions] = useState(false);
    
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const handleInputChange = (e) => {
        onSearch(e.target.value);
    };

    const toggleLanguageOptions = () => {
        setShowLanguageOptions(!showLanguageOptions);
    };

    useEffect(() => {
        if (!user.isLoggedIn && !userLoaded) {
            const storedUser = getUserFromLocalStorage();
            if (storedUser) {
                dispatch(userActions.setActiveUser(storedUser));
                setUserLoaded(true);
            }
        }
    }, [user, dispatch, userLoaded]);

   const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
    setShowLanguageOptions(false);
       console.log(`Switching language to ${language}`);
      };

    return (
        <header className="header">
            <div className='header__logo'>
                <Link to="/movies">
                    <img src={Logo} width="160" height="33" alt="Logo" />
                </Link>
            </div>
            <div className="header__center">
                <div className="search-container">
                    <img src={SearchIcon} alt="search" />
                    <input
                        type="text"
                        onChange={handleInputChange}
                    />
                    {isVisible && <div className="search-results">
                        {results.map(movie => (
                            <div key={movie.id}>
                                <Link to={`/movie/${movie.id}`}>
                                    {movie.name}</Link>
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
            <div className="header__right">
                <Nav t={t} />
            </div>
            <div className="language-icon" onClick={toggleLanguageOptions}>
                <Globe />
                <span>{selectedLanguage.toUpperCase()}</span>
            </div>
            {showLanguageOptions && (
                <div className="language-dropdown">
                    <div onClick={() => changeLanguage('uk')}>
                        UK
                    </div>
                    <div onClick={() => changeLanguage('en')}>
                        EN
                    </div>
                </div>
            )}
            <div className='login'>
                {!user.isLoggedIn && <Link to="/login" className={'nav-link'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                        <path d="M22 12.7499C23.1272 12.7499 24.2082 13.1977 25.0052 13.9947L25.5226 13.4773L25.0052 13.9947C25.8022 14.7918 26.25 15.8728 26.25 16.9999C26.25 18.1271 25.8022 19.2081 25.0052 20.0051C24.2082 20.8022 23.1272 21.2499 22 21.2499C20.8728 21.2499 19.7918 20.8022 18.9948 20.0051C18.1978 19.2081 17.75 18.1271 17.75 16.9999C17.75 15.8728 18.1978 14.7918 18.9948 13.9947C19.7918 13.1977 20.8728 12.7499 22 12.7499ZM22 25.2499C24.6714 25.2499 27.0517 25.7925 28.7365 26.6348C30.4658 27.4995 31.25 28.5556 31.25 29.4999C31.25 30.4664 30.4665 31.2499 29.5 31.2499H14.5C13.5335 31.2499 12.75 30.4664 12.75 29.4999C12.75 28.5556 13.5342 27.4995 15.2635 26.6348C16.9483 25.7925 19.3286 25.2499 22 25.2499Z" stroke="#131315" strokeWidth="1.5" />
                    </svg>
                </Link>}
                {user.isLoggedIn && <HeaderUser user={user} />}
            </div>
        </header>
    );
}

export default Header;
