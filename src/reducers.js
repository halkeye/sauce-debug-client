import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import * as actions from './actions.js';

function logins (state = [], action) {
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
    label: 'TAB-1'
  },
  {
    guid: '597319b0-5c10-4f5e-b436-448a0e8446a5',
    label: 'TAB-2'
  },
  {
    guid: 'feb952cf-f284-46d2-a066-a529cdd4573d',
    label: 'TAB-3'
  }
];

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
