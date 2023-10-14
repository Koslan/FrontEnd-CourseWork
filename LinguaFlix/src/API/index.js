// fetch to get Films
export const getMovies = () => {
    return fetch('https://linguaflix-1edb6-default-rtdb.europe-west1.firebasedatabase.app/movies.json').then(response => response.json());
}
