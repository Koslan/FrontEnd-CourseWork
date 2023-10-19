import Nav from './components/Nav.jsx';
import { useState, useEffect } from 'react';
import './App.css'; 
import Logo from './assets/logo.svg';
import { Link } from 'react-router-dom';

function Header({ onSearch,results, isVisible }) {

    const handleInputChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <header className="header">
          <div className='logo'>
            <Link to="/">
              <img src={Logo} className='logo' width="160" height="33" alt="Logo" />
            </Link>
          </div>
          <div className="header__center">
            <div className="search-container">
              <img src="../src/assets/search.svg" alt="search"  />
              <input 
                type="text" 
                placeholder="Search" 
                onChange={handleInputChange}
              />
              {isVisible && <div className="search-results">
                {results.map(movie => (
                  <div key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>{movie.name}</Link>
                  </div>
                ))}
              </div>}
            </div>
          </div>
          <div className="header__right">
            <Nav />
          </div>
        </header>
      );
}


export default Header;
