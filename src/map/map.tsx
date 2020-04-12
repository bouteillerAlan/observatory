import React, {useEffect, useState} from 'react';
import sortData from '../request/getAll';
import checkApiKey from '../request/checkApiKey';
import Nav from '../nav/nav';
import questsList from '../data/quests';
import './map.scss';

const Map: React.FunctionComponent = () => {
  const [dataMap, setDataMap] = useState(); // no type because the {} type bugs the [index]
  const [loading, setLoading] = useState(true);

  console.log(dataMap);

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
   * @Param {HTMLElement} idFrom arrow start
   * @Param {HTMLElement} idTo arrow end
   * @Param {HTMLElement} idLine the arrow element (have any type because tslint...)
   * @Param {boolean} color if the quest is done or not
   * @Return {void} return nothing update the DOM
   */
  function gArrow(idFrom: any, idTo: any, idLine: any, color: boolean) {
    if (idFrom !== 0) {
      const from: HTMLElement | null = document.getElementById(idFrom);
      const to: HTMLElement | null = document.getElementById(idTo);
      const line: any | null = document.getElementById(idLine);

      if (from && to && line) {
        const fT = from.offsetTop + from.offsetHeight/2;
        const tT = to.offsetTop + to.offsetHeight/2;
        const fL = from.offsetLeft + from.offsetWidth/2;
        const tL = to.offsetLeft + to.offsetWidth/2;

        const CA = Math.abs(tT - fT);
        const CO = Math.abs(tL - fL);
        const H = Math.sqrt(CA*CA + CO*CO);
        let ANG = 180 / Math.PI * Math.acos( CA/H );

        let top; let left;
        if (tT > fT) {
          top = (tT-fT)/2 + fT;
        } else {
          top = (fT-tT)/2 + tT;
        }
        if (tL > fL) {
          left = (tL-fL)/2 + fL;
        } else {
          left = (fL-tL)/2 + tL;
        }

        if (( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
          ANG *= -1;
        }
        top-= H/2;

        line.classList.add(color ? 'bg-green' : 'bg-red');
        line.style['-webkit-transform'] = 'rotate('+ ANG +'deg)';
        line.style['-moz-transform'] = 'rotate('+ ANG +'deg)';
        line.style['-ms-transform'] = 'rotate('+ ANG +'deg)';
        line.style['-o-transform'] = 'rotate('+ ANG +'deg)';
        line.style['-transform'] = 'rotate('+ ANG +'deg)';
        line.style.top = top+'px';
        line.style.left = left+'px';
        line.style.height = H + 'px';
      }
    }
  }

  // the loading deps allow to rerender the component with the
  // data and generate the arrow
  useEffect(() => {
    checkApiKey();
    sortData().then((res: any) => {
      setDataMap(res);
      setLoading(false);
    });
  }, [loading]);

  /**
   * map the arrow
   * @Param {string} name the current character name without space (for css class)
   * @Param {string} key the current character name
   * @Param {{id: number, pid: number}} subLine the data for generate arrow
   * @Return {dom} the arrow
   */
  function dataMapArrow(name: string, key: string, subLine: {id: number, pid: number}) {
    return (
      <span className='lb-one'>
        <div className={'card ' + (dataMap.charactersData.questsDone[key].includes(subLine.id) ? 'bg-green' : 'bg-red')} id={name+subLine.id}> </div>
        {/* if precedent is array map it */}
        {Array.isArray(subLine.pid) ?
          subLine.pid.map((subColPid: any) => (
            <>
              <div className="arrow" id={'a'+name+subColPid+subLine.id}> </div>
              {gArrow(name+subColPid, name+subLine.id, 'a'+name+subColPid+subLine.id, (dataMap.charactersData.questsDone[key].includes(subLine.id)) && dataMap.charactersData.questsDone[key].includes(subColPid))}
            </>
          )) :
          <>
            <div className="arrow" id={'a'+name+subLine.pid+subLine.id}> </div>
            {gArrow(name+subLine.pid, name+subLine.id, 'a'+name+subLine.pid+subLine.id, (dataMap.charactersData.questsDone[key].includes(subLine.id)) && dataMap.charactersData.questsDone[key].includes(subLine.pid))}
          </>
        }
      </span>
    );
  }

  /**
   * map the html map
   * @Param {string | number} storyKey the key of the story
   * @Param {string} key the key of character array
   * @Return {dom} return the map
   */
  function dataMapHtml(storyKey: string | number, key: string) {
    const name: string = key.replace(/\s/g, '');
    return (Object.entries(questsList).map(([qLKey, line]: any) => (
      qLKey === storyKey &&
      line.map((col: any) => (
        <div key={name+qLKey+col.id} className='map-item'>
          {col.map((line: any) => (
            <div key={name+qLKey+line.id} className='map-item-screen'>
              {line.map((subLine: any) => (
                <div key={name+qLKey+subLine} className='map-choice'>
                  {Array.isArray(subLine) ?
                    subLine.map((subCol: any) => (
                      dataMapArrow(name, key, subCol)
                    )) :
                    dataMapArrow(name, key, subLine)
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
                          <div className="table" key={storyKey+seasonKey}>
                            {dataMapHtml(storyKey, key)}
                          </div>
                      ))
                    ))}
                  </td>

                  {/* here we generate the rest of the quests */}
                  {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
                    Object.entries(season.stories).map(([storyKey, story]: any) => (
                      !story.races && <td key={storyKey+seasonKey} className="subTable">
                        <div className="table">
                          {dataMapHtml(storyKey, key)}
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
