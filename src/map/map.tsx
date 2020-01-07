import React, {useEffect, useState} from 'react';

const _API_URL = process.env.REACT_APP_API_URL;
const _apiKey = localStorage.getItem('key');

const Map: React.FunctionComponent = () => {

  const [characters, setCharacters] = useState([]);

  /**
   * get all characters for one user
   * @return {void} set state
   */
  function getCharacters() {
    fetch(`${_API_URL}characters?access_token=${_apiKey}`).then(async (res: any) => {
      const data = await res.json();
      setCharacters(data);
    });
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <section className="map">
      <div className="container row">
        <div className="col s12">
          <h1>Map</h1>
          {characters.length === 0 ? 'loading' : ''}
          <ul>
            {characters.map((character: string) => (
              <li key={character}>{character}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Map;
