import { combineReducers } from 'redux';

import { ADD_LOGIN } from './actions.js';

const initialLogins = [
  { username: 'halkeye', accessKey: 'abc123' }
];
function logins (state = initialLogins, action) {
  switch (action.type) {
    case ADD_LOGIN:
      return [state, action.object];
    default:
      return state;
  }
}

export default combineReducers({
  logins
});
