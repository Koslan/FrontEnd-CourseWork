import React from 'react';
import './App.css';
import OurMissionImage from './assets/1.png';
import VisionImage from './assets/2.png';
import FunctionalityImage from './assets/3.png';


function AboutProject() {
    return (
        <div className='about-project-container'> 
        <h1>Hello, We are a LinguaFlix</h1>
        <div className="about-project">
            <div className="about-project-block">
                <div className="about-project-image">
                    <img src={OurMissionImage} alt="Image 1" />
                </div>
                <div className="about-project-text">
                    <h2>Our mission</h2>
                    <p>Our primary objective is to support language learners by integrating art and education. We believe that individuals should be able to read, watch, and understand original content, and we offer resources to simplify this journey.</p>
                </div>
            </div>
            <div className="about-project-block">
                <div className="about-project-image">
                    <img src={VisionImage} alt="Image 2" />
                </div>
                <div className="about-project-text">
                    <h2>Vision</h2>
                    <p>To create an environment where linguistic barriers don't hinder access to art. Our platform seeks to promote deeper understanding by addressing the challenges of language comprehension.</p>
                </div>
            </div>
            <div className="about-project-block">
                <div className="about-project-image">
                    <img src={FunctionalityImage} alt="Image 3" />
                </div>
                <div className="about-project-text">
                    <h2>Functionality</h2>
                    <p>Our website allows users to select a book, movie, or series. We then analyze the content and classify words into recognized difficulty levels: A1, A2, B1, B2, C1, C2. Users receive a structured breakdown of words from the content, aiding their learning process. Additionally, a dedicated section on our website permits users to input any text and receive a similar breakdown.</p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default AboutProject;
