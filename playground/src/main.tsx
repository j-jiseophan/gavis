import React from "react";
import ReactDOM from "react-dom";
import { GavisConfig } from "../../lib";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <GavisConfig logger={(e) => console.log(e)} debug>
      <App />
    </GavisConfig>
  </React.StrictMode>,
  document.getElementById("root")
);
