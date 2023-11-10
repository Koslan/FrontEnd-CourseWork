import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Nav() {
  return (
    <nav>
      <Link to="/text_processor">Text Processor</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/add_movie">Add Movie</Link>
      <Link to="/about_team">About team</Link>
      <Link to="/about_project">About Project</Link>
    </nav>
  );
}

export default Nav;
