import * as ActionTypes from "../action-types";

export function authLogin(payload) {
  return {
    type: ActionTypes.AUTH_LOGIN,
    payload,
  };
}

export function authLogout() {
  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
}

export function setActiveDate(payload) {
  return {
    type: ActionTypes.SET_ACTIVE,
    payload,
  };
}
