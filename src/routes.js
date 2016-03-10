import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import MainWindow from './components/MainWindow.js';
import Accounts from './pages/Accounts.jsx';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={MainWindow} />
    <Route path='accounts' component={Accounts} />
  </Route>
);
