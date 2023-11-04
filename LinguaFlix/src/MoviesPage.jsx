import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'

function MoviesPage() {
    const [movies, setMovies] = useState([]);
   // document.querySelector('.sidebar').style.display = 'flex';

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
            <div className="movies-row">
                {movies.map((movie) => {
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
                })}
            </div>
        </div>
    );
}

export default MoviesPage;

