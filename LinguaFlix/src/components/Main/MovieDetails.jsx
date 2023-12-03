import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./movieDetails.css";
import LevelButton from "./LevelButton";
import Table from "./Table";
import { DB_URL } from "../../store/firebase";
import ToggleButton from "./ToggleButton";
import {
  processText,
  translateWord,
  generateTest,
  formatSubtitles,
} from "../Text/TextUtilities"; // Import necessary functions
import { languages } from "../../store/Constants"; // Import language constants if necessary
import { englishLevelsMap } from "../Text/english"; // Import English levels map if applicable

function MovieDetails() {
  document.querySelector(".sidebar").style.display = "flex";

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Dictionary");
  const [sortedWords, setSortedWords] = useState({}); // State for processed words

  const [sourceLang, setSourceLang] = useState("eng");
  const [transLang, setTransLang] = useState("ukr");
  const [translations, setTranslations] = useState({});

  const levels = ["C2", "C1", "B2", "B1", "A2", "A1"];
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState({
    firstLanguage: "eng",
    secondLanguage: "ukr",
  });
  const [testQuestions, setTestQuestions] = useState([]); // State for test questions

  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${DB_URL}/movies/${id}.json`);
        let text = response.data.subtitleText;
        const formattedSubtitles = formatSubtitles(text);
        setMovie({ ...response.data, subtitleText: formattedSubtitles });
        //console.log(movie);
        processMovieText(response.data.subtitleText);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch movie details");
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const newTranslations = {};

    Object.keys(sortedWords).forEach((level) => {
      newTranslations[level] = sortedWords[level].map((word) =>
        translateWord(word, sourceLang, transLang)
      );
    });

    setTranslations(newTranslations);
  }, [sourceLang, transLang, sortedWords]);

  // Function to process movie text
  const processMovieText = (text) => {
    // console.log(text);
    if (text) {
      const processedWords = processText(text, englishLevelsMap);
      setSortedWords(processedWords);

      console.log(selectedLevel, processedWords);
      const tests = generateTest("C1", text, processedWords);
      console.log("tests", tests);
      setTestQuestions(tests);
    }
  };

  const renderTranslations = () => {
    const wordCount = translations[selectedLevel]?.length || 0;

    return (
      <div className="levelTables" key={selectedLevel}>
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th colSpan="1" style={{ textAlign: "center" }}>
                {wordCount} Word
              </th>
              <th>Translation</th>
            </tr>
          </thead>
          <tbody>
            {wordCount > 0 ? (
              sortedWords[selectedLevel].map((word, index) => (
                <tr key={word}>
                  <td>{word}</td>
                  <td>{translations[selectedLevel][index]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No words found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  const renderTests = () => {
    const tests = testQuestions;

    console.log(testQuestions);
    return tests.map((q, index) => (
      <div key={index} className="testQuestion">
        <p className="testQuestionP">{q.questionText}</p>
        {q.options.map((opt, optIndex) => (
          <button key={optIndex} className="testQuestionButton">
            {opt}
          </button>
        ))}
      </div>
    ));
  };

  // Handle changes in language selection
  const handleLanguageChange = (e, type) => {
    setSelectedLanguages((prev) => ({ ...prev, [type]: e.target.value }));
  };

  // Render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Dictionary":
        return <div className="translations">{renderTranslations()}</div>;
      case "MovieScript":
        return (
          <div>
            {movie?.subtitleText.split("\n\n").map((paragraph, index) => (
              <p key={index}>
                {paragraph.split("\n").map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>
        );
      case "Test":
        return <div className="tests">{renderTests()}</div>;
      default:
        return null;
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }


  const handleSubmit = () => {
    console.log("Accepted button clicked.");
    setSourceLang(selectedLanguages.firstLanguage);
    setTransLang(selectedLanguages.secondLanguage);
  };

  return (
    <>
      <div className="movie-details">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img src={movie.posterURL} alt="poster" width={264} height={380} />
          <div className="details-text">
            <h1>{movie.title}</h1>
            <p className="details-text-year">{movie.year}</p>
            <h5>About film:</h5>
            <h4>{movie.description}</h4>
          </div>
        </div>
        <div className="movie-details-linkes">
          <h3>You can watch this movie on these sites</h3>
          <div className="movie-details-link">
            <a href="#">
              {" "}
              <p>Netflix</p>
            </a>
            <a href="#">
              <p>Apple</p>
            </a>
            <a href="#">HDrezka</a>
            <a href="#">Prime</a>
          </div>
        </div>
        <div className="selectedLanguage">
          <label>
            <h3>First Language</h3>
            <select
              value={selectedLanguages.firstLanguage}
              onChange={(e) => handleLanguageChange(e, "firstLanguage")}
            >
              <option value="eng">English</option>
            </select>
          </label>
          <label>
            <h3>Second Language</h3>
            <select
              value={selectedLanguages.secondLanguage}
              onChange={(e) => handleLanguageChange(e, "secondLanguage")}
            >
              <option value="ukr">Ukrainian</option>
              <option value="spa">Spanish</option>
            </select>
          </label>
          <button type="submit" onClick={handleSubmit}>
            Accept
          </button>
        </div>
        <div>
          <ToggleButton setActiveTab={setActiveTab} />
        </div>
        <div className="level_button">
          <LevelButton levels={levels} setSelectedLevel={setSelectedLevel} />
        </div>
        {renderTabContent()}
      </div>
    </>
  );
}

export default MovieDetails;
