import React, {useEffect, useState} from 'react';
import history from '../server/history';
// import backStories from '../data/backStories';
import loadHash from 'lodash';
import './map.scss';

const Map: React.FunctionComponent = () => {
  const [dataMap, setDataMap] = useState({seasons: [], stories: [], quests: [], charactersData: {questsDone: {}, backStories: {}, characterId: {}}});

  const _API_URL = process.env.REACT_APP_API_URL;
  const _apiKey = localStorage.getItem('key');
  const _lang = localStorage.getItem('lang');

  /**
   * check the api key stock in the localstorage
   * @return {void} return nothing, push new page in history
   */
  function checkApiKey() {
    fetch(`${_API_URL}characters?access_token=${_apiKey}`).then((res: any) => {
      if (res.status !== 200) {
        history.push('/');
      }
    });
  }

  /**
   * get all characters for one user
   * @return {any} return result.json
   */
  function getCharacters() {
    return fetch(`${_API_URL}characters?access_token=${_apiKey}`).then(async (res: any) => {
      return res.json();
    });
  }

  /**
   * get all seasons
   * @return {any} return result.json
   */
  function getSeasons() {
    return fetch(`${_API_URL}stories/seasons?ids=all&lang=${_lang}`).then(async (res: any) => {
      return res.json();
    });
  }

  /**
   * get all stories
   * @return {any} return result.json
   */
  function getStories() {
    return fetch(`${_API_URL}/stories?ids=all&lang=${_lang}`).then(async (res: any) => {
      return res.json();
    });
  }

  /**
   * get all quests
   * @return {any} return result.json
   */
  function getQuests() {
    return fetch(`${_API_URL}/quests?ids=all&lang=${_lang}`).then(async (res: any) => {
      return res.json();
    });
  }

  /**
   * get all quests done for the character
   * @param {any} character the character
   * @return {any} return result.json
   */
  function getDoneQuests(character: any) {
    return fetch(`${_API_URL}/characters/${character}/quests?access_token=${_apiKey}&lang=${_lang}`).then(async (res: any) => {
      return res.json();
    });
  }

  /**
   * get all back stories for the character
   * @param {any} character the character
   * @return {any} return result.json
   */
  function getBackStories(character: any) {
    return fetch(`${_API_URL}/characters/${character}/backstory?access_token=${_apiKey}`).then(async (res: any) => {
      return res.json();
    });
  }

  /**
   * get all infos for the character
   * @param {any} character the character
   * @return {any} return result.json
   */
  function getInfoCharacter(character: any) {
    return fetch(`${_API_URL}/characters/${character}/core?access_token=${_apiKey}&lang=${_lang}`).then(async (res: any) => {
      return res.json();
    });
  }

  /**
   * map the data for each character
   * @param {string} characterList
   * @return {object} return one object to contain the sorted data
   */
  async function dataByCharacter(characterList: string[]) {
    const questsDone: any = {};
    const backStories: any = {};
    const characterId: any = {};

    for (let i = 0; i<characterList.length; i++) {
      questsDone[characterList[i]] = await getDoneQuests(characterList[i]);
      backStories[characterList[i]] = await getBackStories(characterList[i]);
      characterId[characterList[i]] = await getInfoCharacter(characterList[i]);
    }

    return {questsDone, backStories, characterId};
  }

  /**
   * allow to create an object to contain all data for the app
   * @return {object} return the clean object
   */
  async function sortData() {
    // get all data
    const charactersList = await getCharacters();
    const questsNS = await getQuests();
    const seasonsNS = await getSeasons();
    const storiesNS = await getStories();

    // sort the seasons
    const seasons = seasonsNS.sort((a: any, b: any) => {
      return a['order']-b['order'];
    });

    // sort the stories
    // group the stories by the season
    const storiesNSB = loadHash.orderBy(storiesNS, ['season', 'order']);
    const stories = storiesNSB.sort((a: any, b: any) => {
      return a['level']-b['level'];
    });

    // sort the quests
    // for the moment 'level' is the best way for short this thing
    const quests = loadHash.orderBy(questsNS, ['story', 'level']);

    // map data
    const dataMap: any = {};
    seasons.map((season: any) => {
      // create the season object
      dataMap[season.id] = {order: season.order, name: season.name, storiesId: season.stories, stories: {}};
      stories.map((story: any) => {
        // if the story.season match the season stock the story
        if (story.season === season.id) {
          dataMap[season.id]['stories'][story.id] = {id: story.id, name: story.name, description: story.description, timeline: story.timeline, level: story.level, races: story.races, order: story.order, chapters: story.chapters, quests: {}};
          quests.map((quest: any) => {
            if (story.id === quest['story']) {
              dataMap[season.id]['stories'][story.id]['quests'][quest.id] = quest;
            }
          });
        }
      });
    });
    console.log(dataMap);

    // set data for each characters
    let charactersData: {} = {};
    await dataByCharacter(charactersList).then((res: {}) => {
      charactersData = res;
    });

    return {seasons, stories, quests, charactersData};
  }

  useEffect(() => {
    checkApiKey();
    sortData().then((res: any) => {
      console.log(res);
      setDataMap(res);
    });
  }, []);

  return (
    <section className="map">
      <div className="container row">
        <div className="col s12">
          <h1>Map</h1>
          {dataMap.quests.length === 0 ? <p>quests loading</p> : ''}
          {dataMap.seasons.length === 0 ? <p>seasons loading</p> : ''}
          {dataMap.stories.length === 0 ? <p>stories loading</p> : ''}
          <div className="row screen">
            <table>
              <thead>
                <tr>
                  <th>Race</th>
                  <th>Classe</th>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Order</th>
                  {dataMap.seasons.map((season: any) => (
                    <th key={season.id} colSpan={season.stories.length}>{season.name}</th>
                  ))}
                </tr>
                <tr>
                  <th colSpan={5}> </th>
                  {dataMap.stories.map((story: any) => (
                    <th key={story.id}>{story.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(dataMap.charactersData.characterId).map(([key, value]: any) => (
                  <tr key={key}>
                    <td>{value.race}</td>
                    <td>{value.profession}</td>
                    <td>{key}</td>
                    <td>{value.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
