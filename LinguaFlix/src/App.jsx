import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import MovieDetails from './MovieDetails';
import MoviesPage from './MoviesPage';
import AboutTeam from './AboutTeam';
import AboutProject from './AboutProject';
import { DB_URL } from './store/firebase';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  const handleSearch = (searchValue) => {
    console.log("search:", searchValue);
    if (searchValue.trim().length === 0) {
        setFilteredMovies([]);
        setIsDropdownVisible(false);
        return;
    }

    const filtered = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredMovies(filtered);
    setIsDropdownVisible(true); 
}



return (
  <Router>
    <Header onSearch={handleSearch} results={filteredMovies} isVisible={isDropdownVisible} />
    <div className="main-content">
      <Sidebar />
      <Routes>
        {isLoading ? (
          <Route path="/" element={<div>Loading...</div>} />
        ) : (
          <>
            <Route path="/" element={<div />} />
            <Route path="/movies" element={<MoviesPage movies={movies}/>} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/about_team" element={<AboutTeam />} /> 
            <Route path="/about_project" element={<AboutProject />} /> 
          </>
        )}
      </Routes>
    </div>
    <Footer />
  </Router>
);
}

export default App;
