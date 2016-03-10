import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import * as actions from './actions.js';

const initialData = {};
const initialRequire = require.context('./initial/', false, /\.json$/);
for (let initial of initialRequire.keys()) {
  initialData[initial.replace('.json', '').replace('./', '')] = initialRequire(initial);
}

const initialLogins = initialData.logins || [];
function logins (state = initialLogins, action) {
  switch (action.type) {
    case actions.ADD_LOGIN:
      return [...state, action.object];
    case actions.LOAD_LOGINS:
      return action.object.map((item) => item);
    default:
      return state;
  }
}

const initialTabs = [
  {
    login: 'c3cd7e60-69ff-4740-a477-df0c418c6db0',
    guid: '0fcd1577-a43b-4c8b-bee2-ed2db7dc6996',
    label: 'Info',
    url: 'v1/info/status'
  },
  {
    login: 'c3cd7e60-69ff-4740-a477-df0c418c6db0',
    guid: 'feb952cf-f284-46d2-a066-a529cdd4573d',
    label: 'Appium',
    url: 'v1/info/platforms/appium'
  }
];

/* FIXME -- these should be a map and immutable */
function tabs (state = initialTabs, action) {
  return state;
  /*
  require('node-uuid').v4()
  switch (action.type) {
    case actions.SWITCH_TAB:
      return action.object;
    default:
      return state;
  }
  */
}

function tab (state = initialTabs[0].guid, action) {
  switch (action.type) {
    case actions.SWITCH_TAB:
      return action.object;
    default:
      return state;
  }
}

export default combineReducers({
  tabs,
  tab,
  logins,
  routing
});
