import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'

function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [selectedLanguageLevel, setSelectedLanguageLevel] = useState('all');
    document.querySelector('.sidebar').style.display = 'flex';

    useEffect(() => {
        axios
            .get('https://linguaflix-1edb6-default-rtdb.europe-west1.firebasedatabase.app/movies.json')
            .then((response) => {
                const movieList = [];
                for (const movieKey in response.data) {
                    if (response.data.hasOwnProperty(movieKey)) {
                        movieList.push({ id: movieKey, ...response.data[movieKey], isFavorite: false });
                    }
                }
                setMovies(movieList);
            })
            .catch((error) => {
                setError('Error loading data: ' + error.message);
            });
    }, []);

    return (
        <div className="movies-page">
            <h1>Movies</h1>
            <div className="language-filter">
                <label htmlFor="languageLevel">Filter by Language Level:</label>
                <select
                    id="languageLevel"
                    onChange={(e) => setSelectedLanguageLevel(e.target.value)}
                    value={selectedLanguageLevel}
                >
                    <option value="all">All</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                </select>
            </div>
            
            <div className="movies-row">
                {movies.map((movie) => {
                    if (
                        selectedLanguageLevel === 'all' ||
                        movie.lexicalComplexity === selectedLanguageLevel
                    ) {
                        return (
                        <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card-link">
                            <div className="movie-page-card">
                                <div className="movie-card-top">
                                    <img src={movie.posterURL} alt={movie.title} />
                                </div>
                                <div className="movie-card-bottom">
                                    <h2>{movie.title}</h2>
                                    <div className="movie-card-right-info">
                                        <p>{movie.year}</p>
                                        <p>{movie.lexicalComplexity}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default MoviesPage;

