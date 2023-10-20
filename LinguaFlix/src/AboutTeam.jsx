import React from 'react';
import './App.css';

const teamMembers = [
    {
        name: 'Kostintyn Buriak',
        photo: 'https://firebasestorage.googleapis.com/v0/b/linguaflix-1edb6.appspot.com/o/kostintyn.png?alt=media&token=7cb87bcc-58c7-4346-a637-9cc879334707&_gl=1*18kqeg0*_ga*MTQ3MjcyMjgyNS4xNjk3NzE4NzU1*_ga_CW55HF8NVT*MTY5Nzc3ODM4Mi41LjEuMTY5Nzc3ODUyNC4zMC4wLjA.',
        socialLinks: {
            facebook: 'https://www.facebook.com/johndoe',
            twitter: 'https://www.twitter.com/johndoe',
        },
        about: 'Andrew got started with web development by making sites with WordPress, and eventually tricked himself into doing JavaScript. His favorite pastime is karaoke. Andrew is either a Disney villain or a Disney princess, depending on the day.',
    },
    {
        name: 'Elmira Volokhova',
        photo: 'https://firebasestorage.googleapis.com/v0/b/linguaflix-1edb6.appspot.com/o/elmira.png?alt=media&token=96efaa26-f5ec-41ad-adf1-162c503ee092&_gl=1*ow40c3*_ga*MTQ3MjcyMjgyNS4xNjk3NzE4NzU1*_ga_CW55HF8NVT*MTY5Nzc3ODM4Mi41LjEuMTY5Nzc3ODUyMC4zNC4wLjA.',
        socialLinks: {
            facebook: 'https://www.facebook.com/johndoe',
            twitter: 'https://www.twitter.com/johndoe',
        },
        about: 'Dan got into programming after he accidentally discovered Visual Basic inside Microsoft PowerPoint. He has found his true calling in turning Sebastian’s tweets into long-form blog posts. Dan occasionally wins at Fortnite by hiding in a bush until the game ends.',
    },
    {
        name: 'Olena Stovolosova',
        photo: 'https://firebasestorage.googleapis.com/v0/b/linguaflix-1edb6.appspot.com/o/olena.png?alt=media&token=f3c240ff-f859-4c9b-abad-7ee7a54c3249&_gl=1*1m456o2*_ga*MTQ3MjcyMjgyNS4xNjk3NzE4NzU1*_ga_CW55HF8NVT*MTY5Nzc3ODM4Mi41LjEuMTY5Nzc3ODUyNy4yNy4wLjA.',
        socialLinks: {
            facebook: 'https://www.facebook.com/johndoe',
            twitter: 'https://www.twitter.com/johndoe',
        },
        about: 'Eli got into programming after he got suspended from middle school for hacking. He has been working on React and React Native since 2017. He enjoys eating treats, especially ice cream and apple pie. You can find Eli trying quirky activities like parkour, indoor skydiving, and aerial silks.',
    },
    {
        name: 'Anna Buriak',
        photo: 'https://firebasestorage.googleapis.com/v0/b/linguaflix-1edb6.appspot.com/o/anna.png?alt=media&token=d7052429-f47e-48e9-a76c-45d38b067461&_gl=1*1xrslbo*_ga*MTQ3MjcyMjgyNS4xNjk3NzE4NzU1*_ga_CW55HF8NVT*MTY5Nzc3ODM4Mi41LjEuMTY5Nzc3ODQ5NC42MC4wLjA.',
        socialLinks: {
            facebook: 'https://www.facebook.com/johndoe',
            twitter: 'https://www.twitter.com/johndoe',
        },
        about: 'Andrey started his career as a designer and then gradually transitioned into web development. After joining the React Data team at Meta he worked on adding an incremental JavaScript compiler to Relay, and then later on, worked on removing the same compiler from Relay. Outside of work, Andrey likes to play music and engage in various sports.',
    },
];

function AboutTeam() {
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
