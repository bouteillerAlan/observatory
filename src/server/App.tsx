import React, {useEffect} from 'react';
import {Router, Route} from 'react-router';
import history from './history';
import Home from '../home/home';
import Card from '../card/card';
import Map from '../map/map';
import M from 'materialize-css';
import './general.scss';

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
      <Route exact path={'/map'} component={Map} />
      <Route exact path={'/card'} component={Card} />
    </Router>
  );
};

export default App;
