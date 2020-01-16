import history from '../server/history';

const _API_URL = process.env.REACT_APP_API_URL;
const _apiKey = localStorage.getItem('key');

/**
 * check the api key stock in the localstorage
 * @return {void} return nothing, push new page in history
 */
export default function checkApiKey() {
  fetch(`${_API_URL}characters?access_token=${_apiKey}`).then((res: any) => {
    if (res.status !== 200) {
      history.push('/');
    }
  });
}
