import React, { useState } from 'react';
import './levelButton.css';

function LevelButton({ levels, setSelectedLevel }) {
  const [clickedLevels, setClickedLevels] = useState([]);

  const handleClick = (level) => {
    let updatedLevels;

    if (clickedLevels.includes(level)) {
      updatedLevels = clickedLevels.filter((clickedLevel) => clickedLevel !== level);
    } else {
      updatedLevels = [...clickedLevels, level];
    }

    setClickedLevels(updatedLevels);
    setSelectedLevel(updatedLevels.length > 0 ? updatedLevels : null);
  };

  return (
    <>
      {levels.map((level) => (
        <button
          key={level}
          type='submit'
          onClick={handleClick.bind(this, level)}
          className={clickedLevels.includes(level) ? 'selected' : ''}
        >
          {level}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={clickedLevels.includes(level) ? 'rotate' : ''}>
            <path d="M3 6L8 11L13 6" stroke="#6612ED" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </>
  );
}

export default LevelButton;