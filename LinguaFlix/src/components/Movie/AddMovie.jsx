import { useState, useEffect } from "react";
import axios from "axios";
import { DB_URL } from "../../store/firebase";
import "./AddMovie.css";
import sample from "./sampleMovie.jsx";
import { useSelector } from "react-redux";

const languages = [
  { label: "Ukrainian", value: "ukr" },
  { label: "Spanish", value: "spa" },
  { label: "English", value: "eng" },
  { label: "French", value: "fre" },
  { label: "German", value: "ger" },
  { label: "Italian", value: "ita" },
  { label: "Portuguese", value: "por" },
  { label: "Dutch", value: "dut" },
  { label: "Polish", value: "pol" },
];

const customLabels = {
  title: "Movie Title",
  description: "Movie Description",
  year: "Release Year",
  posterURL: "Poster URL",
  lexicalComplexity: "Lexical Complexity",
  languagePairs: "Language Pairs",
  vocabulary: "Vocabulary Word",
};

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  ...otherProps
}) => (
  <div className="InputWrapper">
    <label className="AddMovieLabel" htmlFor={name}>
      {label}
    </label>
    <input
      className="AddMovieInput"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...otherProps}
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="InputWrapper">
    <label className="AddMovieLabel" htmlFor={name}>
      {label}
    </label>
    <textarea
      className="AddMovieTextArea"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="InputWrapper">
    <label className="AddMovieLabel" htmlFor={name}>
      {label}
    </label>
    <select
      className="AddMovieSelect"
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const AddMovie = () => {
  const [formData, setFormData] = useState({
    description: "",
    languagePairs: sample.languagePairs,
    lexicalComplexity: "B1",
    posterURL: sample.posterURL,
    title: "",
    year: "",
    vocabByLanguage: {},
  });

  const [showPopup, setShowPopup] = useState(false);
  const [languagePairs, setLanguagePairs] = useState([]);
  const [newLanguagePair, setNewLanguagePair] = useState({
    lang1: "eng",
    lang2: "ukr",
  });

  const [inputText, setInputText] = useState(""); // This can be the movie description or any text related to the movie
  const [readabilityScores, setReadabilityScores] = useState({
    fleschKincaid: 0,
    gunningFog: 0,
  });

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) sidebar.style.display = "none";

    if (inputText) {
      calculateReadabilityScores(
        inputText,
        setReadabilityScores,
        countSyllables
      );
    }
  }, [inputText]);

  const addLanguagePair = () => {
    if (newLanguagePair.lang1 && newLanguagePair.lang2) {
      setLanguagePairs([
        ...languagePairs,
        `${newLanguagePair.lang1}:${newLanguagePair.lang2}`,
      ]);
      setNewLanguagePair({ lang1: "", lang2: "" });
    }
  };

  const [vocabByLanguage, setVocabByLanguage] = useState({});
  const [currentLanguagePair, setCurrentLanguagePair] = useState(null);
  const [currentLevel, setCurrentLevel] = useState("A1");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //////////
  const permissions = useSelector((state) => state.permissions);

  const isAdmin = permissions.role === "admin";
  // const isUser = permissions.role === 'user';
  // const isGuest = permissions.role === 'guest';

  const canAddMovie = isAdmin;
  /////////

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.description.length < 20) {
      alert("Description must be at least 20 characters.");
      return;
    }
    try {
      await axios.post(`${DB_URL}/movies.json`, formData);
      alert("Movie added successfully!");
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Error adding movie.");
    }
  };*/

  const updateVocabByLanguage = async () => {
    let processedText = processText(formData.description, englishLevelsMap);
    let updatedVocabByLanguage = {};

    for (let pair of formData.languagePairs) {
      let [sourceLang, targetLang] = pair.split(":");
      updatedVocabByLanguage[pair] = {};

      for (let level in processedText) {
        updatedVocabByLanguage[pair][level] = [];
        for (let word of processedText[level]) {
          let translation = await translateWord(word, sourceLang, targetLang); // Assuming translateWord returns a promise
          updatedVocabByLanguage[pair][level].push(`${word}: ${translation}`);
        }
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      vocabByLanguage: updatedVocabByLanguage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.description.length < 20) {
      alert("Description must be at least 20 characters.");
      return;
    }

    // Additional functionality before submission, e.g., calculating readability scores
    calculateReadabilityScores(
      formData.description,
      setReadabilityScores,
      countSyllables
    );

    try {
      /*  await axios.post(`${DB_URL}/movies.json`, {
        ...formData,

        readabilityScores: readabilityScores, // include readability scores in the data sent to the database
      });*/
      await updateVocabByLanguage();
      console.log(formData);
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Error adding movie.");
    }
  };

  const availableLangs1 = languages.filter(
    (lang) => lang.value !== newLanguagePair.lang2
  );

  const availableLangs2 = languages.filter(
    (lang) => lang.value !== newLanguagePair.lang1
  );

  return (
    <>
      {isAdmin ? (
        <div className="AddMovieContainer">
          <h2 className="AddMovieTitle">Add New Movie</h2>
          <form onSubmit={handleSubmit}>
            <InputField
              label={customLabels.title}
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder={customLabels.title}
              required
            />
            <TextAreaField
              label={customLabels.description}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={customLabels.description}
            />
            <InputField
              label={customLabels.year}
              name="year"
              type="number"
              value="1999"
              min="1900"
              max={new Date().getFullYear().toString()}
              onChange={handleInputChange}
              placeholder={customLabels.year}
              required
            />
            <InputField
              label={customLabels.posterURL}
              name="posterURL"
              type="URL"
              value={formData.posterURL}
              onChange={handleInputChange}
              placeholder={customLabels.posterURL}
              required
            />
            <SelectField
              label={customLabels.lexicalComplexity}
              name="lexicalComplexity"
              value={formData.lexicalComplexity}
              onChange={handleInputChange}
              options={[
                { label: "A1", value: "A1" },
                { label: "A2", value: "A2" },
                { label: "B1", value: "B1" },
                { label: "B2", value: "B2" },
                { label: "C1", value: "C1" },
                { label: "C2", value: "C2" },
              ]}
            />
            <SelectField
              label={customLabels.languagePairs}
              name="languagePairs"
              value={formData.languagePairs}
              onChange={handleInputChange}
              options={languagePairs.map((pair) => ({
                label: pair,
                value: pair,
              }))}
            />

            <div className="languagePairTabs">
              {languagePairs.map((pair) => (
                <button
                  key={pair}
                  className={`tabButton ${
                    currentLanguagePair === pair ? "active" : ""
                  }`}
                  onClick={() => setCurrentLanguagePair(pair)}
                >
                  {pair}
                </button>
              ))}
              <button class="tabButton" onClick={() => setShowPopup(true)}>
                +
              </button>
            </div>

            {/* Попап для добавления новой языковой пары */}
            {showPopup && (
              <div className="popup">
                <h3>Add Language Pair</h3>
                <div className="langPairRow">
                  <SelectField
                    label="Lang 1"
                    name="lang1"
                    value={newLanguagePair.lang1}
                    onChange={(e) =>
                      setNewLanguagePair({
                        ...newLanguagePair,
                        lang1: e.target.value,
                      })
                    }
                    options={availableLangs1}
                  />
                  <SelectField
                    label="Lang 2"
                    name="lang2"
                    value={newLanguagePair.lang2}
                    onChange={(e) =>
                      setNewLanguagePair({
                        ...newLanguagePair,
                        lang2: e.target.value,
                      })
                    }
                    options={availableLangs2}
                  />
                  <button class="tabButton" onClick={addLanguagePair}>
                    Add pair
                  </button>
                  <button onClick={() => setShowPopup(false)}>Сlose</button>
                </div>
              </div>
            )}

            <br></br>
            <br></br>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
              rows="5"
            />
            <br></br>
            <br></br>
            <button className="AddMovieButton" type="submit">
              Add Movie
            </button>
          </form>
        </div>
      ) : (
        <div>This tab is only available to the administrator.</div>
      )}
      ;
    </>
  );
};
export default AddMovie;
