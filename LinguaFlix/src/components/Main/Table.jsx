import './table.css';

function Table({ movie, selectedLevel, selectedLanguages }) {
  const vocab = movie.vocabByLanguage;
  const lang1 = selectedLanguages.firstLanguage;
  const lang2 = selectedLanguages.secondLanguage;
  
  const selectedLanguagePair = `${lang1}:${lang2}`;
  const selectedVocab = vocab?.[selectedLanguagePair]?.[selectedLevel];

  return (
    <>
      {selectedVocab && (
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
                const [word, translation] = item.split(':');
                return (
                  <tr key={index}>
                    <td>{word}</td>
                    <td>{translation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Table;
