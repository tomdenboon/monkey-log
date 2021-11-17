import React from "react";
import ReactDOM from "react-dom";
import CustomSwitch from "./routes";
import routes from "./routes/routes";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <div className="text-gray-500 bg-gray-100">
      <Router>
        <CustomSwitch routes={routes} />
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
