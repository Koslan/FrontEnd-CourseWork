import { useState } from 'react';
import './button.css';

function ToggleButton({ setActiveTab }) {
    const [clickedButton, setClickedButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setClickedButton(buttonId);
        setActiveTab(buttonId);  // Assuming buttonId corresponds to tab names
    };

    const buttons = [
        { id: 'Dictionary', text: 'Dictionary' },
        { id: 'MovieScript', text: 'Movie Script' },
        { id: 'Test', text: 'Test' },
        // Add other buttons as needed
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
