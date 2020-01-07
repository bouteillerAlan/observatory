import React, {useEffect, useState} from 'react';
import history from '../server/history';
import loadHash from 'lodash';

const Map: React.FunctionComponent = () => {
  // NS = non sort
  const [characters, setCharacters] = useState([]);
  const [seasonsNS, setSeasonsNS] = useState([]);
  const [storiesNS, setStoriesNS] = useState([]);
  const [questsNS, setQuestsNS] = useState([]);
  const [seasons, setSeasons] = useState([]);
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
   * get all seasons
   * @return {void} set state
   */
  function getSeasons() {
    fetch(`${_API_URL}stories/seasons?ids=all&lang=${_lang}`).then(async (res: any) => {
      const data = await res.json();
      setSeasonsNS(data);
    });
  }

  /**
   * get all stories
   * @return {void} set state
   */
  function getStories() {
    fetch(`${_API_URL}/stories?ids=all&lang=${_lang}`).then(async (res: any) => {
      const data = await res.json();
      setStoriesNS(data);
    });
  }

  /**
   * get all quests
   * @return {void} set state
   */
  function getQuests() {
    fetch(`${_API_URL}/quests?ids=all&lang=${_lang}`).then(async (res: any) => {
      const data = await res.json();
      setQuestsNS(data);
    });
  }

  /**
   * get all quests done for the character
   * @param {any} character the character
   * @return {void} return the result.json
   */
  function getDoneQuests(character: any) {
    fetch(`${_API_URL}/characters/${character}/quests?access_token=${_apiKey}&lang=${_lang}`).then(async (res: any) => {
      return res.json();
    });
  }

  /**
   * get all back stories for the character
   * @param {any} character the character
   * @return {void} return the result.json
   */
  function getBackStories(character: any) {
    fetch(`${_API_URL}/characters/${character}/backstory?access_token=${_apiKey}`).then(async (res: any) => {
      return res.json();
    });
  }

  /**
   * get all infos for the character
   * @param {any} character the character
   * @return {void} return the result.json
   */
  function getInfoCharacter(character: any) {
    fetch(`${_API_URL}/characters/${character}/core?access_token=${_apiKey}&lang=${_lang}`).then(async (res: any) => {
      return res.json();
    });
  }

  /**
   * ddddddddd
   * @return {void} return nothing
   */
  async function shortData() {
    // get all data
    getCharacters();
    getQuests();
    getSeasons();
    getStories();
    // sort seasons
    const seasons = seasonsNS.sort(function(a: any, b: any) {
      return a['order']-b['order'];
    });
    // sort stories
    const stories = loadHash.orderBy(storiesNS, ['season', 'order']);
    // sort quests, for the moment 'level' is the best way for sort this thing
    const quests = loadHash.orderBy(questsNS, ['story', 'level']);
    // map the data for each character
    const questsDone: any = {};
    const backStories: any = {};
    const characterId: any = {};
    for (let i = 0; i<characters.length; i++) {
      console.log('ping');
      questsDone[characters[i]] = await getDoneQuests(characters[i]);
      backStories[characters[i]] = await getBackStories(characters[i]);
      characterId[characters[i]] = await getInfoCharacter(characters[i]);
    }
    console.log({seasons, stories, quests, characters, questsDone, backStories, characterId});
    // return {seasons, stories, quests, characters, questsDone, backStories, characterId};
  }

  useEffect(() => {
    checkApiKey();
    shortData();
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
