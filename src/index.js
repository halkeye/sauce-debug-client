const ipcRenderer = window.require('electron').ipcRenderer;
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';
import { loadLogins } from './actions.js';

// import * as storage from 'redux-storage';
// import createEngine from 'redux-storage-engine-localstorage';

import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ipcRenderer.on('manage-accounts', () => {
  store.dispatch(push('/accounts'));
});

ipcRenderer.on('load-accounts', (event, data) => {
  store.dispatch(loadLogins(data));
});

ipcRenderer.send('ready-load-accounts');

let prevState = store.getState();
store.subscribe(() => {
  const state = store.getState();
  if (prevState.logins !== state.logins) {
    ipcRenderer.send('save-accounts', state.logins);
  }
});

const Entry = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

render(<Entry />, document.getElementById('content'));
