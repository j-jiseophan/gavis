import React from "react";
import "../../lib/GavisDebugger.css";

import { Gavis } from "../../lib";
import Button from "./Button";

function App(): JSX.Element {
  return (
    <Gavis category="playground" action="visit" logOnMount>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: 20 }}>hello world</div>
        <Button>button1</Button>
      </div>
    </Gavis>
  );
}

export default App;
