import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Footer from './components/Footer/Footer';
import AddMovie from './components/Movie/AddMovie';
import EditMovie from './components/Movie/EditMovie';
import Header from './components/Header/Header';
import Sidebar from './components/Main/Sidebar.jsx';
import MovieDetails from './components/Main/MovieDetails';
import MoviesPage from './pages/MoviesPage';
import AboutTeam from './pages/AboutTeam';
import AboutProject from './pages/AboutProject';
import AddMovieRequest from './components/Footer/AddMovieRequest';
import { DB_URL } from './store/firebase';
import Login from './components/Auth/Login';
import ProfileForm from './components/Header/ProfileForm';
import ChangePassword from './components/Header/ChangePassword';
import TextProcessor from './components/Text/TextProcessor'; // Укажите правильный путь к файлу

import './store/i18n.js';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', englishLevel: '', status: '' });

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
    <Provider store={store}>
      <Router>
        <Header onSearch={handleSearch} results={filteredMovies} isVisible={isDropdownVisible} />
        <div className="main-content">
          <Sidebar />
          <Routes>
            {isLoading ? (
              <Route path="/" element={<div>Loading...</div>} />
            ) : (
              <>
                <Route path="/" element={
                  <div>
                    {isDropdownVisible && <div className="search-results">
                      {filteredMovies.map(movie => (
                        <div key={movie.id}>
                          <Link to={`/movie/${movie.id}`}>{movie.name}</Link>
                        </div>
                      ))}
                    </div>}
                  </div>
                } />
                <Route path="/" element={<MoviesPage movies={movies} />} />  
                <Route path="/movies" element={<MoviesPage movies={movies} />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/about_team" element={<AboutTeam />} />
                <Route path="/about_project" element={<AboutProject />} />
                <Route path="/add_movie" element={<AddMovie />} />
                <Route path="/edit_movie/:id" element={<EditMovie />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<ProfileForm user={user} setUser={setUser} />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/text_processor" element={<TextProcessor />} />
              </>
            )}
          </Routes>
        </div>
        <AddMovieRequest />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;