import './table.css';

function Table({ movie, selectedLevel }) {
  const vocab = movie.vocab;
  const lang1 = "eng";
  const lang2 = "ukrainian";
  console.log("selectedLevel" , selectedLevel);

  console.log("  vocab", vocab);

  const selectedLanguagePair = `${lang1}:${lang2}`;
  const selectedVocab = vocab[selectedLanguagePair] && vocab[selectedLanguagePair][selectedLevel];

  console.log("  selectedLanguagePair", selectedLanguagePair);
  console.log("  selectedVocab",  vocab[selectedLanguagePair]);
  console.log("  selectedVocab2",  vocab[selectedLanguagePair][selectedLevel]);
  console.log("  selectedVocab3",  selectedVocab);

  return (
    <div>
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
    </div>
  )
}

export default Table;
