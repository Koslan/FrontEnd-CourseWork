import { useState, useEffect } from "react";
import { englishLevelsMap } from "./english"; // Corrected import statement
import "./TextProcessor.css";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [activeTab, setActiveTab] = useState(1);
  const [wordFrequencies, setWordFrequencies] = useState({});
  const [readabilityScores, setReadabilityScores] = useState({
    fleschKincaid: 0,
    gunningFog: 0,
  });

  useEffect(() => {
    if (inputText) {
      calculateWordFrequencies();
      calculateReadabilityScores(inputText);
    }
  }, [inputText]);

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

  const renderPartsOfSpeech = () => {
    const taggedWords = tagPartsOfSpeech(inputText);
    return taggedWords.map((word, index) => (
      <span key={index} className={`tag-${word.tag}`}>
        {word.word}{" "}
      </span>
    ));
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

  const generateTest = (level) => {
    const wordsFromLevel = sortedWords[level] || [];
    const questions = [];

    if (wordsFromLevel.length === 0) return questions;

    for (let i = 0; i < 10 && i < wordsFromLevel.length; i++) {
      const correctWord = wordsFromLevel[i];
      const options = [correctWord];

      // Generate random options for the question
      while (options.length < 4) {
        const randomWord =
          wordsFromLevel[Math.floor(Math.random() * wordsFromLevel.length)];
        if (!options.includes(randomWord)) {
          options.push(randomWord);
        }
      }

      options.sort(() => Math.random() - 0.5);

      // Extract the portion of the sentence around the correctWord, delimited by punctuation
      const punctuation = /([.,?!;:])/;
      const sentences = inputText.split(punctuation);
      let sentenceWithWord = "";
      for (const sentence of sentences) {
        if (sentence.includes(correctWord)) {
          sentenceWithWord = sentence.trim();
          break;
        }
      }

      const questionText = sentenceWithWord.replace(
        new RegExp(`\\b${correctWord}\\b`, "i"),
        "..."
      );

      questions.push({
        questionText: questionText,
        options: options,
        correctAnswer: correctWord,
      });
    }

    return questions;
  };

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

  const calculateReadabilityScores = (text) => {
    console.log("text", text);
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const words = text.split(/\s+/).filter(Boolean);
    let totalSyllables = 0;
    let complexWords = 0;

    words.forEach((word) => {
      const syllables = countSyllables(word);
      totalSyllables += syllables;
      if (syllables >= 3) {
        complexWords += 1;
      }
    });

    const totalWords = words.length;
    const totalSentences = sentences.length;

    const fleschKincaid =
      0.39 * (totalWords / totalSentences) +
      11.8 * (totalSyllables / totalWords) -
      15.59;
    const gunningFog =
      0.4 * (totalWords / totalSentences + 100 * (complexWords / totalWords));

    setReadabilityScores({
      fleschKincaid:
        typeof fleschKincaid === "number" ? fleschKincaid.toFixed(2) : "N/A",
      gunningFog:
        typeof gunningFog === "number" ? gunningFog.toFixed(2) : "N/A",
    });
  };

  const countSyllables = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) {
      return 1;
    }
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
    word = word.replace(/^y/, "");
    return word.match(/[aeiouy]{1,2}/g)?.length;
  };

  const calculateCollocations = (text) => {
    const words = text.split(/\W+/).filter(Boolean);
    const collocations = {};

    for (let i = 0; i < words.length - 1; i++) {
      const pair = `${words[i]} ${words[i + 1]}`;
      collocations[pair] = (collocations[pair] || 0) + 1;
    }

    // Convert to an array and sort by frequency
    const sortedCollocations = Object.entries(collocations)
      .sort((a, b) => b[1] - a[1])
      .map(([pair, freq]) => ({ pair, freq }));

    return sortedCollocations;
  };

  const tagPartsOfSpeech = (text) => {
    console.log("text", text);
    const words = text.split(/\W+/).filter(Boolean);

    return words.map((word) => {
      const lowerCaseWord = word.toLowerCase();
      for (const [tag, wordList] of Object.entries(tags)) {
        if (wordList.includes(lowerCaseWord)) {
          return { word, tag };
        }
      }
      return { word, tag: "unknown" };
    });
  };

  function calculateApproximateLevel(fleschKincaid, gunningFog) {
    const fleschKincaidNumber = parseFloat(fleschKincaid);
    const gunningFogNumber = parseFloat(gunningFog);

    if (isNaN(fleschKincaidNumber) && isNaN(gunningFogNumber)) {
      return "Approximate level: can't be calculated";
    }

    if (isNaN(gunningFogNumber)) {
      // If Gunning Fog is not a number, base the level on Flesch-Kincaid.
      // Add logic here to calculate the approximate level based on Flesch-Kincaid.
      return "Approximate level based on Flesch-Kincaid: ..."; // Modify this line
    }

    let level = "";
    if (gunningFogNumber <= 6) {
      level = "A2 (Elementary)";
    } else if (gunningFogNumber <= 8) {
      level = "B1 (Intermediate)";
    } else if (gunningFogNumber <= 12) {
      level = "B2 (Upper Intermediate)";
    } else if (gunningFogNumber <= 16) {
      level = "C1 (Advanced)";
    } else {
      level = "C2 (Proficiency)";
    }

    return `Approximate level: ${level} - based on Gunning Fog Index: ${gunningFogNumber.toFixed(
      2
    )}`;
  }

  return (
    <div className="textProcessorContainer">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text here..."
        rows="5"
      ></textarea>

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

      <button className="process-button" onClick={handleSubmit}>
        Process
      </button>

      <div className="tabs">
        <button className="textTab" onClick={() => setActiveTab(1)}>
          Vocabulary Core
        </button>
        <button className="textTab" onClick={() => setActiveTab(2)}>
          Translations
        </button>
        <button className="textTab" onClick={() => setActiveTab(3)}>
          Tests
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
        
        <button className="textTab" onClick={() => setActiveTab(9)}>
          Readability Score
        </button>
      </div>

      {activeTab === 1 &&
        Object.keys(sortedWords).map((level) => (
          <div key={level}>
            <h3>{level}</h3>
            <p>
              {sortedWords[level].length > 0
                ? sortedWords[level].join(", ")
                : "No words found"}
            </p>
          </div>
        ))}

      {activeTab === 2 &&
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
        ))}

      {activeTab === 3 &&
        generateTest("A1").map((q) => (
          <div className="testQuestion">
            <p className="testQuestionP">{q.questionText}</p>
            {q.options.map((opt) => (
              <button className="testQuestionButton">{opt}</button>
            ))}
          </div>
        ))}

      {activeTab === 4 && (
        <div>
          <h3>Full Text</h3>
          <p>{inputText}</p>
        </div>
      )}

      {activeTab === 5 && (
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
      )}

      {activeTab === 6 && (
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
      )}

      {activeTab === 7 && (
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
      )}

      {activeTab === 8 && (
        <div>
          <h3>Part of Speech Tagging</h3>
          <p>{renderPartsOfSpeech()}</p>
        </div>
      )}

      {activeTab === 9 && (
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
      )}
    </div>
  );
};

export default TextProcessor;
