import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import * as actions from './actions.js';

const initialLogins = [
];

function logins (state = initialLogins, action) {
  switch (action.type) {
    case actions.ADD_LOGIN:
      return [...state, action.object];
    default:
      return state;
  }
}

function requests (state = [], action) {
  switch (action.type) {
    case actions.ADD_REQUEST:
      return [...state, action.object];
    default:
      return state;
  }
}

const initialTabs = [
  {
    guid: '0fcd1577-a43b-4c8b-bee2-ed2db7dc6996',
    label: 'Info',
    url: 'https://saucelabs.com/rest/v1/info/status'
  },
  {
    guid: 'feb952cf-f284-46d2-a066-a529cdd4573d',
    label: 'Appium',
    url: 'https://saucelabs.com/rest/v1/info/platforms/appium'
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
  requests,
  routing
});
