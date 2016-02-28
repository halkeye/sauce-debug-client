import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import ToolboxApp from 'react-toolbox/lib/app';

import App from './components/App.js';
import reducer from './reducers.js';

let store = createStore(reducer, undefined,  window.devToolsExtension ? window.devToolsExtension() : undefined);

const Entry = () => (<ToolboxApp><App store={store} /></ToolboxApp>);

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(<Entry />, document.getElementById('content'));
