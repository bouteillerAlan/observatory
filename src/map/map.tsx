import React, {useEffect, useState} from 'react';
import sortData from '../request/getAll';
import checkApiKey from '../request/checkApiKey';
import Nav from '../nav/nav';
import questsList from '../data/quests';
import './map.scss';

const Map: React.FunctionComponent = () => {
  const [dataMap, setDataMap] = useState(); // no type because the {} type bugs the [index]
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    checkApiKey();
    sortData().then((res: any) => {
      setDataMap(res);
      setLoading(false);
    });
  }, []);

  return (
    <section className="map">
      <Nav active={'map'} />
      <div className="row">
        <div className="col s12">
          <div className="container">
            {loading ?
              <div className="progress">
                <div className="indeterminate"></div>
              </div> :
              ''}
          </div>
          {dataMap && !loading &&
            <div className="row screen">
              <table>
                <thead>
                  <tr>
                    <th colSpan={5}>Persona</th>
                    {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
                      <th key={seasonKey} colSpan={Object.keys(season.stories).length}>{season.name}</th>
                    ))}
                  </tr>
                  <tr>
                    <th>Race</th>
                    <th>Classe</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Order</th>
                    {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
                      Object.entries(season.stories).map(([storyKey, story]: any) => (
                        <th key={storyKey+seasonKey}>{story.name} {story.races && '- '+story.races[0]}</th>
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
                      {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
                        Object.entries(season.stories).map(([storyKey, story]: any) => (
                          <td key={storyKey+seasonKey} className="subTable">
                            <table>
                              <tbody>
                                <tr>
                                  {Object.entries(story.quests).map(([questKey, quest]: any) => (
                                    <td key={questKey}
                                      className={dataMap.charactersData.questsDone[key].includes(Number(questKey)) ? 'bg-green' : 'bg-red'}
                                    >
                                    </td>
                                  ))}
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
        </div>
      </div>
    </section>
  );
};

export default Map;
