import React from 'react';
import { Link } from 'react-router-dom'; 
import '../App.css'; 

function Nav() {
    return (
        <nav>
                <Link to="/movies">Movies</Link>
                <Link to="/tv-shows">Tv-shows</Link>
                <Link to="/books">Books</Link>
                <Link to="/about">About</Link>
                <Link to="/contacts">Contacts</Link>
        </nav>
    );
}

export default Nav;
