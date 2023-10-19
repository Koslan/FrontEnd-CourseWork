import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './components/movieDetails.css';
import LevelButton from './components/Body/LevelButton';
import Table from './components/Body/Table';

function MovieDetails() {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const levels = ['c2', 'c1', 'b2', 'b1', 'a2', 'a1'];
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedLanguages, setSelectedLanguages] = useState({
        firstLanguage: 'eng',
        secondLanguage: 'ukr',
    });

    const { id } = useParams();
    console.log(movie);

    console.log(id);

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

    const handleFirstLanguageChange = (e) => {
        setSelectedLanguages({
            ...selectedLanguages,
            firstLanguage: e.target.value,
        });
    };

    const handleSecondLanguageChange = (e) => {
        setSelectedLanguages({
            ...selectedLanguages,
            secondLanguage: e.target.value,
        });
    };

    const handleSubmit = () => {
        console.log("Accepted button clicked.");
    };

    return (
        <>
            <div className="movie-details">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <img src={movie.posterURL} alt='poster' width={264} height={380} />
                    <div className='details-text'>
                        <h1>{movie.title}</h1>
                        <p className='details-text-year'>{movie.year}</p>
                        <h5>About film:</h5>
                        <h4>{movie.description}</h4>
                    </div>
                </div>
                <div className='selectedLanguage'>
                    <label>
                        <h3>First Language</h3>
                        <select value={selectedLanguages.firstLanguage} onChange={handleFirstLanguageChange}>
                            <option value='eng'>English</option>
                        </select>
                    </label>
                    <label>
                        <h3>Second Language</h3>
                        <select value={selectedLanguages.secondLanguage} onChange={handleSecondLanguageChange}>
                            <option value='ukr'>Ukrainian</option>
                            <option value='spa'>Spanish</option>
                        </select>
                    </label>
                    <button type='submit' onClick={handleSubmit}>
                        Accept
                    </button>
                </div>
                <div className='level_button'>
                    <LevelButton levels={levels} setSelectedLevel={setSelectedLevel} />
                </div>
            </div>
        </>

    );
}

export default MovieDetails;
