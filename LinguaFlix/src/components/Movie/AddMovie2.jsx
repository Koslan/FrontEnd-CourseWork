import { useState, useEffect } from "react";
import { getDatabase, ref, push, set } from "firebase/database";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    releaseYear: "",
    description: "",
    posterURL: "",
    lexicalComplexity: "A1",
    languagePairs: [],
    subtitleText: "",
  });

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) sidebar.style.display = "none";
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleMultiSelectChange = (e) => {
    const options = e.target.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setMovie({ ...movie, languagePairs: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const db = getDatabase();
    const movieRef = ref(db, "movies");
    const newMovieRef = push(movieRef);
    set(newMovieRef, movie)
      .then(() => {
        alert("Movie added successfully!");
        setMovie({
          title: "",
          releaseYear: "",
          description: "",
          posterURL: "",
          lexicalComplexity: "A1",
          languagePairs: [],
          subtitleText: "",
        });
      })
      .catch((error) => {
        alert("Error adding movie: " + error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-3">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Title"
        />
      </div>

      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          name="releaseYear"
          value={movie.releaseYear}
          onChange={handleChange}
          placeholder="Release Year"
        />
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          name="description"
          value={movie.description}
          onChange={handleChange}
          placeholder="Movie Description"
        ></textarea>
      </div>

      <div className="mb-3">
        <input
          type="url"
          className="form-control"
          name="posterURL"
          value={movie.posterURL}
          onChange={handleChange}
          placeholder="Poster URL"
        />
      </div>

      <div className="mb-3">
        <select
          className="form-select"
          name="lexicalComplexity"
          value={movie.lexicalComplexity}
          onChange={handleChange}
        >
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>
      </div>

      <div className="mb-3">
        <select
          multiple={true}
          className="form-select"
          value={movie.languagePairs}
          onChange={handleMultiSelectChange}
        >
          <option value="eng:urk">English-Ukrainian</option>
          <option value="urk:eng">Ukrainian-English</option>
          <option value="eng:spa">English-Spanish</option>
        </select>
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          name="subtitleText"
          value={movie.subtitleText}
          onChange={handleChange}
          placeholder="Subtitle Text"
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Add Movie
      </button>
    </form>
  );
};

export default AddMovie;
