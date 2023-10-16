import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import MovieDetails from './MovieDetails';
import { DB_URL } from './store/firebase';

function App() {
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
  }, []);

  return (
    <Router>
      <Header />
      <div className="main-content">
        <Sidebar />
        <Routes>
          {isLoading ? (
            <Route path="/" element={<div>Loading...</div>} />
          ) : null}
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;