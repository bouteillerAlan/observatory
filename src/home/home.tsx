import React, {useState, useEffect} from 'react';
import history from '../server/history';
import './home.scss';

const _API_URL = process.env.REACT_APP_API_URL;

const Home: React.FunctionComponent = () => {
  const [apiKey, setApiKey] = useState('');
  const [lang, setLang] = useState('fr');
  const [gdpr, setGdpr] = useState(false);

  const [gdprError, setGdprError] = useState({message: '', status: false});
  const [apiKeyError, setApiKeyError] = useState({message: '', status: false});

  const [disabled, setDisabled] = useState(false);

  /**
   * handle the value of "disabled"
   * @return {void} return nothing, set state value
   */
  function disableSubmit() {
    setDisabled(gdprError.status || apiKeyError.status);
  }

  /**
   * validate the gdpr checkbox
   * @param {boolean} value the checkbox value you want to validate
   * @return {boolean} return true if is ok
   */
  async function checkGdpr(value: boolean) {
    if (!value) {
      setGdprError({message: 'check obligatoire', status: true});
      return false;
    } else {
      setGdprError({message: '', status: false});
      return true;
    }
  }

  /**
   * validate the api key whit the gw2 api
   * @param {string} _apiKey the api key you want to test
   * @return {boolean} return true if is ok
   */
  async function checkAccount(_apiKey: any) {
    fetch(`${_API_URL}account?access_token=${_apiKey}`, {
      method: 'GET',
      mode: 'cors',
    }).then((res: any) => {
      if (res.status && res.status === 200) {
        setApiKeyError({message: '', status: false});
        return true;
      } else {
        setApiKeyError({message: 'Api key check failed', status: true});
        return false;
      }
    });
  }

  /**
   * validate an api key
   * @param {string} value the value you want to validate
   * @return {boolean} return true if is ok
   */
  async function checkApiKey(value: string) {
    if (value === '') {
      setApiKeyError({message: 'Value must not be null', status: true});
      return false;
    } else if (value.match(/[[\]\\&~@^%!:*$€¤£µ_/+°={}`|#²<>]/gm)) {
      setApiKeyError({message: 'Unauthorized character', status: true});
      return false;
    } else if (!value.match(/[A-Z0-9]{8}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{20}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{4}[-]{1}[A-Z0-9]{12}/gm)) {
      setApiKeyError({message: 'Value is not a api key format', status: true});
      return false;
    } else {
      return checkAccount(value);
    }
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
   * check the form data and
   * allow to redirect to the next page or not
   * @return {void} return nothing, redirect to the next page
   */
  async function submitForm() {
    if (checkApiKey(apiKey) && await checkGdpr(gdpr)) {
      await localStorage.setItem('obsKey', apiKey);
      await localStorage.setItem('obsLang', lang);
      history.push('/map');
    }
  }

  useEffect(() => {
    console.log('#');
    disableSubmit();
  }, [gdpr, apiKey, apiKeyError, gdprError]);

  return (
    <section className="home">
      <div className="container row">
        <div className="col s12">
          <h1>Welcome to observatory</h1>
        </div>
        {/* form */}
        <div className="col s12">
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
            {apiKeyError.status && <div className="errorCard"><p>{apiKeyError.message}</p></div>}
            {gdprError.status && <div className="errorCard"><p>{gdprError.message}</p></div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
