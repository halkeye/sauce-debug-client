import axios from 'axios';
import UUID from 'node-uuid';

export const ADD_LOGIN = 'ADD_LOGIN';
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

export function switchTab (tabGuid) {
  return { type: SWITCH_TAB, object: tabGuid };
}

export function switchTabLogin (tabGuid, loginGuid) {
  return { type: SWITCH_TAB_LOGIN, object: { tab: tabGuid, login: loginGuid } };
}

function requestData (tabGuid) {
  return { type: REQ_DATA, object: tabGuid };
}

function receiveData (tabGuid, json) {
  return { type: RECV_DATA, object: { tab: tabGuid, json } };
}

function receiveError (tabGuid, json) {
  return { type: RECV_ERROR, data: { tab: tabGuid, json } };
}

export function fetchData (tabGuid, url) {
  return function (dispatch) {
    dispatch(requestData(tabGuid));
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    })
    .then(function (response) {
      dispatch(receiveData(tabGuid, response.data));
    })
    .catch(function (response) {
      dispatch(receiveError(tabGuid, response.data));
    });
  };
}
