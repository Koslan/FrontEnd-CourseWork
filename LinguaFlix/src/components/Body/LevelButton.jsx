import React, { useState } from 'react';
import './levelButton.css';

function LevelButton({ levels, setSelectedLevel, saveData }) {
    const [isClicked, setIsClicked] = useState(Array(levels.length).fill(false));

    const handleClick = (index) => {
        setIsClicked((prevState) => {
          const newState = [...prevState];
          newState[index] = !newState[index];
          return newState;
        });
        setSelectedLevel(levels[index]);
        saveData();
      };

    return (
        <>
              {levels.map((level, index) => (
                <button key={level} type='submit' onClick={() => handleClick(index)}>
                    {level}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isClicked[index] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <path d="M3 6L8 11L13 6" stroke="#6612ED" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            ))}
        </>
    )
}

export default LevelButton;