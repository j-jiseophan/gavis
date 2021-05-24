import { useCallback, useContext } from "react";
import { GavisContext } from "./context";
import { Log, LogEvent } from "./types";
import { getShadowedEvent } from "./utils";

const useGavis = (): Log => {
  const { logger, event } = useContext(GavisContext);

  const log = useCallback(
    ({ category, action, label, data }: Partial<LogEvent>) => {
      const shadowedEvent = getShadowedEvent(
        event,
        category,
        action,
        label,
        data
      );

      if (shadowedEvent.category === undefined) {
        throw "category is not defined";
      }
      if (shadowedEvent.action === undefined) {
        throw "action is not defined";
      }
      logger(shadowedEvent);
    },
    [event, logger]
  );

  return log;
};

export default useGavis;
