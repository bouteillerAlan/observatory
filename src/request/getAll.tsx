import loadHash from 'lodash';
import backStories from '../data/backStories';

const _API_URL = process.env.REACT_APP_API_URL;
const _apiKey = localStorage.getItem('obsKey');
const _lang = localStorage.getItem('obsLang');

/**
 * get all characters for one user
 * @return {any} return result.json
 */
function getCharacters() {
  return fetch(`${_API_URL}characters?access_token=${_apiKey}&lang=${_lang}`).then(async (res: any) => {
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
    // array for non-maj quests by gw2 API
    const noMajQuest = [
      {goals: [], id: 9995, level: 0, name: "En attente d'une mise a jour de l'api par Guild Wars 2", story: 95},
      {goals: [], id: 9996, level: 0, name: "En attente d'une mise a jour de l'api par Guild Wars 2", story: 96},
    ];
    const response = await res.json();
    const reponseMaj = [...response, ...noMajQuest];
    return reponseMaj;
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
  return fetch(`${_API_URL}/characters/${character}/backstory?access_token=${_apiKey}&lang=${_lang}`).then(async (res: any) => {
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
export default async function sortData(): Promise<any> {
  // get all data
  const charactersList = await getCharacters();
  const questsNS = await getQuests();
  const seasonsNS = await getSeasons();
  const storiesNS = await getStories();

  // set data for each characters
  let charactersData: any = {};
  await dataByCharacter(charactersList).then((res: any) => {
    charactersData = res;
  });

  // get the blocked quest
  charactersData['questsBlocked'] = [];
  Object.entries(charactersData.backStories).forEach(([name, value]: any) => {
    charactersData['questsBlocked'][name] = [];
    Object.values(value.backstory).forEach((key: any) => {
      // key = 21-017 for example
      if (backStories[key]) {
        charactersData['questsBlocked'][name].push(...backStories[key]);
      }
    });
  });

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

  // map the story in order on season key
  const seasonsAndStoriesSorted: any = {};
  seasons.forEach((season: any) => {
    seasonsAndStoriesSorted[season.id] = [];
    stories.forEach((story: any) => {
      if (season.id === story.season) {
        seasonsAndStoriesSorted[season.id].push({...story, quests: []});
      }
    });
  });

  // sort the quests
  // for the moment 'level' is the best way for short this thing
  const quests = loadHash.orderBy(questsNS, ['story', 'level']);

  // map data
  const dataMap: any = {};
  seasons.forEach((season: any) => {
    // create the season object
    dataMap[season.id] = {order: season.order, name: season.name, stories: seasonsAndStoriesSorted[season.id]};

    dataMap[season.id]['stories'].forEach((story: any) => {
      quests.forEach((quest: any) => {
        if (story.id === quest['story']) {
          story['quests'].push(quest);
        }
      });
    });

  });

  return {
    dataMap,
    charactersData,
    oldDataMap: {
      seasons,
      stories,
      quests,
      characters: charactersList,
      questsDone: charactersData.questsDone,
      backstories: charactersData.backStories,
      characterId: charactersData.characterId,
    },
  };
}
