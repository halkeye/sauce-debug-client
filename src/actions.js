import axios from 'axios';
import UUID from 'node-uuid';

export const ADD_LOGIN = 'ADD_LOGIN';
export const DELETE_LOGIN = 'DELETE_LOGIN';
export const UPDATE_LOGIN = 'UPDATE_LOGIN';
export const LOAD_LOGINS = 'LOAD_LOGINS';

export const SWITCH_TAB = 'SWITCH_TAB';
export const SWITCH_TAB_LOGIN = 'SWITCH_TAB_LOGIN';

export const REQ_DATA = 'REQ_DATA';
export const RECV_DATA = 'RECV_DATA';
export const RECV_ERROR = 'RECV_ERROR';

export function loadLogins (logins) {
  return { type: LOAD_LOGINS, object: logins };
}

export function addLogin (username, password, server) {
  const guid = UUID.v4();
  return { type: ADD_LOGIN, object: { username, password, server, guid } };
}

export function deleteLogin (guid) {
  return { type: DELETE_LOGIN, object: guid };
}

export function switchTab (tabGuid) {
  return { type: SWITCH_TAB, object: tabGuid };
}

export function switchTabLogin (tabGuid, loginGuid) {
  return { type: SWITCH_TAB_LOGIN, object: { tab: tabGuid, login: loginGuid } };
}

function requestData (tabGuid, url) {
  return { type: REQ_DATA, object: { tab: tabGuid, url } };
}

function receiveData (tabGuid, url, json) {
  return { type: RECV_DATA, object: { tab: tabGuid, json, url } };
}

function receiveError (tabGuid, url, json) {
  return { type: RECV_ERROR, object: { tab: tabGuid, json, url } };
}

export function fetchData (tabGuid, url) {
  return function (dispatch) {
    dispatch(requestData(tabGuid, url));
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    })
    .then(function (response) {
      dispatch(receiveData(tabGuid, url, response.data));
    })
    .catch(function (response) {
      dispatch(receiveError(tabGuid, url, response.data));
    });
  };
}
