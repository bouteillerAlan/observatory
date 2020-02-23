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

  /**
   * generate the arrow for the map
   */
  function gArrow() {
    if (document) {
      const cards = document.getElementsByClassName('card');

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const currentCardId = card.getAttribute('id');

        // get the previous card id
        let previousCardId: number;
        let pCard: any;
        // but before remove useless key in the quest list
        const uselessKeys = ['2choice', '3choice', '5choice', 'durmand', 'whisper', 'vigil'];
        uselessKeys.forEach((uselessKey: string) => {
          delete questsList[uselessKey];
        });
        // check if the currentCard exist on some quest list
        Object.entries(questsList).forEach(([key, value]: any) => {
          // here i transform the array in string (allow to have [0, [1, 2]] => '0,1,2')
          // and in array again which gives [0,1,2]
          const dataArray = value.toString().split(',');
          // if the current id is includes
          if (dataArray.includes(currentCardId)) {
            // the previous card is on -1 position in the array
            previousCardId = dataArray[dataArray.indexOf(currentCardId)-1];
            // get the previous card
            if (previousCardId) {
              pCard = document.getElementById(previousCardId.toString());
            }

            // set the coordinate
            const currentGps = {top: card.getBoundingClientRect().top, left: card.getBoundingClientRect().left};
            let previousGps: any;
            if (pCard) {
              previousGps = {top: pCard.getBoundingClientRect().top, left: pCard.getBoundingClientRect().left};
            }
            // create the arrow and give a unique id
            const arrow = document.createElement('span');
            arrow.id = 'a'+currentCardId;
            arrow.style.position = 'absolute';
            arrow.style.height = '5px';
            // arrow.style.width = '20px';
            arrow.style.backgroundColor = 'yellow';

            // const startPoint = [currentGps.top, currentGps.left];
            // const startPoint = [0, currentGps.left];
            // const endPoint = previousGps ? [previousGps.top, previousGps.left] : [0, 0];
            // const rise = endPoint[1]-startPoint[1];
            // const run = endPoint[0]-startPoint[0];
            // const slope = rise/run;
            // const degrees = 0;
            // // const width = Math.sqrt((rise*rise)+(run*run));
            const width = '5';

            // arrow.style.top='0';
            // arrow.style.left='0';
            arrow.style.width=width+'px';
            // arrow.style.transform='rotate('+(Math.atan(slope)*degrees)+'deg)';
            // arrow.style.transformOrigin='0 0';

            card.appendChild(arrow);

            console.log(currentGps);
            console.log(previousGps);
          }
        });
      }

    }
  }

  useEffect(() => {
    checkApiKey();
    sortData().then((res: any) => {
      setDataMap(res);
      setLoading(false);
      // gArrow();
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
                        >
                        </div>
                      </span>
                    )) :
                    <span className='lb-one'>
                      <div className={'card ' + (dataMap.charactersData.questsDone[key].includes(Number(subLine)) ? 'bg-green' : 'bg-red')}
                        id={subLine}
                      >
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
                    !story.races && <th key={storyKey+seasonKey}>{story.name} {story.races && '- '+story.races[0]}</th>
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
