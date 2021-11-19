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
  console.log(payload);
  const stateObj = {
    ...state,
    isAuthenticated: true,
    accesToken: payload.access_token,
    user: payload.user,
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
