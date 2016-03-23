const ipcRenderer = window.require('electron').ipcRenderer;
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { loadLogins } from './actions.js';

import configureStore from './store/configureStore';

import 'app.css';

const initialStore = window.require('remote').getGlobal('initialStoreState');
const store = configureStore(initialStore);

ipcRenderer.on('manage-accounts', () => {
//  store.dispatch(push('/accounts'));
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

import MainWindow from './pages/MainWindow.jsx';

const Entry = () => (
  <Provider store={store}>
    <MainWindow />
  </Provider>
);

render(<Entry />, document.getElementById('content'));
