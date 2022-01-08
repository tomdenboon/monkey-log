// Import all of our actions
import { SET_THEME } from "../action-types";
import { getThemes } from "../../themes/utils";

const initialTheme = getThemes()[0];

const ThemeReducer = (state = initialTheme, action) => {
  switch (action.type) {
    case SET_THEME:
      return action.payload;
    default:
      return state;
  }
};

export default ThemeReducer;
