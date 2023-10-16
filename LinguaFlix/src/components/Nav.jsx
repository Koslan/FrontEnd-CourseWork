import React from 'react';
import { Link } from 'react-router-dom'; 
import '../App.css'; 

function Nav() {
    return (
        <nav>
                <Link to="/movies">Movies</Link>
                <Link to="/about_team">About team</Link>
                <Link to="/about_project">About Project</Link>
        </nav>
    );
}

export default Nav;
