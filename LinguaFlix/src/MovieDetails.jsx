import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './components/movieDetails.css';
import LevelButton from './components/Body/LevelButton';
import Table from './components/Body/Table';
import { DB_URL } from './store/firebase';
import ToggleButton from '../src/components/Body/ToggleButton.jsx';

function MovieDetails() {
  document.querySelector('.sidebar').style.display = 'flex';

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const levels = ['C2', 'C1', 'B2', 'B1', 'A2', 'A1'];
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState({
    firstLanguage: 'eng',
    secondLanguage: 'ukr',
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${DB_URL}/movies/${id}.json`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch movie details');
      }
    };

    fetchMovie();
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
    console.log('Accepted button clicked.');
  };

  return (
    <>
      <div className="movie-details">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img src={movie.posterURL} alt="poster" width={264} height={380} />
          <div className="details-text">
            <h1>{movie.title}</h1>
            <p className="details-text-year">{movie.year}</p>
            <h5>About film:</h5>
            <h4>{movie.description}</h4>
          </div>
        </div>
        <div className='movie-details-linkes'>
          <h3>You can watch this movie on these sites</h3>
          <div className='movie-details-link'>
            <a href="#"> <p>Netflix</p></a>
            <a href="#"><p>Apple</p></a>
            <a href="#">HDrezka</a>
            <a href="#">Prime</a>
          </div>

        </div>
        <div className="selectedLanguage">
          <label>
            <h3>First Language</h3>
            <select
              value={selectedLanguages.firstLanguage}
              onChange={handleFirstLanguageChange}
            >
              <option value="eng">English</option>
            </select>
          </label>
          <label>
            <h3>Second Language</h3>
            <select
              value={selectedLanguages.secondLanguage}
              onChange={handleSecondLanguageChange}
            >
              <option value="ukr">Ukrainian</option>
              <option value="spa">Spanish</option>
            </select>
          </label>
          <button type="submit" onClick={handleSubmit}>
            Accept
          </button>
        </div>
        <div>
          <ToggleButton />
        </div>
        <div className="level_button">
          <LevelButton levels={levels} setSelectedLevel={setSelectedLevel} />
        </div>
        <Table
          movies={movie}
          selectedLevel={selectedLevel}
          selectedLanguages={selectedLanguages}
        />
      </div>
    </>
  );
}

export default MovieDetails;