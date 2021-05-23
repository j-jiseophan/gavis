import React from "react";

import { GavisContext } from "./context";
import { GavisConfigProps } from "./types";

export const GavisConfig = ({
  children,
  sender,
}: GavisConfigProps): JSX.Element => {
  return (
    <GavisContext.Provider value={{ sender }}>{children}</GavisContext.Provider>
  );
};
