import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localStorage';

import ToolboxApp from 'react-toolbox/lib/app';

import App from './components/App.js';
import reducer from './reducers.js';

const engine = createEngine('sauce');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

let store = createStoreWithMiddleware(
  storage.reducer(reducer), 
  undefined,  
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

const load = storage.createLoader(engine);
load(store);

const Entry = () => (<ToolboxApp><App store={store} /></ToolboxApp>);

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(<Entry />, document.getElementById('content'));
