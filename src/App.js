import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { applyTheme } from "./themes/utils";
import CustomSwitch from "./routes";
import routes from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div className="text-text-base bg-primary w-full h-full">
      <Router>
        <CustomSwitch routes={routes} />
      </Router>
    </div>
  );
}

export default App;
