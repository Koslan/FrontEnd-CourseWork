// fetch to get Films
import { database } from '../source/firebase';


//export const getMovies = () => {
//    return fetch('https://linguaflix-1edb6-default-rtdb.europe-west1.firebasedatabase.app/movies.json').then(response => response.json());
//}

export const getMovies = database.ref('movies');

// Fetch all movies ordered by their year of release
export const moviesByYear = database.ref('movies').orderByChild('year');

// Fetch all movies ordered by their keys (movie names, if used as keys)
export const moviesByKey = database.ref('movies').orderByKey();

// Fetch all movies released in the year 2020
export const moviesFrom2020 = database.ref('movies').orderByChild('year').equalTo(2020);

// Fetch movies released between the years 2015 and 2020
export const moviesFrom2015To2020 = database.ref('movies').orderByChild('year').startAt(2015).endAt(2020);

// Fetch only the first 5 movies
export const first5Movies = database.ref('movies').limitToFirst(5);

// Fetch the last 5 movies
export const last5Movies = database.ref('movies').limitToLast(5);