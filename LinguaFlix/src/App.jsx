import { useState, useEffect } from 'react';
import './App.css';
import Body from './components/Body/Body.jsx';
import Footer from './components/Footer';
import { DB_URL } from './store/firebase';


function App() {
  console.log('app');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      console.debug("Fetching movies...");
      const response = await fetch(`${DB_URL}/movies.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch movies.');
      }
      const responseData = await response.json();

      const loadedMovies = [];
      for (const key in responseData) {
        loadedMovies.push({
          id: key,
          name: responseData[key].title,
          year: responseData[key].year,
          description: responseData[key].description,
          img: responseData[key].posterURL,
          vocab: responseData[key].vocabByLanguage,
        });
      }

      setMovies(loadedMovies);
      setIsLoading(false);
    }

    fetchMovies().catch((error) => {
      console.error("Error fetching movies:", error);
      setIsLoading(false);
    });
  },[]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            {movies.length > 0 && movies.map((movie) => (
              <Body movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      )}
      <Footer />
    </>
  )
}

export default App;