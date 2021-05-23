import React, { useContext, useEffect, useMemo } from "react";
import { GavisContext } from "./context";
import { GavisProps, GavisEvent } from "./types";

export const Gavis = ({
  category,
  action,
  label,
  data,
  children,
  sendMount,
}: GavisProps): JSX.Element => {
  const { sender, event } = useContext(GavisContext);

  const shadowedEvent = useMemo(
    () => ({
      category: category ?? event.category,
      action: action ?? event.action,
      label: label ?? event.label,
      data: data ?? event.data,
    }),
    [category, action, label, data, event]
  );

  useEffect(() => {
    if (!sendMount) {
      return;
    }
    if (shadowedEvent.category === undefined) {
      throw "category is not defined";
    }
    if (shadowedEvent.action === undefined) {
      throw "action is not defined";
    }
    sender(shadowedEvent as GavisEvent);
  }, [shadowedEvent, sender, sendMount]);

  return (
    <GavisContext.Provider value={{ sender, event: shadowedEvent }}>
      {children}
    </GavisContext.Provider>
  );
};
