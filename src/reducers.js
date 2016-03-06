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

export default combineReducers({
  logins,
  requests,
  routing
});
