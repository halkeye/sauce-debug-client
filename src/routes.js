import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import MainWindow from './components/MainWindow.js';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={MainWindow} />
  </Route>
);
