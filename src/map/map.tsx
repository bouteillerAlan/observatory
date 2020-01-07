import React, {useEffect, useState} from 'react';
import history from '../server/history';

const Map: React.FunctionComponent = () => {
  const [characters, setCharacters] = useState([]);
  const [saisons, setSaisons] = useState([]);
  const [stories, setStories] = useState([]);
  const [quests, setQuests] = useState([]);

  const _API_URL = process.env.REACT_APP_API_URL;
  const _apiKey = localStorage.getItem('key');
  const _lang = localStorage.getItem('lang');

  /**
   * check the api key stock in the localstorage
   * @return {void} return nothing, push new page in history
   */
  function checkApiKey() {
    console.log('api', _apiKey);
    console.log(localStorage);
    fetch(`${_API_URL}characters?access_token=${_apiKey}`).then((res: any) => {
      if (res.status !== 200) {
        history.push('/');
      }
    });
  }

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

  /**
   * get all saisons
   * @return {void} set state
   */
  function getSaisons() {
    fetch(`${_API_URL}stories/seasons?ids=all&lang=${_lang}`).then(async (res: any) => {
      const data = await res.json();
      setSaisons(data);
    });
  }

  /**
   * get all stories
   * @return {void} set state
   */
  function getStories() {
    fetch(`${_API_URL}/stories?ids=all&lang=${_lang}`).then(async (res: any) => {
      const data = await res.json();
      setStories(data);
    });
  }

  /**
   * get all quests
   * @return {void} set state
   */
  function getQuests() {
    fetch(`${_API_URL}/quests?ids=all&lang=${_lang}`).then(async (res: any) => {
      const data = await res.json();
      setQuests(data);
    });
  }

  useEffect(() => {
    checkApiKey();
    getCharacters();
    getQuests();
    getSaisons();
    getStories();
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
