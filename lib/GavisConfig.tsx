import React from "react";

import { GavisContext } from "./context";
import { GavisConfigProps } from "./types";

export const GavisConfig = ({
  children,
  logger,
}: GavisConfigProps): JSX.Element => {
  return (
    <GavisContext.Provider value={{ logger, event: {} }}>
      {children}
    </GavisContext.Provider>
  );
};
