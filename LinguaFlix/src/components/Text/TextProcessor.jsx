import { useState } from "react";
import { englishLevelsMap } from "./english"; // Corrected import statement
import "./TextProcessor.css";
import "../../App.css";

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

const TextProcessor = () => {
  const [inputText, setInputText] = useState("");
  const [sortedWords, setSortedWords] = useState({});
  const [sourceLang, setSourceLang] = useState("eng");
  const [transLang, setTransLang] = useState("ukr");

  document.querySelector(".sidebar").style.display = "none";

  const handleSubmit = () => {
    // Ensure both source and translation languages are selected before processing
    if (sourceLang && transLang) {
      const processedWords = processText(inputText);
      setSortedWords(processedWords);
    } else {
      alert("Please select both source and translation languages.");
    }
  };

  const processText = (text) => {
    const words = text.split(/\W+/).filter((word) => isNaN(word) && word);

    const proficiencyLevels = {
      A1: new Set(),
      A2: new Set(),
      B1: new Set(),
      B2: new Set(),
      C1: new Set(),
      C2: new Set(),
      unsorted: new Set(),
    };

    words.forEach((word) => {
      const level = englishLevelsMap[word.toLowerCase()];

      if (level) {
        proficiencyLevels[level].add(word); // use add() for sets
      } else {
        proficiencyLevels.unsorted.add(word); // use add() for sets
      }
    });

    // Convert the sets back to sorted arrays
    Object.keys(proficiencyLevels).forEach((level) => {
      proficiencyLevels[level] = [...proficiencyLevels[level]].sort();
    });

    return proficiencyLevels;
  };

  const renderLanguageOptions = () => {
    return languages.map((lang) => (
      <option key={lang.value} value={lang.value}>
        {lang.label}
      </option>
    ));
  };

  const translateWord = (word, sourceLang, transLang) => {
    // This is a dummy translation function.
    // In a real scenario, you would use an API or a library to get translations.
    return word + "_trans";
  };

  return (
    <div className="textProcessorContainer">
      <div className="languageSelectors">
        {" "}
        {/* Add a div wrapper for the selects */}
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          <option value="" disabled>
            Select source language
          </option>
          {renderLanguageOptions()}
        </select>
        <select
          value={transLang}
          onChange={(e) => setTransLang(e.target.value)}
        >
          <option value="" disabled>
            Select translation language
          </option>
          {renderLanguageOptions()}
        </select>
      </div>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text here..."
        rows="5"
      ></textarea>
      <button onClick={handleSubmit}>Process</button>

      {Object.keys(sortedWords).map((level) => (
        <div class="levelTables" key={level}>
          <h3>{level}</h3>
          <table>
            <thead>
              <tr>
                <th>Word</th>
                <th>Translation</th>
              </tr>
            </thead>
            <tbody>
              {sortedWords[level].length > 0 ? (
                sortedWords[level].map((word) => (
                  <tr key={word}>
                    <td>{word}</td>
                    <td>{translateWord(word, sourceLang, transLang)}</td>
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
      ))}
    </div>
  );
};

export default TextProcessor;