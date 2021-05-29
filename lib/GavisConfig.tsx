import React, { useCallback } from "react";

import { GavisContext } from "./context";
import { GavisConfigProps } from "./types";
import { logHistory } from "./LogHistory";
import GavisDebugger from "./GavisDebugger";

const GavisConfig = ({
  children,
  logger,
  debug,
}: GavisConfigProps): JSX.Element => {
  const loggerWithMiddlewares = useCallback(
    (e) => {
      logHistory.push(e);
      return logger(e);
    },
    [logger]
  );

  return (
    <GavisContext.Provider value={{ logger: loggerWithMiddlewares, event: {} }}>
      {children}
      {debug && <GavisDebugger />}
    </GavisContext.Provider>
  );
};

export default GavisConfig;
