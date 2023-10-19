import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { DB_URL } from './store/firebase.js';



const AddMovie = () => {
    const [movieName, setMovieName] = useState('');
    const [movieYear, setMovieYear] = useState('');
    const [email, setEmail] = useState('');

    
    const handleMovieNameChange = (e) => {
        setMovieName(e.target.value);
    };

    const handleMovieYearChange = (e) => {
        setMovieYear(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSendClick = () => {
        saveMovieToDatabase(movieName, movieYear, email);
    };

    const saveMovieToDatabase = (movieName, movieYear, email) => {
        const database = ref(DB_URL);
        const moviesRef = ref(database, 'movies');

        const newMovieKey = push(moviesRef).key;

        if (newMovieKey) {
            const movieData = {
                name: movieName,
                year: movieYear,
                email: email, 
            };

            set(ref(database, `movies/${newMovieKey}`), movieData)
                .then(() => {
                    console.log('Фильм успешно сохранен в базе данных.');
                })
                .catch((error) => {
                    console.error('Ошибка при сохранении фильма:', error);
                });
        }
    };

    return (
        <div className='addmovie__container'>
            <div className='addmovie__info'>
                <h1>Didn't find the movie you want?</h1>
                <h2>Fill out a form, and we will inform you when it is available in our library.</h2>
            </div>
            <form className='form__container'>
                <div className='forms'>
                    <div>
                        <input
                            type="text"
                            placeholder="Movie Name"
                            id="movieName"
                            name='movieName'
                            value={movieName}
                            onChange={handleMovieNameChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Year"
                            id="movieYear"
                            name="movieYear"
                            value={movieYear}
                            onChange={handleMovieYearChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Your email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                </div>
                <button onClick={handleSendClick}>Send</button>
            </form>
        </div>
    );
};

export default AddMovie;
