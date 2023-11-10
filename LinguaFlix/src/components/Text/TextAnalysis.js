export const calculateReadabilityScores = (text, setReadabilityScores, countSyllables) => {
    const sentences = text.split(/[.!?]/).filter(Boolean);
    const words = text.split(/\s+/).filter(Boolean);
    const totalSentences = sentences.length;
    const totalWords = words.length;
    const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);

    const fleschKincaid =
        0.39 * (totalWords / totalSentences) + 11.8 * (totalSyllables / totalWords) - 15.59;
    const gunningFog =
        0.4 * ((totalWords / totalSentences) + 100 * (words.filter((word) => countSyllables(word) > 2).length / totalWords));

    setReadabilityScores({
        fleschKincaid: fleschKincaid.toFixed(2),
        gunningFog: gunningFog.toFixed(2),
    });
};

export const calculateApproximateLevel = (fleschKincaid, gunningFog) => {
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

export const countSyllables = (word) => {
    word = word.toLowerCase(); // word.downcase!
    if (word.length <= 3) {
        return 1;
    }

    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');

    const vowelSegments = word.match(/[aeiouy]{1,2}/g);
    return vowelSegments ? vowelSegments.length : 0;
};

export const calculateCollocations = (text) => {
    const words = text.split(/\s+/).filter(Boolean);
    const collocations = {};

    for (let i = 0; i < words.length - 1; i++) {
        const pair = words[i] + ' ' + words[i + 1];
        if (collocations[pair]) {
            collocations[pair]++;
        } else {
            collocations[pair] = 1;
        }
    }

    const sortedCollocations = Object.entries(collocations)
        .map(([pair, freq]) => ({ pair, freq }))
        .sort((a, b) => b.freq - a.freq);

    return sortedCollocations;
};


