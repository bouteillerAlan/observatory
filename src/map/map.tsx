import React, {useEffect, useState} from 'react';
import sortData from '../request/getAll';
import {checkApiKey} from '../request/checkApiKey';
import Nav from '../nav/nav';
import questsList from '../data/quests';
import './map.scss';
import M from 'materialize-css';
import {gArrow} from '../functions/sharedFunction';

const Map: React.FunctionComponent = () => {
  const [dataMap, setDataMap] = useState(); // no type because the {} type bugs the [index]
  const [loading, setLoading] = useState(true);
  const [gen, setGen] = useState(true);
  const [lang] = useState(localStorage.getItem('obsLang'));

  /**
   * Perform a check and return the value of the guild for an id
   * @param {array} ids list of id
   * @return {string | null} the guild or null
   */
  function checkGuild(ids: number[]) {
    const durmand = questsList.durmand.some( (r: any) => ids.indexOf(r) >= 0);
    const whisper = questsList.whisper.some( (r: any) => ids.indexOf(r) >= 0);
    const vigil = questsList.vigil.some( (r: any) => ids.indexOf(r) >= 0);
    if (durmand) {
      return lang === 'fr' ? 'Durmand' : 'Durmand';
    } else if (whisper) {
      return lang === 'fr' ? 'Soupir' : 'Whisper';
    } else if (vigil) {
      return lang === 'fr' ? 'Veilleur' : 'Vigil';
    }
    return null;
  }

  // the loading deps allow to rerender the component with the
  // data and generate the arrow
  useEffect(() => {
    checkApiKey();
    sortData().then((res: any) => {
      setDataMap(res);
      setLoading(false);
      const elems = document.querySelectorAll('.tooltipped');
      const options = {};
      M.Tooltip.init(elems, options);
      // FIXME
      setTimeout(() => {
        setGen(false);
      }, 2500);
    });
  }, [loading]);

  /**
   * map the arrow
   * @Param {string} name the current character name without space (for css class)
   * @Param {string} key the current character name
   * @Param {{id: number, pid: number}} subLine the data for generate arrow
   * @Param {string} seasonKey the season key for mapping tooltips title
   * @Param {string} storyKey the story key for mapping tooltips title
   * @Return {dom} the arrow
   */
  function dataMapArrow(name: string, key: string, subLine: {id: number, pid: number}, seasonKey: string, storyKey: any) {
    return (
      <span key={key+subLine.id} className='lb-one'>
        <div className={'card tooltipped ' + (dataMap.charactersData.questsDone[key].includes(subLine.id) ? 'bg-green' : dataMap.charactersData.questsBlocked[key].includes(subLine.id) ? 'bg-grey' : 'bg-red')} data-position="top"
          data-tooltip={`${dataMap.dataMap[seasonKey]['stories'].filter((story: any) => story.id === storyKey)[0].quests.filter((quest: any) => quest.id === subLine.id)[0].name}`} id={name+subLine.id}>
        </div>
        {/* if precedent is array map it */}
        {Array.isArray(subLine.pid) ?
          subLine.pid.map((subColPid: any) => (
            <span key={subColPid}>
              <div className="arrow" id={'a'+name+subColPid+subLine.id}> </div>
              {gArrow(name+subColPid, name+subLine.id, 'a'+name+subColPid+subLine.id,
                  // green or red (&& -> because we need to have the quest in court and the previous one done to have the green )
                  (dataMap.charactersData.questsDone[key].includes(subLine.id) && dataMap.charactersData.questsDone[key].includes(subColPid)),
                  // grey (|| -> because the quest in court and the one that precedes is blocked because of the choices)
                  (dataMap.charactersData.questsBlocked[key].includes(subLine.id) || dataMap.charactersData.questsBlocked[key].includes(subColPid)),
              )}
            </span>
          )) :
          <span>
            <div className="arrow" id={'a'+name+subLine.pid+subLine.id}> </div>
            {gArrow(name+subLine.pid, name+subLine.id, 'a'+name+subLine.pid+subLine.id,
                // green or red (&& -> because we need to have the quest in court and the previous one done to have the green )
                (dataMap.charactersData.questsDone[key].includes(subLine.id) && dataMap.charactersData.questsDone[key].includes(subLine.pid)),
                // grey (|| -> because the quest in court and the one that precedes is blocked because of the choices)
                (dataMap.charactersData.questsBlocked[key].includes(subLine.id) || dataMap.charactersData.questsBlocked[key].includes(subLine.pid)),
            )}
          </span>
        }
      </span>
    );
  }

  /**
   * map the html map
   * @Param {string} seasonKey the season key for mapping the tooltips title
   * @Param {string | number} storyKey the key of the story
   * @Param {string} key the key of character array
   * @Return {dom} return the map
   */
  function dataMapHtml(seasonKey: string, storyKey: string | number, key: string) {
    const name: string = key.replace(/\s/g, '');
    return (
      questsList[storyKey] &&
      Object.entries(questsList[storyKey]).map(([qLKey, line]: any) => (
        <div key={storyKey+qLKey} className='map-item'>
          {line &&
            line.map((sub: any, subKey: any) => (
              <div key={storyKey+qLKey+subKey} className='map-item-screen'>
                {sub &&
                  sub.map((subLine: any, subLineKey: any) => ( // obj ou array
                    <div key={storyKey+qLKey+subKey+subLineKey} className='map-choice'>
                      {Array.isArray(subLine) ?
                        subLine.map((subCol: any) => (
                          dataMapArrow(name, key, subCol, seasonKey, storyKey)
                        )) :
                        dataMapArrow(name, key, subLine, seasonKey, storyKey)
                      }
                    </div>
                  ))
                } {/* end sub */}
              </div>
            ))
          }  {/* end line */}
        </div>
      ))
    );
  }

  return (
    <section className="map">
      <Nav active={'map'} />
      {gen &&
      <div id='warning-message'>
        <div className="container">
          <div>
            {lang === 'fr' ?
              'Le calcul des trajets peux prendre un certain temps. Merci de patienter.' :
              'It may take a while to calculate the routes. Please be patient.'}
          </div>
          <div className="progress">
            <div className="indeterminate"> </div>
          </div>
        </div>
      </div>
      }
      {loading ?
        <div className="progress">
          <div className="indeterminate"> </div>
        </div> :
      ''}
      {dataMap && !loading &&
        <div className="row screen">
          <table>
            <thead>
              <tr>
                <th colSpan={5}>Persona</th>
                {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
                  // if the season is equal to '215AAA0F-CDAC-4F93-86DA-C155A99B5784' this is a 'my story' map so colSpan = 3
                  seasonKey === '215AAA0F-CDAC-4F93-86DA-C155A99B5784' ?
                    <th key={seasonKey} colSpan={3}>{season.name}</th> :
                    <th key={seasonKey} colSpan={season.stories.length}>{season.name}</th>
                ))}
              </tr>
              <tr>
                <th>{lang === 'fr' ? 'Race' : 'Race'}</th>
                <th>{lang === 'fr' ? 'Classe' : 'Classe'}</th>
                <th>{lang === 'fr' ? 'Nom' : 'Name'}</th>
                <th>{lang === 'fr' ? 'Niveau' : 'Level'}</th>
                <th>{lang === 'fr' ? 'Ordre' : 'Order'}</th>
                <th>{lang === 'fr' ? 'Histoire du personage' : 'Character story'}</th>
                {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
                  season.stories.map((story: any) => (
                    !story.races && <th key={story.id+seasonKey}>{story.name}</th>
                  ))
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
                  <td>{checkGuild(dataMap.charactersData.questsDone[key])}</td>
                  <td className="subTable">
                    {/* here we generate only the quests for the race of the character in court in a single column */}
                    {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
                      season.stories.map((story: any) => (
                        (story.races && story.races[0] === value.race) &&
                          <div className="table" key={story.id+seasonKey}>
                            {dataMapHtml(seasonKey, story.id, key)}
                          </div>
                      ))
                    ))}
                  </td>

                  {/* here we generate the rest of the quests */}
                  {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
                    season.stories.map((story: any) => (
                      !story.races && <td key={story.id+seasonKey} className="subTable">
                        <div className="table">
                          {dataMapHtml(seasonKey, story.id, key)}
                        </div>
                      </td>
                    ))
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </section>
  );
};

export default Map;
