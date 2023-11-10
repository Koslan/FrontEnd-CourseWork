// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./App.css";

function Sidebar({ addToWatchedCallback }) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

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
                const last7Movies = movieList.slice(-7);
                setMovies(last7Movies);
            })
            .catch((error) => {
                setError('Error loading data: ' + error.message);
            });
    }, []);

    const handleToggleFavorite = (movieId) => {
        const updatedMovies = movies.map((movie) => {
            if (movie.id === movieId) {
                return { ...movie, isFavorite: !movie.isFavorite };
            }
            return movie;
        });
        setMovies(updatedMovies);
    };

    const handleAddToWatched = (movieId) => {
        addToWatchedCallback(movieId);
        console.log(`Фільм з ID ${movieId} додано до списку "Watched movies"`);
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="sidebar">
            <h1>Popular now</h1>
            {movies.map((movie) => {
                return (
                    <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card-link">
                        <div className="movie-card">
                            <div className="movie-card-left">
                                <img src={movie.posterURL} alt={movie.title} />
                            </div>
                            <div className="movie-card-right">
                                <div className='movie-card-right-title'>
                                    <h2>{movie.title}</h2>
                                    <div className={`favorite-heart ${movie.isFavorite ? 'favorite' : ''}`}
                                        onClick={() => {
                                            handleToggleFavorite(movie.id);
                                            handleAddToWatched(movie.id);
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='movie-card-right-info'>
                                    <p>{movie.year}</p>
                                    <p>{movie.lexicalComplexity}</p>
                                </div>
                            </div>
                        </div>
                        <div className='line'></div>
                    </Link>
                );
            })}
        </div>
    );
}

export default Sidebar;





