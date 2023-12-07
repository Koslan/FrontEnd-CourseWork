// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../App.css";

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