import React, {useEffect, useState} from 'react';
import Nav from '../nav/nav';
import checkApiKey from '../request/checkApiKey';
import sortData from '../request/getAll';
import './card.scss';

import tuto from '../data/tutorials';
import questsList from '../data/quests';

import Guardian from '../img/Guardian_icon.png';
import Warrior from '../img/Warrior_icon.png';
import Necromancer from '../img/Necromancer_icon.png';
import Elementalist from '../img/Elementalist_icon.png';
import Thief from '../img/Thief_icon.png';
import Engineer from '../img/Engineer_icon.png';
import Ranger from '../img/Ranger_icon.png';
import Revenant from '../img/Revenant_icon.png';
import Mesmer from '../img/Mesmer_icon.png';

const Card: React.FunctionComponent = () => {
  const [dataMap, setDataMap] = useState(); // no type because the {} type bugs the [index]
  const [loading, setLoading] = useState(true);
  const [lang] = useState(localStorage.getItem('obsLang') || 'eng');
  // modal is open ?
  const [isOpen, setIsOpen] = useState(false);
  const [onClose, setOnClose] = useState(false);
  // stock the DOM coordinates of parent and grid for animation
  const [parent, setParent] = useState();
  const [grid, setGrid] = useState();
  const [elemShow, setElemShow] = useState();

  console.log(dataMap);

  /**
   * lorem ipsum
   */
  function setProperty() {
    // just the body
    const body = document.getElementsByTagName('body')[0];
    // get the target content
    const target = document.getElementById(elemShow['id']);

    if (target) {
      const header: any = target.getElementsByClassName('header')[0];
      const title: any = target.getElementsByClassName('header-title')[0];
      const btnClose: any = target.getElementsByClassName('header-close')[0];
      const schema: any = target.getElementsByClassName('schema')[0];
      const overflowScreen: any = target.getElementsByClassName('ecran_overflow')[0];
      // set target value
      target.style.setProperty('--top-target', parent['top']+'px');
      target.style.setProperty('--left-target', parent['left']+'px');
      // transform origin is card emplacement - container value
      grid['elem'].style.transformOrigin = `${ parent['left']-grid['left'] }px ${ parent['top']-grid['top'] }px 0px`;

      if (onClose) {
        // switch close status
        setOnClose(false);
        // remove overflow
        overflowScreen.style.overflow = 'hidden';
        target.style.overflow = 'hidden';
        // remove older animation
        title.classList.remove('fadeInLeft');
        btnClose.classList.remove('fadeInRight');
        header.classList.remove('fadeInDown');
        schema.classList.remove('fadeIn');
        // add new anim
        title.classList.add('fadeOutRight');
        btnClose.classList.add('fadeOutLeft');
        header.classList.add('fadeOutUp');
        schema.classList.add('fadeOut');
        // and just after close the card
        setTimeout(() => {
          title.style.opacity = '0';
          schema.style.opacity = '0';
          target.classList.add('exit'); // add class for closing
          target.classList.remove('call'); // remove class for opening
          grid['elem'].style.transform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)'; // anim for background
        }, 350);
        // time exit animation - 5ms 250
        setTimeout(() => {
          // switch status card
          setIsOpen(false);
          target.style.display = 'none';
        }, 500); // delete card content to the view
      } else {
        // call target
        // show the overflow only at end
        target.style.overflow = 'hidden';
        overflowScreen.style.overflow = 'hidden';
        // remove old class
        title.classList.remove('fadeOutRight');
        btnClose.classList.remove('fadeOutLeft');
        header.classList.remove('fadeOutUp');
        schema.classList.remove('fadeOut');
        // make sur content is invisible
        header.style.opacity = '0';
        schema.style.opacity = '0';
        grid['elem'].style.transform = 'matrix3d(5,0,0.00,0,0.00,5,0.00,0,0,0,1,0,0,0,0,1)'; // anim the background
        target.classList.remove('exit'); // remove class for closing
        target.style.display = 'block'; // show card content
        target.classList.add('call'); // add class for opening
        // add animated and make elem visible
        setTimeout(() => {
          overflowScreen.style.overflow = 'auto';
          header.classList.add('fadeInDown');
          header.style.opacity = '1';
        }, 350);
        setTimeout(() => {
          title.classList.add('fadeInLeft');
          btnClose.classList.add('fadeInRight');
          schema.style.opacity = '1';
          schema.classList.add('fadeIn');
        }, 360);
      }
    }

    // toggle overflow for the body
    body.classList.toggle('noOver');
  }

  /**
   * return a block for each quests in a card
   * @Param {any} map the data
   * @Param {string} id the current card id
   * @Param {any} season season
   * @Param {any} story story
   * @Param {string} lang the lang fr || eng
   * @Return {reactNode} the card
   */
  function block(map: any, id: string, season: any, story: any, lang: string) {
    console.log('block');
    const data = dataMap.dataMap;

    return (
      <div className={'card_tree'} key={id}>
        <p className={'info'}>
          <small>Lvl : {map[season]['story'][story]['quests'][id]['Qlevel']}</small>
          {questsList['durmand'].includes(id) ?
            <span className="durmand tooltipped" data-position="top" data-tooltip={lang==='fr' ? 'Prieuré de Durmand' : 'Durmand Priory'}> </span> :
            null
          }
          {questsList['whisper'].includes(id) ?
            <span className="whisper tooltipped" data-position="top" data-tooltip={lang==='fr' ? 'Ordre des Soupirs' : 'Order of Whispers'}> </span> :
            null
          }
          {questsList['vigil'].includes(id) ?
            <span className="vigil tooltipped" data-position="top" data-tooltip={lang==='fr' ? 'Veilleurs' : 'Vigil'}> </span> :
            null
          }
          <small>Qid : {map[season]['story'][story]['quests'][id]['Qid']}</small>
        </p>
        <h5 className={'title'}>{map[season]['story'][story]['quests'][id]['Qname']}</h5>
        <div className={'card_persona'}>
          {Object.keys(map[season]['story'][story]['quests'][id]['status']).map((character) => (
            <span key={character} className={'tooltipped status ' + (!map[season]['story'][story]['quests'][id]['authorization'][character] ? 'grey' : map[season]['story'][story]['quests'][id]['status'][character] ? 'green' : 'red')} data-position="top" data-tooltip={character}>
              <span>
                {!map[season]['story'][story]['quests'][id]['authorization'][character] ?
                  <del>{character.substring(0, 3)}</del> :
                  character.substring(0, 3)
                }
              </span>
              <span>
                <img src={
                  data['characterId'][character]['profession'] === 'Guardian' ? Guardian :
                  data['characterId'][character]['profession'] === 'Warrior' ? Warrior :
                  data['characterId'][character]['profession'] === 'Necromancer' ? Necromancer :
                  data['characterId'][character]['profession'] === 'Elementalist' ? Elementalist :
                  data['characterId'][character]['profession'] === 'Thief' ? Thief :
                  data['characterId'][character]['profession'] === 'Engineer' ? Engineer :
                  data['characterId'][character]['profession'] === 'Ranger' ? Ranger :
                  data['characterId'][character]['profession'] === 'Revenant' ? Revenant :
                  data['characterId'][character]['profession'] === 'Mesmer' ? Mesmer :
                  undefined
                } alt="class icon" className="icon_class"/>
              </span>
            </span>
          ))}
        </div>

        {
          questsList['2choice'].includes(id) ?
            <div className="choice-2">
              <i className="material-icons a">looks_two</i>
              <hr/>
            </div> :
            questsList['3choice'].includes(id) ?
            <div className="choice-3">
              <i className="material-icons a">looks_3</i>
              <hr/>
            </div> :
              questsList['5choice'].includes(id) ?
              <div className="choice-5">
                <i className="material-icons a">looks_5</i>
                <hr/>
              </div> :
              null
        }
      </div>
    );
  }

  /**
   * return the html content for each card
   * @Return {reactNode} the card
   */
  function showCard() {
    console.log('sgowcard');
    console.log(elemShow);
    // get data
    const map = dataMap.dataMap;

    // stock
    const season = elemShow['season'].name;
    const story = elemShow['story'].name;
    const id = elemShow['id'];

    // return card with good data
    return (
      <div className="card_content" id={id}>
        <div className="content">

          <div className={'header animated ' + season.replace(/[\s]|[']/g, '')}>
            <div className="header-title animated">
              <h4>{season}</h4>
              <p>{story}</p>
              <div className="icons">
                {/* History desc*/}
                {story.description &&
                <p>
                  <a className="modal-trigger" href={'#m'+id}>
                    <i className="material-icons tooltipped" data-position="top" data-tooltip={lang==='fr' ? 'Description' : 'Description'}>announcement</i>
                  </a>
                </p>
                }
                {/* Tutorial*/}
                {tuto[id][lang]['link'] &&
                <p>
                  <a href={tuto[id][lang]['link']} target="_blank" rel="noopener noreferrer" className="explore tooltipped" data-position="top" data-tooltip={lang==='fr' ? 'Vers le tutoriel' : 'Go to tutorial'}>
                    <i className="material-icons">explore</i>
                  </a>
                </p>
                }
                {/* youtube*/}
                {tuto[id][lang]['video'] &&
                <p>
                  <a href={tuto[id][lang]['video']} target="_blank" rel="noopener noreferrer" className="tooltipped" data-position="top" data-tooltip={lang==='fr' ? 'Vers la vidéo' : 'Go to the vidéo'}>
                    <i className="material-icons">ondemand_video</i>
                  </a>
                </p>
                }
                {/* wiki*/}
                {tuto[id][lang]['wiki'] &&
                <p>
                  <a href={tuto[id][lang]['wiki']} target="_blank" rel="noopener noreferrer" className="tooltipped" data-position="top" data-tooltip={lang==='fr' ? 'Vers le wiki' : 'Go to the wiki'}>
                    <i className="material-icons">event_note</i>
                  </a>
                </p>
                }
              </div>
            </div>
            <div className="header-close animated">
              <span onClick={() => {
                handleCard(story.id);
              }}>
                <i className="material-icons">close</i>
              </span>
            </div>
          </div>

          <div className="schema animated">
            <div className="ecran_overflow">
              <div className="ecran">
                {questsList[story.id] && questsList[story.id].map((quest: any) => (
                  <div key={quest} className="grid">
                    {quest.map((line: any) => (
                      <div key={line} className="line">
                        {line.map((id: any) => (
                          <div key={id} className="multi_card">
                            {Array.isArray(id) ?
                              // if id is array, is a choice
                              id.map((uId) => (
                                block(map, uId.id, season, story, lang)
                              )) :
                              // else is a single quest
                              block(map, id.id, season, story, lang)
                            }
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Handle the card open action
   * rec the data in each state for the css animation
   * @Param {string} id the id for the current card
   * @Param {string} season the season id
   * @Param {string} story the story id
   * @Param {DOMevent} event the event
   * @Return {void} exec showCard()
   */
  function handleCard(id: string, season?: string, story?: string, event?: any) {
    console.log('handle card');
    // if is not open stock the value of grid, target and data
    // the value is delete and replace each time of card is open
    if (!isOpen) {
      // card is open
      setIsOpen(true);
      setGrid({
        elem: document.getElementById('season_grid'),
        top: document.getElementById('season_grid')?.getBoundingClientRect().top,
        left: document.getElementById('season_grid')?.getBoundingClientRect().left,
      });
      setParent({
        elem: event.currentTarget,
        top: event.currentTarget.getBoundingClientRect().top,
        left: event.currentTarget.getBoundingClientRect().left,
      });
      setElemShow({
        season: season,
        story: story,
        id: id,
      });
      console.log('tttttt');
      console.log(season);
      // showCard(); // PING maybe in useEffect
    } else {
      // if is a close action value is already defined
      // onClose demand
      console.log('#####');
      setOnClose(true);
      showCard(); // PING maybe in useEffect
      setProperty();
    }
  }

  useEffect(() => {
    console.log('effect');
    checkApiKey();
    sortData().then((res: any) => {
      setDataMap(res);
      setLoading(false);
      if (elemShow && grid && parent) {
        console.log('ping');
        showCard();
        setProperty();
      }
    });
  }, [elemShow]);

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
                          <div key={story.id} className={'card i' + seasonKey} onClick={(e) => {
                            handleCard(story.id, season, story, e);
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
