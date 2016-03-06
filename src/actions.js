export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_REQUEST = 'ADD_REQUEST';

export function addLogin (username, password, server) {
  return {
    type: ADD_LOGIN,
    object: { username, password, server }
  };
}
