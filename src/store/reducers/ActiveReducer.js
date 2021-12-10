import { SET_ACTIVE } from "../action-types";

const defaultActive = null;

const ActiveReducer = (state = defaultActive, { type, payload = null }) => {
  switch (type) {
    case SET_ACTIVE:
      return payload;
    default:
      return state;
  }
};

export default ActiveReducer;
