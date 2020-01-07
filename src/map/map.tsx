import React, {useEffect, useState} from 'react';
import history from '../server/history';
import backStories from '../data/backStories';

const Map: React.FunctionComponent = () => {
  const [characters, setCharacters] = useState([]);
  const [dataMap, setDataMap] = useState([]);

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
   * map the data in a single iterative object
   * @param {any} data
   * @return {any} return the object
   */
  function map(data: any) {
    const obj: any = {};
    // seasons -> stories -> quests -> characters -> questsDone
    data['seasons'].map((season: any) => {

      // create object key
      obj[season['name']] = {id: season['id'], story: {}};

      data['stories'].map((story: any) => {

        // check if story is in seasons and store it
        if (story['season'] === season['id']) {

          // if a race is set
          const storyName = story['races'] ? story['name']+' - '+story['races'] : story['name'];

          obj[season['name']]['story'][storyName] = {id: story['id'], quests: {}, description: story['description']};

          // and continue loop
          data['quests'].map((quest: any) => {

            // check if quest is in story and store it
            if (quest['story'] === story['id']) {
              obj[season['name']]['story'][storyName]['quests'][quest['id']] = {Qname: '', Qid: '', Qlevel: '', status: {}, authorization: {}};

              data['characters'].map((character: any) => {

                // stock name, id and level
                obj[season['name']]['story'][storyName]['quests'][quest['id']]['Qname'] = quest['name'];
                obj[season['name']]['story'][storyName]['quests'][quest['id']]['Qid'] = quest['id'];
                obj[season['name']]['story'][storyName]['quests'][quest['id']]['Qlevel'] = quest['level'];

                // check the race for specific id
                const raceQuest = [8, 1, 3, 2, 7];
                if (raceQuest.includes(obj[season['name']]['story'][storyName]['id'])) {
                  switch (obj[season['name']]['story'][storyName]['id']) {
                    // asura
                    case 8:
                      if (data['characterId'][character]['race'] === 'Asura') {
                        // check if it's done, if it's the case tag it
                        obj[season['name']]['story'][storyName]['quests'][quest['id']]['status'][character] = data['questsDone'][character].includes(quest['id']) ? 1 : 0;
                      }
                      break;
                    // charr
                    case 1:
                      if (data['characterId'][character]['race'] === 'Charr') {
                        // check if it's done, if it's the case tag it
                        obj[season['name']]['story'][storyName]['quests'][quest['id']]['status'][character] = data['questsDone'][character].includes(quest['id']) ? 1 : 0;
                      }
                      break;
                    // human
                    case 3:
                      if (data['characterId'][character]['race'] === 'Human') {
                        // check if it's done, if it's the case tag it
                        obj[season['name']]['story'][storyName]['quests'][quest['id']]['status'][character] = data['questsDone'][character].includes(quest['id']) ? 1 : 0;
                      }
                      break;
                    // norn
                    case 2:
                      if (data['characterId'][character]['race'] === 'Norn') {
                        // check if it's done, if it's the case tag it
                        obj[season['name']]['story'][storyName]['quests'][quest['id']]['status'][character] = data['questsDone'][character].includes(quest['id']) ? 1 : 0;
                      }
                      break;
                    // sylvari
                    case 7:
                      if (data['characterId'][character]['race'] === 'Sylvari') {
                        // check if it's done, if it's the case tag it
                        obj[season['name']]['story'][storyName]['quests'][quest['id']]['status'][character] = data['questsDone'][character].includes(quest['id']) ? 1 : 0;
                      }
                  }
                } else {
                  // check if it's done, if it's the case tag it
                  obj[season['name']]['story'][storyName]['quests'][quest['id']]['status'][character] = data['questsDone'][character].includes(quest['id']) ? 1 : 0;
                }

                // check if is authorized
                // and stock it in obj[season['name']]['story'][storyName]['quests'][quest['id']]['authorization'][character]
                // by default all quests is authorized
                let a = true;
                data['backStories'][character]['backstory'].map((bkId: any) => {
                  // if backstory exist in bk file
                  if (backStories[bkId]) {
                    // if quest id exist in backstory bk file
                    if (backStories[bkId].includes(quest['id'])) {
                      a = false;
                    }
                  }
                });
                obj[season['name']]['story'][storyName]['quests'][quest['id']]['authorization'][character] = a;
              });
            }
          });
        }
      });
    });
    return obj;
  }

  /**
   * allow to create an object to contain all data for the app
   * @return {void} return nothing
   */
  async function sortData() {
    // get all data
    // NS = no sort
    const characters = await getCharacters();
    const quests = await getQuests();
    const seasons = await getSeasons();
    const stories = await getStories();

    // rec characters
    setCharacters(characters);

    // map the data for each character
    const questsDone: any = {};
    const backStories: any = {};
    const characterId: any = {};

    for (let i = 0; i<characters.length; i++) {
      questsDone[characters[i]] = await getDoneQuests(characters[i]);
      backStories[characters[i]] = await getBackStories(characters[i]);
      characterId[characters[i]] = await getInfoCharacter(characters[i]);
    }
    return map({seasons, stories, quests, characters, questsDone, backStories, characterId});
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
