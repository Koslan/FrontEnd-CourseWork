import React from 'react';
import '../App.css';
import OurMissionImage from '../assets/1.png';
import VisionImage from '../assets/2.png';
import FunctionalityImage from '../assets/3.png';

import '../store/i18n';
import { useTranslation } from 'react-i18next';


function AboutProject() {
    const { t } = useTranslation();

    document.querySelector('.sidebar').style.display = 'none';

    
    return (
        <div className='about-project-container'> 
        <h1>{t('Hello, We are a LinguaFlix')}</h1>
        <div className="about-project">
            <div className="about-project-block">
                <div className="about-project-image">
                    <img src={OurMissionImage} alt="Image 1" />
                </div>
                <div className="about-project-text">
                    <h2>{t('Our mission')}</h2>
                    <p>{t('Our mission_text')}</p>
                </div>
            </div>
            <div className="about-project-block">
                <div className="about-project-image">
                    <img src={VisionImage} alt="Image 2" />
                </div>
                <div className="about-project-text">
                    <h2>{t('Vision')}</h2>
                    <p>{t('Vision_text')}</p>
                </div>
            </div>
            <div className="about-project-block">
                <div className="about-project-image">
                    <img src={FunctionalityImage} alt="Image 3" />
                </div>
                <div className="about-project-text">
                    <h2>{t('Functionality')}</h2>
                    <p>{t('Functionality_text')}</p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default AboutProject;
