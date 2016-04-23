import axios from 'axios';
import UUID from 'node-uuid';

export const ADD_LOGIN = 'ADD_LOGIN';
export const DELETE_LOGIN = 'DELETE_LOGIN';
export const UPDATE_LOGIN = 'UPDATE_LOGIN';
export const LOAD_LOGINS = 'LOAD_LOGINS';

export const ADD_TAB = 'ADD_TAB';
export const UPDATE_TAB = 'UPDATE_TAB';
export const DELETE_TAB = 'DELETE_TAB';
export const SWITCH_TAB = 'SWITCH_TAB';
export const SWITCH_TAB_LOGIN = 'SWITCH_TAB_LOGIN';

export const REQ_DATA = 'REQ_DATA';
export const RECV_DATA = 'RECV_DATA';
export const RECV_ERROR = 'RECV_ERROR';

export function loadLogins (logins) {
  return { type: LOAD_LOGINS, object: logins };
}

export function addLogin (username, accesskey, server) {
  const guid = UUID.v4();
  return { type: ADD_LOGIN, object: { username, accesskey, server, guid } };
}

export function deleteLogin (guid) {
  return { type: DELETE_LOGIN, object: guid };
}

export function updateLogin (loginGuid, updates) {
  return { type: UPDATE_LOGIN, object: { login: loginGuid, updates: updates } };
}

export function addTab () {
  return { type: ADD_TAB };
}

export function switchTab (tabGuid) {
  return { type: SWITCH_TAB, object: tabGuid };
}

export function updateTab (tabGuid, updates) {
  return { type: UPDATE_TAB, object: { tab: tabGuid, updates: updates } };
}

export function deleteTab (tabGuid) {
  return { type: DELETE_TAB, object: tabGuid };
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

export function fetchData (login, tab, url) {
  return function (dispatch) {
    dispatch(requestData(tab.guid, url));
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      headers: {
        'User-Agent': 'SauceDebugClient/0.0.0'
      },
      auth: {
        username: login.username,
        password: login.accesskey
      },
      responseType: 'json'
    })
    .then(function (response) {
      dispatch(receiveData(tab.guid, url, response.data));
    })
    .catch(function (response) {
      dispatch(receiveError(tab.guid, url, response.data));
    });
  };
}
