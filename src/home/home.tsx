import React, {useEffect, useState} from 'react';
import M from 'materialize-css';
import '../server/general.scss';
import './home.scss';
import logoBus from '../img/logo.png';
import card from '../img/card.png';
import tree from '../img/tree.png';
// eslint-disable-next-line camelcase
import flag_fr from '../img/france.png';
// eslint-disable-next-line camelcase
import flag_uk from '../img/united-kingdom.png';
import {checkApiKeyRight} from '../request/checkApiKey';
import history from '../server/history';
/* eslint-disable react/no-unescaped-entities */

const Home = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState();
  const [check, setCheck] = useState(false);
  const [checkError, setCheckError] = useState();
  const [lang, setLang] = useState('eng');
  const [howImg, setHowImg] = useState(card);

  useEffect(() => {
    // check key
    const localKey = localStorage.getItem('obsKey');
    if (localKey) {
      checkApiKeyRight(localKey).then((valid: boolean) => {
        if (valid) {
          history.push('/card');
        }
      });
    }
    // init select
    const elems = document.querySelectorAll('select');
    const options = {};
    M.FormSelect.init(elems, options);
    // mep height in special div
    const aH = document.getElementById('colA')?.offsetHeight;
    const colB = document.getElementById('colB');
    if (colB) colB.style.height = `${aH}px`;
  }, [lang]);

  /**
   * handle the apiKey input
   * @Param {React.ChangeEvent<HTMLInputElement>} event
   * @Return {void} set state
   */
  function handleApiKey(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setApiKey(value);
    if (value === '') {
      setApiKeyError('Value must not be null');
    } else if (value.match(/[[\]\\&~@^%!:*$€¤£µ_/+°={}`|#²<>]/gm)) {
      setApiKeyError('Unauthorized character');
    } else if (!value.match(/[A-Z0-9]{8}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{20}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{12}/gm)) {
      setApiKeyError('Value is not a api key format');
    } else {
      setApiKeyError(false);
    }
  }

  /**
   * handle the checkbox
   * @Return {void} set state
   */
  function handleCheck() {
    const target = document.getElementById('check') as HTMLInputElement;
    const value = target?.checked;
    if (value) {
      setCheckError(null);
      setCheck(value);
    } else {
      setCheckError('Accept conditions');
      setCheck(false);
    }
  }

  /**
   * handle the lang select
   * @param {React.ChangeEvent<HTMLSelectElement>} event dom event in select
   * @Return {void} set state
   */
  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setLang(event.target.value);
  }

  /**
   * handle the submit button
   * @Return {void} set state and redirect
   */
  function handleSubmit() {
    if (!check) {
      setCheckError('Accept conditions');
    } else if (apiKey === '') {
      setApiKeyError('Value must not be null');
    } else if (apiKey.match(/[[\]\\&~@^%!:*$€¤£µ_/+°={}`|#²<>]/gm)) {
      setApiKeyError('Unauthorized character');
    } else if (!apiKey.match(/[A-Z0-9]{8}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{20}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{12}/gm)) {
      setApiKeyError('Value is not a api key format');
    } else {
      // check the api keys
      checkApiKeyRight(apiKey).then((res) => {
        if (!res) {
          setApiKeyError('Invalid key');
        } else {
          localStorage.setItem('obsKey', apiKey);
          localStorage.setItem('obsLang', lang);
          setApiKeyError(false);
          history.push('/card');
        }
      });
    }
  }

  /**
   * Set lang and go the next div
   * @Param {string} lang fr | eng
   * @Return {void} set state
   */
  function getTop(lang: string) {
    setLang(lang);
  }


  return (
    <section>

      <div className="demo-3">
        <div>

          {/* head*/}
          <div className="head full row col s12 valign-wrapper center-align">

            <div className="meteor ma"> </div>
            <div className="meteor mb"> </div>
            <div className="meteor mc"> </div>
            <div className="meteor md"> </div>
            <div className="meteor me"> </div>
            <div className="meteor mf"> </div>

            <div className="row title">
              <h1><span className="yellow-text">O</span>bservatory</h1>
              <h2>Keep your story in mind</h2>
            </div>

            <div className="row lig_yellow"> </div>

            <div className="flag">
              <p>
                <span>
                  <a href="#top">
                    {/* eslint-disable-next-line camelcase */}
                    <img className="flag_img" src={flag_fr} alt="flag fr" onClick={() => getTop('fr') }/>
                  </a>
                </span>
                <span>
                  <a href="#top">
                    {/* eslint-disable-next-line camelcase */}
                    <img className="flag_img" src={flag_uk} alt="flag uk" onClick={() => getTop('eng') }/>
                  </a>
                </span>
              </p>
            </div>
          </div>
          {/* end head*/}

          <div className="row container valign-wrapper content" id="top">
            <div className="row">
              <div className="col s12 m6 img_content">
                <img src={logoBus} alt="logo du busmagique"/>
              </div>
              <div className="col s12 m6">
                {lang === 'eng' ?
                  <div>
                    <h3>What is Observatory</h3>
                    <p>Hosted by <a href="https://www.lebusmagique.fr/" target="_blank" rel="noopener noreferrer">
                      Le Bus Magique</a>, Observatory lets you know where each of your characters is in the Guild Wars 2 quest timeline.
                    </p>
                  </div> :
                  <div>
                    <h3>C'est quoi Observatory</h3>
                    <p>Hébergé par <a href="https://www.lebusmagique.fr/" target="_blank" rel="noopener noreferrer">
                      Le Bus Magique</a>, Observatory permet de savoir ou en est chacun de vos personnages dans la chronologie des quêtes de Guild Wars 2.
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="row container valign-wrapper content">
            <div className="row">
              <div className="col s12 m6" id='colA'>
                {lang === 'eng' ?
                  <div>
                    <h3>How it works</h3>
                    <p>Thanks to the <a href={'https://api.guildwars2.com/v2'} target="_blank" rel="noopener noreferrer">API provided by ArenaNet</a> we have sorted the Seasons, Stories and Quests in chronological order in two forms :</p>
                    <ul>
                      <li onMouseEnter={() => setHowImg(card)}>that of a card deck, where each card takes up the tree of quests by following the chronological order and by providing multiple information on the possible choices or not of each character.</li>
                      <br/>
                      <li onMouseEnter={() => setHowImg(tree)}>that of an arborescense without flourishes which allows at a glance to know where we are on the whole adventure.</li>
                    </ul>
                  </div> :
                  <div>
                    <h3>Comment ça fonctionne</h3>
                    <p>Grâce à <a href={'https://api.guildwars2.com/v2'} target="_blank" rel="noopener noreferrer">l'api fourni par ArenaNet</a> nous avons trié par ordre chronologique les Saisons, Histoires et Quêtes sous deux forme :</p>
                    <ul>
                      <li onMouseEnter={() => setHowImg(card)}>celle d'un deck de carte, ou chaque carte reprend l'arborescence des quêtes en suivant l'ordre chronologique et en fournissant de multiples informations sur les choix possibles ou non de chaque personnage.</li>
                      <br/>
                      <li onMouseEnter={() => setHowImg(tree)}>celle d'une arborescense sans fioriture qui permet d'un simple coup d'oeil de savoir où l'on en est sur l'ensemble de l'aventure.</li>
                    </ul>
                  </div>
                }
              </div>
              <div className="col s12 m6 img_content" id='colB'>
                <img src={howImg} alt="card"/>
              </div>
            </div>
          </div>

          <div className="row container valign-wrapper content">
            <div>
              <div className="col s12">
                {lang === 'eng' ?
                  <>
                    <div className="col s12 m6">
                      <h3>Data storage</h3>
                      <p>This app needs a API key to work (and others informations entered in the form below). It is stored in your browser via <a href={'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'} target="_blank" rel="noopener noreferrer">localStorage</a>.</p>
                      <p>You can delete this cookie at any time via the button "Reset" present at the top right of your screen. </p>
                      <p>No data is sent to our server. All data displayed in this application is provided by <a href={'https://api.guildwars2.com/v2'} target="_blank" rel="noopener noreferrer">Guild Wars 2 API</a> and localStorage cookie.</p>
                    </div>
                    <div className="col s12 m6">
                      <h3>Information to provide</h3>
                      <p>You need to provide a key with the following informations : account, characters, progression and pvp.</p>
                      <p>You can create a key from your <a href={'https://account.arena.net/applications'} target="_blank" rel="noopener noreferrer">ArenaNet account</a>.</p>
                    </div>
                  </> :
                  <>
                    <div className="col s12 m6">
                      <h3>Stockage des données</h3>
                      <p>Cette application à besoin d'une clé API pour fonctionner (ainsi que des informations entrée dans le formulaire ci-dessous). Ces informations sont stockées dans votre navigateur via <a href={'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'} target="_blank" rel="noopener noreferrer">localStorage</a>.</p>
                      <p>Vous pouvez supprimer ce cookie n'importe quand via le bouton "Reset" présent en haut à droite de votre écran.</p>
                      <p>Aucune donnée n'est envoyée à notre serveur. Toutes les données affichées sont fournis par <a href={'https://api.guildwars2.com/v2'} target="_blank" rel="noopener noreferrer">l'api Guild Wars 2</a> et le cookie localStorage.</p>
                    </div>
                    <div className="col s12 m6">
                      <h3>Informations à fournir</h3>
                      <p>Il faut fournir une clé api avec les informations suivantes : account, characters, progression et pvp.</p>
                      <p>Vous pouvez créer une clé api depuis votre <a href={'https://account.arena.net/applications'} target="_blank" rel="noopener noreferrer">compte ArenaNet</a>.</p>
                    </div>
                  </>
                }
              </div>

              <div className="col s12 api-input">
                <div className="input-field col s12 l6">
                  <input id="apiKey" type="text" className={apiKeyError && 'error'} value={apiKey} onChange={(e) => {
                    handleApiKey(e);
                  }}/>
                  <label htmlFor="apiKey">api key</label>
                  {apiKeyError && <span className="helper-text">{apiKeyError}</span>}
                </div>
                <div className="input-field col s12 l6">
                  <select value={lang} onChange={(e) => {
                    handleSelect(e);
                  }}>
                    <option value="eng">English</option>
                    <option value="fr">Français</option>
                  </select>
                  <label>Language</label>
                </div>
                <div className="col s12 l12">
                  <button className="btn waves-effect waves-light" onClick={() => {
                    handleSubmit();
                  }}>Submit
                    <i className="material-icons right">send</i>
                  </button>
                  <p>
                    <label>
                      <input type="checkbox" id="check" onChange={() => {
                        handleCheck();
                      }}/>
                      <span className={checkError && 'error'}>{lang === 'eng' ?
                        'I accept the registration of my API key and the choice of my display language in the "localStorage" cookie.' :
                        'J\'accepte l\'enregistrement de ma clé api et du choix de ma langue d\'affichage dans le cookie localStorage'
                      }</span>
                    </label>
                  </p>
                </div>
              </div>

              <div className="col s12">
                {lang === 'eng' ?
                  <div className="col s12">
                    <p>
                      This app is made by <a href="https://alanbouteiller.dev" target="_blank" rel="noopener noreferrer">Alan Bouteiller</a> for <a href="https://www.lebusmagique.fr/" target="_blank" rel="noopener noreferrer">Le Bus Magique</a>.
                      Do not hesitate to create an <a href="https://github.com/bouteillerAlan/SpyHistory/issues" target="_blank" rel="noopener noreferrer">Issue</a> if you find a bug.
                      All game images are © 2019 ArenaNet, Inc..<br/>
                      <small>CC BY-NC-SA Alan Bouteiller</small>
                    </p>
                  </div> :
                  <div className="col s12">
                    <p>
                      Cette application a été codée par <a href="https://alanbouteiller.dev" target="_blank" rel="noopener noreferrer">Alan Bouteiller</a> pour <a href="https://www.lebusmagique.fr/" target="_blank" rel="noopener noreferrer">Le Bus Magique</a>.
                      N'hésiter pas à créer une <a href="https://github.com/bouteillerAlan/SpyHistory/issues" target="_blank" rel="noopener noreferrer">Issue</a> si vous trouvez un bug.
                      Toutes les images du jeu sont © 2019 ArenaNet, Inc..<br/>
                      <small>CC BY-NC-SA Alan Bouteiller</small>
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Home;
