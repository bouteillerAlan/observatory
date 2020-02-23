import React, {useEffect, useState} from 'react';
import sortData from '../request/getAll';
import checkApiKey from '../request/checkApiKey';
import Nav from '../nav/nav';
import questsList from '../data/quests';
import './map.scss';

const Map: React.FunctionComponent = () => {
  const [dataMap, setDataMap] = useState(); // no type because the {} type bugs the [index]
  const [loading, setLoading] = useState(true);
  console.log(dataMap)

  /**
   * Perform a check and return the value of the guild for an id
   * @param {array} ids list of id
   * @return {string | null} the guild or null
   */
  function checkGuild(ids: number[]) {
    const durmand = questsList.durmand.some( (r: any) => ids.indexOf(r) >= 0);
    const whisper = questsList.whisper.some( (r: any) => ids.indexOf(r) >= 0);
    const vigil = questsList.vigil.some( (r: any) => ids.indexOf(r) >= 0);
    return durmand ? 'durmand' : whisper ? 'whisper' : vigil ? 'vigil' : null;
  }

  /**
   * generate the arrow for the map
   * @Param {number} id the id you want to check
   * @Return {number} the amount of the next quest
   */
  function gArrow(id: number) {
    if (questsList['2choice'].includes(id)) {
      return 2;
    } else if (questsList['3choice'].includes(id)) {
      return 3;
    } else if (questsList['5choice'].includes(id)) {
      return 5;
    }
    return 1;
  }

  useEffect(() => {
    checkApiKey();
    sortData().then((res: any) => {
      setDataMap(res);
      setLoading(false);
    });
  }, []);

  /**
   * map the html map
   * @Param {string | number} storyKey the key of the story
   * @Param {string | number} key the key of character array
   * @Return {dom} return the map
   */
  function dataMapHtml(storyKey: string | number, key: string | number) {
    return (Object.entries(questsList).map(([qLKey, line]: any) => (
      qLKey === storyKey &&
      line.map((col: any) => (
        <div key={qLKey+col} className='map-item'>
          {col.map((line: any) => (
            <div key={qLKey+line}>
              {line.map((subLine: any) => (
                <div key={qLKey+subLine} className='map-choice'>
                  {Array.isArray(subLine) ?
                    subLine.map((subCol: any) => (
                      <span key={qLKey+subCol} className='lb-one'>
                        <div className={'card ' + (dataMap.charactersData.questsDone[key].includes(Number(subCol)) ? 'bg-green' : 'bg-red')}
                          id={subCol}
                        >{gArrow(subCol)}
                        </div>
                      </span>
                    )) :
                    <span className='lb-one'>
                      <div className={'card ' + (dataMap.charactersData.questsDone[key].includes(Number(subLine)) ? 'bg-green' : 'bg-red')}
                        id={subLine}
                      >{gArrow(subLine)}
                      </div>
                    </span>
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      ))
    )));
  }

  return (
    <section className="map">
      <Nav active={'map'} />
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
                  // if the season is equal to '' this is a 'my story' map so colSpan = 3
                  seasonKey === '215AAA0F-CDAC-4F93-86DA-C155A99B5784' ?
                    <th key={seasonKey} colSpan={3}>{season.name}</th> :
                    <th key={seasonKey} colSpan={Object.keys(season.stories).length}>{season.name}</th>
                ))}
              </tr>
              <tr>
                <th>Race</th>
                <th>Classe</th>
                <th>Name</th>
                <th>Level</th>
                <th>Order</th>
                <th>Histoire du personage</th>
                {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
                  Object.entries(season.stories).map(([storyKey, story]: any) => (
                    !story.races && <th key={storyKey+seasonKey}>{story.name}</th>
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
                      Object.entries(season.stories).map(([storyKey, story]: any) => (
                        (story.races && story.races[0] === value.race) &&
                          <table key={storyKey+seasonKey}>
                            <tbody>
                              <tr>
                                <td>
                                  {dataMapHtml(storyKey, key)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                      ))
                    ))}
                  </td>

                  {/* here we generate the rest of the quests */}
                  {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
                    Object.entries(season.stories).map(([storyKey, story]: any) => (
                      !story.races && <td key={storyKey+seasonKey} className="subTable">
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                {dataMapHtml(storyKey, key)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
