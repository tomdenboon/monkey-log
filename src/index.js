import React from "react";
import ReactDOM from "react-dom";
import CustomSwitch from "./routes";
import routes from "./routes/routes";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import persistStore from "redux-persist/lib/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import persistedReducer from "./store/configureStore";

let store = createStore(persistedReducer);
let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="text-gray-600 bg-gray-200 w-full h-full">
          <Router>
            <CustomSwitch routes={routes} />
          </Router>
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
