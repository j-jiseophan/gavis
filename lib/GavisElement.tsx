import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { GavisContext } from "./context";
import Gavis from "./Gavis";
import { GavisElementProps } from "./types";
import { getShadowedEvent } from "./utils";

const GavisElement = ({
  type,
  children,
  className,
  logOnMount,
  logOnFirstObserve,
  logOnClick,
  category,
  action,
  label,
  data,
}: GavisElementProps): JSX.Element => {
  const { logger, event } = useContext(GavisContext);
  const [ref, inView] = useInView({ triggerOnce: true });

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

  useEffect(() => {
    if (!inView || !logOnFirstObserve) {
      return;
    }
    log();
  }, [inView, log, logOnFirstObserve]);

  return React.createElement(
    type,
    {
      ref,
      ...(className && { className }),
      ...(logOnClick && { onClick: log }),
    },
    <Gavis
      category={category}
      action={action}
      label={label}
      data={data}
      logOnMount={logOnMount}
    >
      {children}
    </Gavis>
  );
};

export default GavisElement;
