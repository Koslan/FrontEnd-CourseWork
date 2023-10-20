import React from 'react';
import './App.css';

import Elmira from './assets/elmira.png';
import Kostintyn from './assets/kostintyn.png';
import Olena from './assets/olena.png';
import Anna from './assets/anna.png';

const teamMembers = [
    {
        name: 'Kostintyn Buriak',
        photo: Kostintyn,
        socialLinks: {
            facebook: 'https://www.facebook.com/johndoe',
            twitter: 'https://www.twitter.com/johndoe',
        },
        about: 'Andrew got started with web development by making sites with WordPress, and eventually tricked himself into doing JavaScript. His favorite pastime is karaoke. Andrew is either a Disney villain or a Disney princess, depending on the day.',
    },
    {
        name: 'Elmira Volokhova',
        photo: Elmira,
        socialLinks: {
            facebook: 'https://www.facebook.com/johndoe',
            twitter: 'https://www.twitter.com/johndoe',
        },
        about: 'Dan got into programming after he accidentally discovered Visual Basic inside Microsoft PowerPoint. He has found his true calling in turning Sebastian’s tweets into long-form blog posts. Dan occasionally wins at Fortnite by hiding in a bush until the game ends.',
    },
    {
        name: 'Olena Stovolosova',
        photo: Olena,
        socialLinks: {
            facebook: 'https://www.facebook.com/johndoe',
            twitter: 'https://www.twitter.com/johndoe',
        },
        about: 'Eli got into programming after he got suspended from middle school for hacking. He has been working on React and React Native since 2017. He enjoys eating treats, especially ice cream and apple pie. You can find Eli trying quirky activities like parkour, indoor skydiving, and aerial silks.',
    },
    {
        name: 'Anna Buriak',
        photo: Anna,
        socialLinks: {
            facebook: 'https://www.facebook.com/johndoe',
            twitter: 'https://www.twitter.com/johndoe',
        },
        about: 'Andrey started his career as a designer and then gradually transitioned into web development. After joining the React Data team at Meta he worked on adding an incremental JavaScript compiler to Relay, and then later on, worked on removing the same compiler from Relay. Outside of work, Andrey likes to play music and engage in various sports.',
    },
];

function AboutTeam() {

    document.querySelector('.sidebar').style.display = 'none';

    
    return (
        <div className="about-team-container">
        <h1>About LinguaFlix team</h1>
        <div className='about-team'>
            {teamMembers.map((member, index) => (
                <div className="team-card" key={index}>
                    <img src={member.photo} alt={member.name} />
                    <h2>{member.name}</h2>
                    <div className="social-links">
                        <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            Facebook
                        </a>
                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            Twitter
                        </a>
                    </div>
                    <p>{member.about}</p>
                </div>
            ))}
            </div>
        </div>
    );
}

export default AboutTeam;
