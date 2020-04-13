import history from '../server/history';

const _API_URL = process.env.REACT_APP_API_URL;
const _apiKey = localStorage.getItem('obsKey');

/**
 * check the api key stock in the localstorage
 * @return {void} return nothing, push new page in history
 */
export function checkApiKey() {
  fetch(`${_API_URL}characters?access_token=${_apiKey}`).then((res: any) => {
    if (res.status !== 200) {
      history.push('/');
    }
  });
}

/**
 * check the key access in account and characters endpoint
 * @Param {string} key the api key
 * @Return {boolean} return tru if the key is valid
 */
export function checkApiKeyRight(key: string) {
  return fetch(`${_API_URL}characters?access_token=${key}`).then((res: any) => {
    if (res.status !== 200) {
      return false;
    }
    return fetch(`${_API_URL}characters?access_token=${key}`).then((res: any) => {
      return res.status === 200;
    });
  });
}
