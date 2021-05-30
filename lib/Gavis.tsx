import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { dequal } from "dequal";

import { GavisContext } from "./context";
import { GavisProps, UpdateEvent } from "./types";
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
  logOnUpdate,
}: GavisProps): JSX.Element => {
  const { logger, event } = useContext(GavisContext);
  const recentUpdateEvent = useRef<UpdateEvent | null>(null);

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

  useEffect(() => {
    if (!logOnUpdate) {
      return;
    }
    const newUpdateEvent = { category, action, label, data, event };
    if (recentUpdateEvent.current === null) {
      recentUpdateEvent.current = newUpdateEvent;
      return;
    }
    if (dequal(newUpdateEvent, recentUpdateEvent.current)) {
      return;
    }
    recentUpdateEvent.current = newUpdateEvent;
    log();
  }, [
    logOnUpdate,
    log,
    recentUpdateEvent,
    category,
    action,
    label,
    data,
    event,
  ]);

  return (
    <GavisContext.Provider value={{ logger, event: shadowedEvent }}>
      {children}
    </GavisContext.Provider>
  );
};

export default Gavis;
