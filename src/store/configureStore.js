import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./reducers/AuthReducer";
import ActiveReducer from "./reducers/ActiveReducer";
import ThemeReducer from "./reducers/ThemeReducer";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["active"],
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  active: ActiveReducer,
  theme: ThemeReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
