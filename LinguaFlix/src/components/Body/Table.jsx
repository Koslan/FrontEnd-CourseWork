import './table.css';

function Table({ movie, selectedLevel }) {
  const vocab = movie.vocab;
  //const levels = movie.levels;

  console.log("vocab:", vocab);
  console.log("selectedLevel:", selectedLevel);

  return (
    <div>
      {Object.keys(vocab).map(languagePair => (
        Object.keys(vocab[languagePair]).map(level => {
          if (selectedLevel && !level.includes(selectedLevel)) {
            return (
              <div key={`${languagePair}-${level}`}>
                <table>
                  <thead>
                    <tr>
                      <th>Word</th>
                      <th>Translation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vocab[languagePair][level].map((item, index) => {
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
              </div>);
          }
        }
       )
      ))}
    </div>
  )
}

export default Table;
