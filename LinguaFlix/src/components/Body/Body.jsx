import React, { useState } from 'react';
import './body.css';
import Table from './Table.jsx';
import LevelButton from './LevelButton.jsx';

function Body({ movie }) {
  const levels = ['C2', 'C1', 'B2', 'B1', 'A2', 'A1'];
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState({
    firstLanguage: 'eng',
    secondLanguage: 'ukr',
  });

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

  const saveData = () => {
    console.log(selectedLanguages);
    console.log(selectedLevel);
  };

  const handleSubmit = () => {
    console.log("Accepted");
    saveData();
  };

  return (
    <>
      <div className='content'>
        {movie && (
          <div className='content-movie' key={movie.id}>
            <div className='content-img'>
              <img src={movie.img} alt='poster' />
            </div>
            <div className='content-text'>
              <h1>{movie.name}</h1>
              <p className='content-text-year'>{movie.year}</p>
              <h5>About film:</h5>
              <p>{movie.description}</p>
            </div>
          </div>
        )}
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
          <LevelButton levels={levels} setSelectedLevel={setSelectedLevel} saveData={saveData} />
        </div>
        <div>
          <Table movie={movie} selectedLevel={selectedLevel} selectedLanguages={selectedLanguages} />
        </div>
      </div>
    </>
  );
}

export default Body;

