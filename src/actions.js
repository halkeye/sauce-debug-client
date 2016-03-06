export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_REQUEST = 'ADD_REQUEST';
export const SWITCH_TAB = 'SWITCH_TAB';

export function addLogin (username, password, server) {
  return {
    type: ADD_LOGIN,
    object: { username, password, server }
  };
}

export function switchTab (tabGuid) {
  return {
    type: SWITCH_TAB,
    object: tabGuid
  };
}
