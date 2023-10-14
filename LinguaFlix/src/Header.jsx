import React from 'react';
import Nav from './components/Nav.jsx';
import './App.css'; 

function Header() {
    return (
    <header className="header">
            <div className="header__left">
            <img className="header__logo-logo" src="../src/assets/logo.svg" alt="Logo" />
                <div className="header__logo-text">
                    <p>LinguaFlix</p>
                    <p className="header__subtitle">Watch. Learn. Speak.</p>
                </div>
            </div>
            <div className="header__center">
                <div class="search-container">
                    <img src="../src/assets/search.svg" alt="search"  />
                    <input type="text" placeholder="Search"  />
                </div>
            </div>
            <div className="header__right">
            <Nav />
            </div>
    </header>
    );
}

export default Header;
