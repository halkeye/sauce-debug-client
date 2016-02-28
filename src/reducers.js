import { combineReducers } from 'redux';

import * as actions from './actions.js';

const initialLogins = [];
function logins (state = initialLogins, action) {
  switch (action.type) {
    case actions.ADD_LOGIN:
      return [...state, action.object];
    default:
      return state;
  }
}

export default combineReducers({
  logins
});
