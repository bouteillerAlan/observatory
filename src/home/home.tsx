import React, {useEffect, useState} from 'react';
import './home.scss';

const Home: React.FunctionComponent = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState({message: '', status: false});
  const [lang, setLang] = useState('fr');
  const [gdpr, setGdpr] = useState(false);
  const [gdprError, setGdprError] = useState({message: '', status: false});
  const [disabled, setDisabled] = useState(false);

  /**
   * validate an api key
   * @param {string} value the value you want to validate
   * @return {void} return nothing, change state for error handler
   */
  function checkApiKey(value: string) {
    if (value === '') {
      setApiKeyError({message: 'Value must not be null', status: true});
    } else if (value.match(/[[\]\\&~@^%!:*$€¤£µ_/+°={}`|#²<>]/gm)) {
      setApiKeyError({message: 'Unauthorized character', status: true});
    } else if (!value.match(/[A-Z0-9]{8}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{20}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{12}/gm)) {
      setApiKeyError({message: 'Value is not a api key format', status: true});
    } else {
      setApiKeyError({message: '', status: false});
    }
  }

  /**
   * validate the gdpr checkbox
   * @param {boolean} value the checkbox value you want to validate
   * @return {void} return nothing, change state for error handler
   */
  function checkGdpr(value: boolean) {
    console.log('check value', value);
    if (!value) {
      setGdprError({message: 'obligatoire', status: true});
    } else {
      setGdprError({message: '', status: false});
    }
  }

  /**
   * handle the value of "disabled"
   * @return {void} return nothing, set state value
   */
  function disableSubmit() {
    setDisabled(gdprError.status || apiKeyError.status);
  }

  /**
   * control the form
   * @param {any} target the event.target
   * @return {void} void set state value
   */
  function handleForm(target: any) {
    if (target.name === 'apiKey') {
      setApiKey(target.value);
      checkApiKey(target.value);
    } else if (target.name === 'lang') {
      setLang(target.value);
    } else if (target.name === 'gdpr') {
      setGdpr(target.checked);
      checkGdpr(target.checked);
    }
  }

  /**
   * @return {void} void
   */
  function submitForm() {
    // test data form
    checkApiKey(apiKey);
    checkGdpr(gdpr);
    // todo check api key directly whit the gw2 api
    if (!apiKeyError && !gdprError) {
      localStorage.setItem('key', apiKey);
      localStorage.setItem('lang', lang);
      // todo and push to the next page
    }
  }

  useEffect(() => {
    disableSubmit();
  });

  return (
    <section className="home">
      <div className="container row">
        <div className="input-field col s12">
          <input type="text" name="apiKey" id="apiKey" value={apiKey} onChange={(e) => handleForm(e.target)}/>
          <label htmlFor="apiKey">API Key</label>
        </div>
        <div className="input-field col s12">
          <select name="lang" id="lang" value={lang} onChange={(e) => handleForm(e.target)}>
            <option value="fr">Français</option>
            <option value="eng">English</option>
          </select>
          <label htmlFor="lang">Language</label>
        </div>
        <div className="input-field col s12">
          <p>
            <label>
              <input type="checkbox" name="gdpr" id="gdpr" checked={gdpr} onChange={(e) => handleForm(e.target)}/>
              <span>J'aceppte d'enregistrer les données fournis dans le cookie.</span>
            </label>
          </p>
        </div>
        <div className="input-field col s12">
          <button className="btn waves-effect waves-light" disabled={disabled} onClick={() => submitForm()}>Submit</button>
        </div>
        <div className="col s12">
          <p>{apiKeyError.message}</p>
          <p>{gdprError.message}</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
