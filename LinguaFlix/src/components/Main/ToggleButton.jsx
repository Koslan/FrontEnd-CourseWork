import React, { useState } from 'react';
import './button.css';

function ToggleButton() {
    const [clickedButton, setClickedButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setClickedButton(buttonId);
    };

    const buttons = [
        { id: 1, text: 'Dictionary' },
        { id: 2, text: 'Movie script' },
        { id: 3, text: 'Test' },
    ];

    return (
        <div className='toggle-button'>
            {buttons.map((button) => (
                <button
                    key={button.id}
                    className={`custom-button ${clickedButton === button.id ? 'clicked' : ''}`}
                    onClick={() => handleButtonClick(button.id)}
                >
                    <h2>{button.text}</h2>
                </button>
            ))}
        </div>
    );
}

export default ToggleButton;