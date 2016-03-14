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
    case actions.DELETE_LOGIN:
      return state.filter((login) => login.guid !== action.object);
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
    url: 'rest/v1/info/status'
  },
  {
    login: 'c3cd7e60-69ff-4740-a477-df0c418c6db0',
    guid: 'feb952cf-f284-46d2-a066-a529cdd4573d',
    label: 'Appium',
    url: 'rest/v1/info/platforms/appium'
  }
];

/* FIXME -- these should be a map and immutable */
function tabs (state = initialTabs, action) {
  switch (action.type) {
    case actions.RECV_DATA:
    case actions.RECV_ERROR:
    case actions.REQ_DATA:
      return state.map((tab) => {
        if (tab.guid === action.object.tab) {
          // if RECV_ERROR then do stuff
          return {
            ...tab,
            response: {
              url: action.object.url,
              response: action.object.json || false
            }
          };
        }
        return tab;
      });
    case actions.UPDATE_TAB:
      return state.map((tab) => {
        if (tab.guid === action.object.tab) {
          return { ...tab, ...action.object.updates };
        }
        return tab;
      });
    case actions.SWITCH_TAB:
      return state.map((tab) => {
        if (tab.guid === action.object) {
          return { ...tab, selected: true };
        }
        if (tab.selected === true) {
          return { ...tab, selected: false };
        }
        return tab;
      });
    case actions.SWITCH_TAB_LOGIN:
      return state.map((tab) => {
        if (tab.guid === action.object.tab) {
          return { ...tab, login: action.object.login };
        }
        return tab;
      });
    default:
      return state;
  }
  /*
  require('node-uuid').v4()
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
