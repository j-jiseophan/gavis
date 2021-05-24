import React, { useContext, useEffect, useMemo } from "react";
import { GavisContext } from "./context";
import { GavisProps, GavisEvent } from "./types";

const Gavis = ({
  category,
  action,
  label,
  data,
  children,
  logOnMount,
}: GavisProps): JSX.Element => {
  const { logger, event } = useContext(GavisContext);

  const shadowedEvent = useMemo(() => {
    const shadowedData =
      typeof data === "function" ? data(event.data ?? {}) : data ?? event.data;

    return {
      category: category ?? event.category,
      action: action ?? event.action,
      label: label ?? event.label,
      data: shadowedData,
    };
  }, [category, action, label, data, event]);

  useEffect(() => {
    if (!logOnMount) {
      return;
    }
    if (shadowedEvent.category === undefined) {
      throw "category is not defined";
    }
    if (shadowedEvent.action === undefined) {
      throw "action is not defined";
    }
    logger(shadowedEvent as GavisEvent);
  }, [shadowedEvent, logger, logOnMount]);

  return (
    <GavisContext.Provider value={{ logger, event: shadowedEvent }}>
      {children}
    </GavisContext.Provider>
  );
};

export default Gavis;
