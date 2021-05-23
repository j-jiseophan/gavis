import { useCallback, useContext } from "react";
import { GavisContext } from "./context";
import { GavisEvent, Log } from "./types";

const useGavis = (): Log => {
  const { logger, event } = useContext(GavisContext);

  const log = useCallback(
    ({ category, action, label, data }: Partial<GavisEvent>) => {
      const shadowedEvent = {
        category: category ?? event.category,
        action: action ?? event.action,
        label: label ?? event.label,
        data: data ?? event.data,
      };

      if (shadowedEvent.category === undefined) {
        throw "category is not defined";
      }
      if (shadowedEvent.action === undefined) {
        throw "action is not defined";
      }
      logger(event as GavisEvent);
    },
    [event, logger]
  );

  return log;
};

export default useGavis;
