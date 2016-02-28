import {dispatch} from 'redux';
const ADD_LOGIN = 'ADD_LOGIN';

function addLogin (login) {
  return {
    type: ADD_LOGIN,
    object: login
  };
}

export const boundAddLogin = (login) => dispatch(addLogin(login));
