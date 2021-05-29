import React, { useCallback, useContext, useMemo } from "react";
import { GavisContext } from "./context";
import { GavisProps } from "./types";
import useEffectOnce from "./useEffectOnce";
import { getShadowedEvent } from "./utils";

const Gavis = ({
  category,
  action,
  label,
  data,
  children,
  logOnMount,
  logOnUnmount,
}: GavisProps): JSX.Element => {
  const { logger, event } = useContext(GavisContext);

  const shadowedEvent = useMemo(() => {
    return getShadowedEvent(event, category, action, label, data);
  }, [category, action, label, data, event]);

  const log = useCallback(() => {
    if (shadowedEvent.category === undefined) {
      throw "category is not defined";
    }
    if (shadowedEvent.action === undefined) {
      throw "action is not defined";
    }
    logger(shadowedEvent);
  }, [shadowedEvent, logger]);

  useEffectOnce(() => {
    if (logOnMount) {
      log();
    }
    if (logOnUnmount) {
      return () => {
        log();
      };
    }
  });

  return (
    <GavisContext.Provider value={{ logger, event: shadowedEvent }}>
      {children}
    </GavisContext.Provider>
  );
};

export default Gavis;
