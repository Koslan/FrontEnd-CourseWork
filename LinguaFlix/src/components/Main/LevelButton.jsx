import React, { useEffect, useState } from 'react';
import './button.css';

function LevelButton({ levels, selectedLevel, setSelectedLevel }) {
  const [clickedLevels, setClickedLevels] = useState([]);

  useEffect(() => {
    setClickedLevels(['C2']);
    setSelectedLevel('C2');
  }, [setSelectedLevel]);

  const handleClick = (level) => {
    setSelectedLevel(level);
  };

  return (
    <>
      {levels.map((level) => (
        <button
          key={level}
          type='submit'
          onClick={() => handleClick(level)}
          className={selectedLevel === level ? 'selected' : ''}
        >
          <span>{level}</span>
          {level === 'C2'}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={selectedLevel === level ? 'rotate' : ''}>
            <path d="M3 6L8 11L13 6" stroke={selectedLevel === level ? '#FFF' : '#6612ED'} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </>
  );
}

export default LevelButton;