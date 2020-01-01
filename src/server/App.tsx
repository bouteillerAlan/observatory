import React from 'react';
import {Router, Route} from 'react-router';
import history from './history';

const home: React.FunctionComponent = () => {return (<p>Home</p>)};

const App: React.FunctionComponent = () => {
  return (
    <Router history={history}>
      <Route exact path={'/'} component={home} />
    </Router>
  );
};

export default App;
