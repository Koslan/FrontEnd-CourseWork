import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieDetails() {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`https://linguaflix-1edb6-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json`)
            .then((response) => {
                setMovie(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-details">
            <h2>{movie.title}</h2>
            <p>Year: {movie.year}</p>
            <p>Language Pairs: {movie['Language Pairs']}</p>
        </div>
    );
}

export default MovieDetails;
