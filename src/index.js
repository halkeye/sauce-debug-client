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

let prevState = store.getState();
store.subscribe(() => {
  const state = store.getState();
  if (prevState.logins !== state.logins) {
    ipcRenderer.send('save-accounts', state.logins);
  }
  if (prevState.tabs !== state.tabs) {
    ipcRenderer.send('save-tabs', state.tabs);
  }
});

// Makes sure react-ui's touch events work
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MainWindow from './pages/MainWindow.jsx';

const Entry = () => (
  <Provider store={store}>
    <MainWindow />
  </Provider>
);

render(<Entry />, document.getElementById('content'));
