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

export const translateWord = (word, sourceLang, transLang) => {
    // This is a dummy translation function.
    // In a real scenario, you would use an API or a library to get translations.
    return word + "_trans";
};

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

