import React, {useEffect} from 'react';
import {Router, Route} from 'react-router';
import history from './history';
import Home from '../home/home';
import M from 'materialize-css';

const App: React.FunctionComponent = () => {

  // init materialize js
  useEffect(() => {
    const elemsSelect = document.querySelectorAll('select');
    const optionsSelect = {};
    M.FormSelect.init(elemsSelect, optionsSelect);
    const elemsModal = document.querySelectorAll('.modal');
    const optionsModal = {};
    M.Modal.init(elemsModal, optionsModal);
  });

  return (
    <Router history={history}>
      <Route exact path={'/'} component={Home} />
    </Router>
  );
};

export default App;
