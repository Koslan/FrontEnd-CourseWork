import './table.css';

function Table({ movies, selectedLevel, selectedLanguages }) {
  const vocab = movies.vocabByLanguage;
  const lang1 = selectedLanguages?.firstLanguage;
  const lang2 = selectedLanguages?.secondLanguage;
  
  const selectedLanguagePair = `${lang1}:${lang2}`;
  const selectedVocab = vocab?.[selectedLanguagePair]?.[selectedLevel];

  console.log(movies);

  console.log(selectedLanguagePair);
  console.log(selectedVocab);

  console.log("selectedLanguagePair", selectedLanguagePair);
  console.log("vocab[selectedLanguagePair]", vocab?.[selectedLanguagePair]);
  console.log("vocab[selectedLanguagePair][selectedLevel]", vocab?.[selectedLanguagePair]?.[selectedLevel]);
  console.log("selectedVocab", selectedVocab);

  console.log("selectedLevel" , selectedLevel);
  console.log("  vocab", vocab);
  console.log(selectedLanguages);
  console.log(selectedLevel);

  return (
    <>
      {selectedVocab && 
        <div key={`${selectedLanguagePair}-${selectedLevel}`}>
          <table>
            <thead>
              <tr>
                <th>Word</th>
                <th>Translation</th>
              </tr>
            </thead>
            <tbody>
              {selectedVocab.map((item, index) => {
                const [key, value] = item.split(': ');
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      }
    </>
  )
}

export default Table;
