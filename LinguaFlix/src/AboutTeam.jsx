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
            linkedin: 'https://www.linkedin.com/in/kburiak/',
            github: 'https://github.com/Koslan',
        },
        about: 'Kostiantyn Buriak is a competent Full Stack Developer, weaving together backend, frontend, and DevOps expertise with ease. Mastery in Java, HTML, CSS, JS, React, Redux, and Firebase ensures he`s equipped to engineer intricate UI components and cohesive web platforms. While he`s recognized as a certified Salesforce Developer, his vast experience speaks to a broader technological depth, with projects ranging from app integrations to streamlining CI/CD processes using GitHub actions. An esteemed graduate from the Odessa National Academy of Communications and fluent in English (B2), Kostiantyn is a valuable asset to any development venture.',
    },
    {
        name: 'Elmira Volokhova',
        photo: Elmira,
        socialLinks: {
            linkedin: 'https://www.facebook.com/johndoe',
            github: 'https://github.com/Elmimira',
        },
        about: 'Elmira Volokhova is an aspiring front-end developer with a passion for creating attractive and user-friendly web interfaces. Proficient in HTML, CSS, JavaScript and modern front-end libraries such as React, he strives to create exceptional user experiences. With a bachelor`s degree in mathematics teaching and a keen eye for design, Elmira strives to contribute to web development projects and bring them to life.',
    },
    {
        name: 'Olena Stovolosova',
        photo: Olena,
        socialLinks: {
            linkedin: 'https://www.facebook.com/johndoe',
            github: 'https://github.com/Stovolosova',
        },
        about: 'Olena Stovolosova is an aspiring Front-End Developer with a passion for creating intuitive and visually appealing web experiences. Proficient in HTML, CSS, and JavaScript, Olena is dedicated to crafting responsive and user-friendly websites. She has also gained proficiency in popular front-end frameworks, including React, and has a keen eye for design, ensuring a seamless user interface. Olena is a quick learner and a team player, always eager to collaborate with others to bring creative ideas to life. ',
    },
    {
        name: 'Anna Buriak',
        photo: Anna,
        socialLinks: {
            linkedin: 'https://www.facebook.com/johndoe',
            github: 'https://www.twitter.com/johndoe',
        },
        about: 'Anna Buriak is a budding web designer with a passion for crafting visually appealing and user-friendly digital experiences. Her journey into the world of web design began with a fascination for the intersection of creativity and technology. She is dedicated to honing my skills in HTML, CSS, and responsive design to bring my creative visions to life. She believe that every website should not only look great but also provide a seamless and engaging user experience. She is excited to learn, grow, and contribute to the ever-evolving field of web design.',
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
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            Linkedin
                        </a>
                        <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        Github
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
