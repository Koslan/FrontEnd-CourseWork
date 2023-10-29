import { useState } from "react";
import { englishLevelsMap } from "./english"; // Corrected import statement
import "./TextProcessor.css";

const TextProcessor = () => {
  const [inputText, setInputText] = useState("");
  const [sortedWords, setSortedWords] = useState({});

  const handleSubmit = () => {
    const processedWords = processText(inputText);
    setSortedWords(processedWords);
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
        proficiencyLevels[level].add(word);  // use add() for sets
      } else {
        proficiencyLevels.unsorted.add(word);  // use add() for sets
      }
    });

    // Convert the sets back to sorted arrays
    Object.keys(proficiencyLevels).forEach((level) => {
      proficiencyLevels[level] = [...proficiencyLevels[level]].sort();
    });

    return proficiencyLevels;
};


  return (
    <div>
      <div className="textProcessorContainer">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>Search</button>
      </div>

      {Object.keys(sortedWords).map((level) => (
        <div key={level}>
          <h3>{level}</h3>
          <p>
            {sortedWords[level].length > 0
              ? sortedWords[level].join(", ")
              : "No words found"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TextProcessor;
