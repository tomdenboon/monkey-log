import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./reducers/AuthReducer";
import ActiveReducer from "./reducers/ActiveReducer";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["active"],
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  active: ActiveReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
