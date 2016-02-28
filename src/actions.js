import {dispatch} from 'redux';
export const ADD_LOGIN = 'ADD_LOGIN';

export function addLogin (username, password, server) {
  console.log('addLogin');
  return {
    type: ADD_LOGIN,
    object: { username, password, server }
  };
}
