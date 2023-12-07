import { useState, useEffect } from "react";
import "./TextProcessor.css";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { processText, translateWord, generateTest } from "./TextUtilities";
import { languages } from "../../store/Constants";
import {
  calculateReadabilityScores,
  countSyllables,
  calculateCollocations,
  calculateApproximateLevel,
} from "./TextAnalysis";
import { englishLevelsMap } from "./english";

const TextProcessor = () => {
  const [inputText, setInputText] = useState("");
  const [sortedWords, setSortedWords] = useState({});
  const [sourceLang, setSourceLang] = useState("eng");
  const [transLang, setTransLang] = useState("ukr");
  const [activeTab, setActiveTab] = useState(1);
  const [wordFrequencies, setWordFrequencies] = useState({});
  const [readabilityScores, setReadabilityScores] = useState({
    fleschKincaid: 0,
    gunningFog: 0,
  });

  useEffect(() => {
    if (inputText) {
      calculateWordFrequencies(inputText);
      calculateReadabilityScores(
        inputText,
        setReadabilityScores,
        countSyllables
      );
    }
  }, [inputText]);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) sidebar.style.display = "none";
  }, []);

  const handleProcess = () => {
    if (sourceLang && transLang) {
      const processedWords = processText(inputText, englishLevelsMap);
      setSortedWords(processedWords);
    } else {
      alert("Please select both source and translation languages.");
    }
  };

  const renderLanguageOptions = () =>
    languages.map((lang) => (
      <option key={lang.value} value={lang.value}>
        {lang.label}
      </option>
    ));

  const calculateWordFrequencies = () => {
    const words = inputText
      .split(/\W+/)
      .filter(Boolean)
      .filter((word) => !/^\d+$/.test(word));
    const frequencies = {};
    words.forEach((word) => {
      word = word.toLowerCase();
      if (frequencies[word]) {
        frequencies[word] += 1;
      } else {
        frequencies[word] = 1;
      }
    });
    setWordFrequencies(frequencies);
  };

  const renderVocabularyCore = () =>
    Object.keys(sortedWords).map((level) => (
      <div key={level}>
        <h3>{level}</h3>
        <p>
          {sortedWords[level].length > 0
            ? sortedWords[level].join(", ")
            : "No words found"}
        </p>
      </div>
    ));

  const renderTranslations = () =>
    Object.keys(sortedWords).map((level) => (
      <div className="levelTables" key={level}>
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
    ));

  const renderTests = () => {
    const tests = generateTest("C1", inputText, sortedWords); // level should probably be dynamic
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

  const renderSemanticCore = () => (
    <div>
      <h3>Semantic Core</h3>
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(wordFrequencies).map(([word, count]) => (
            <tr key={word}>
              <td>{word}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFrequencyAnalysis = () => (
    <div>
      <h3>Frequency Analysis</h3>
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(wordFrequencies)
            .sort((a, b) => b[1] - a[1]) // Sort by frequency in descending order
            .map(([word, freq]) => (
              <tr key={word}>
                <td>{word}</td>
                <td>{freq}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderCollocationAnalysis = () => (
    <div>
      <h3>Collocation Analysis</h3>
      <table>
        <thead>
          <tr>
            <th>Collocation</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {calculateCollocations(inputText).map((collocation, index) => (
            <tr key={index}>
              <td>{collocation.pair}</td>
              <td>{collocation.freq}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderReadabilityScore = () => (
    <div>
      <h3>Readability Score</h3>
      <p>Flesch-Kincaid: {readabilityScores.fleschKincaid}</p>
      <p>Gunning Fog: {readabilityScores.gunningFog}</p>
      <p>
        {calculateApproximateLevel(
          readabilityScores.fleschKincaid,
          readabilityScores.gunningFog
        )}
      </p>
    </div>
  );

  return (
    <div className="textProcessorContainer">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text here..."
        rows="5"
      />

      <div className="languageSelectors">
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

      <button className="process-button" onClick={handleProcess}>
        Process
      </button>

      <div className="tabs">
        <button className="textTab" onClick={() => setActiveTab(1)}>
          Vocabulary Core
        </button>
        <button className="textTab" onClick={() => setActiveTab(2)}>
          Translations
        </button>

        <button className="textTab" onClick={() => setActiveTab(4)}>
          Full Text
        </button>
        <button className="textTab" onClick={() => setActiveTab(5)}>
          Semantic Core
        </button>
        <button className="textTab" onClick={() => setActiveTab(6)}>
          Frequency Analysis
        </button>
        <button className="textTab" onClick={() => setActiveTab(7)}>
          Collocation Analysis
        </button>
        <button className="textTab" onClick={() => setActiveTab(8)}>
          Readability Score
        </button>
      </div>

      {activeTab === 1 && (
        <div className="vocabularyCore">{renderVocabularyCore()}</div>
      )}
      {activeTab === 2 && (
        <div className="translations">{renderTranslations()}</div>
      )}
      {activeTab === 3 && <div className="tests">{renderTests()}</div>}
      {activeTab === 4 && (
        <div className="fullText">
          <p>{inputText}</p>
        </div>
      )}
      {activeTab === 5 && (
        <div className="semanticCore">{renderSemanticCore()}</div>
      )}
      {activeTab === 6 && (
        <div className="frequencyAnalysis">{renderFrequencyAnalysis()}</div>
      )}
      {activeTab === 7 && (
        <div className="collocationAnalysis">{renderCollocationAnalysis()}</div>
      )}
      {activeTab === 8 && (
        <div className="readabilityScore">{renderReadabilityScore()}</div>
      )}
    </div>
  );
};

export default TextProcessor;
