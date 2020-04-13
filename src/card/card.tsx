import React, {useEffect, useState} from 'react';
import Nav from '../nav/nav';
import checkApiKey from '../request/checkApiKey';
import sortData from '../request/getAll';
import './card.scss';
import tuto from '../data/tutorials';

const Card: React.FunctionComponent = () => {
  const [dataMap, setDataMap] = useState(); // no type because the {} type bugs the [index]
  const [loading, setLoading] = useState(true);
  const [lang] = useState(localStorage.getItem('obsLang') || 'eng');

  console.log(dataMap);

  useEffect(() => {
    console.log('effect');
    checkApiKey();
    sortData().then((res: any) => {
      setDataMap(res);
      setLoading(false);
    });
  }, []);

  return (
    <section>
      <Nav active={'card'} />
      {loading ?
        <div className="progress">
          <div className="indeterminate"> </div>
        </div> :
        ''}

      <div className="container screen-card">
        {dataMap &&
          <div id="season_grid">

            {Object.entries(dataMap.dataMap).map(([seasonKey, season]: any) => (
              <div key={seasonKey}>
                <div>
                  <h4>
                    {season.name + ' '}
                    {tuto[seasonKey][lang]['link'] &&
                      <a href={tuto[seasonKey][lang]['link']} target="_blank" rel="noopener noreferrer" className="explore tooltipped marging" data-position="right" data-tooltip={lang==='fr' ? 'Vers le tutoriel' : 'Go to tutorial'}>
                        <i className="material-icons white-text">explore</i>
                      </a>
                    }
                    {tuto[seasonKey][lang]['wiki'] &&
                    <a href={tuto[seasonKey][lang]['wiki']} target="_blank" rel="noopener noreferrer" className="tooltipped" data-position="right" data-tooltip={lang==='fr' ? 'Vers le wiki' : 'Go to the wiki'}>
                      <i className="material-icons white-text">event_note</i>
                    </a>
                    }
                  </h4>
                  <div>
                    <div className="card_overflow">
                      <div className="cards_stack">
                        {Object.entries(dataMap.dataMap[seasonKey]['stories']).map(([storyKey, story]: any) => (
                          <div key={storyKey} className={'card i' + seasonKey} onClick={(e) => {
                            // this.handleCard(dataMap.dataMap[season]['stories'][story]['id'], season, story, e);
                          }}>
                            <div className="card_bck">
                              <h6>{story.name}</h6>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>

    </section>
  );
};

export default Card;
