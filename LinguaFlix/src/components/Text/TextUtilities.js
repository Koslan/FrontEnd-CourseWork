import { translatedLevelsMap as engSpaMap } from '../Text/Languages/eng-spa.js';
import { translatedLevelsMap as engUkrMap } from '../Text/Languages/eng-ukr.js';
import { translatedLevelsMap as engFreMap } from '../Text/Languages/eng-fre.js';
import { translatedLevelsMap as engGerMap } from '../Text/Languages/eng-ger.js';
import { translatedLevelsMap as engItaMap } from '../Text/Languages/eng-ita.js';
import { translatedLevelsMap as engJapMap } from '../Text/Languages/eng-jap.js';
import { translatedLevelsMap as engKorMap } from '../Text/Languages/eng-kor.js';
import { translatedLevelsMap as engPolMap } from '../Text/Languages/eng-pol.js';



export const processText = (text, languageLevelsMap) => {
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
        const level = languageLevelsMap[word.toLowerCase()];

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

export function translateWord(word, sourceLang, transLang) {
    const lowerCaseWord = word.toLowerCase();

    let translationMap;
    if (sourceLang === 'eng' && transLang === 'fre') {
        translationMap = engFreMap;
    } else if (sourceLang === 'eng' && transLang === 'ger') {
        translationMap = engGerMap;
    } else if (sourceLang === 'eng' && transLang === 'ita') {
        translationMap = engItaMap;
    } else if (sourceLang === 'eng' && transLang === 'jap') {
        translationMap = engJapMap;
    } else if (sourceLang === 'eng' && transLang === 'kor') {
        translationMap = engKorMap;
    } else if (sourceLang === 'eng' && transLang === 'pol') {
        translationMap = engPolMap;
    } else if (sourceLang === 'eng' && transLang === 'spa') {
        translationMap = engSpaMap;
    } else if (sourceLang === 'eng' && transLang === 'ukr') {
        translationMap = engUkrMap;
    }

    const translation = translationMap ? translationMap[lowerCaseWord] : null;

    return translation || '-';
}

export const generateTest = (level, inputText, sortedWords) => {
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



export const countSyllables = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) {
        return 1;
    }
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
    word = word.replace(/^y/, "");
    return word.match(/[aeiouy]{1,2}/g)?.length;
};

export const calculateCollocations = (text) => {
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

export const tagPartsOfSpeech = (text) => {
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

export const formatSubtitles = (subtitleText) => {
    const lines = subtitleText.split('\n');

    let formattedSubtitles = '';
    let currentSubtitleNumber = 1;

    lines.forEach((line) => {
        if (line.trim() === currentSubtitleNumber.toString()) {
            formattedSubtitles += line + '\n';
            currentSubtitleNumber++;
        } else {
            formattedSubtitles += line + '\n\n';
        }
    });

    return formattedSubtitles.trim();
};