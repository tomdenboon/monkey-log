import * as ActionTypes from "../action-types";

const defaultUser = {
  id: null,
  name: null,
  email: null,
};

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  user: defaultUser,
};

const login = (state, payload) => {
  const { access_token: AccessToken, user } = payload;
  const stateObj = {
    ...state,
    isAuthenticated: true,
  };
  return stateObj;
};

const logout = (state) => {
  const stateObj = {
    ...state,
    isAuthenticated: false,
    accessToken: null,
    user: defaultUser,
  };
  return stateObj;
};

const AuthReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.AUTH_LOGIN:
      return login(state, payload);
    case ActionTypes.AUTH_LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

export default AuthReducer;
