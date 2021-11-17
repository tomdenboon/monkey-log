import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./reducers/AuthReducer";

const rootPersistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
