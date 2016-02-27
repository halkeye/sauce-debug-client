import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';
import ToolboxApp from 'react-toolbox/lib/app';

const store = {};

const Entry = () => (<ToolboxApp><App store={store} /></ToolboxApp>);

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(<Entry />, document.getElementById('content'));
