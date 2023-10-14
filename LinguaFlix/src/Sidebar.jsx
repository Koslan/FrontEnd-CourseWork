import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./App.css"

function Sidebar() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

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

    const toggleFavorite = (movieId) => {
        const updatedMovies = movies.map((movie) => {
            if (movie.id === movieId) {
                return { ...movie, isFavorite: !movie.isFavorite };
            }
            return movie;
        });
        setMovies(updatedMovies);

        if (favorites.includes(movieId)) {
            setFavorites(favorites.filter((id) => id !== movieId));
        } else {
            setFavorites([...favorites, movieId]);
        }
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
                                <h2>{movie.title}</h2>
                                <div className='movie-card-right-info'>
                                    <p>{movie.year}</p>
                                    <p>C1</p>
                                </div>
                                <div className="favorite-container">
                                    <button onClick={() => toggleFavorite(movie.id)} 
                                        className={`favorite-button ${movie.isFavorite ? 'favorite' : ''}`}>
                                        <div className="favorite-content">
                                            <img src={movie.isFavorite ? '../src/assets/Fav@2x.svg' : '../src/assets/Fav.svg'} alt="Fav" />
                                            {favorites.includes(movie.id) ? 'Delete from favorites' : 'Add to favorites'}
                                        </div>
                                    </button>
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


