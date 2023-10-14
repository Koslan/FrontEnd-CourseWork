import Header from './Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import MovieDetails from './MovieDetails';
import "./App.css"



function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Sidebar />
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
