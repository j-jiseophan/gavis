import React from "react";
import { GavisContextValue } from "./types";

export const GavisContext = React.createContext<GavisContextValue>({
  logger: () => null,
  event: {},
});
