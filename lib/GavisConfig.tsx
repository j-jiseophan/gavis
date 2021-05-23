import React from "react";

import { GavisContext } from "./context";
import { GavisConfigProps } from "./types";

const GavisConfig = ({ children, logger }: GavisConfigProps): JSX.Element => {
  return (
    <GavisContext.Provider value={{ logger, event: {} }}>
      {children}
    </GavisContext.Provider>
  );
};

export default GavisConfig;
