import { ContextEvent, Data, RequestEvent } from "./types";

export const getShadowedEvent = (
  inheritedEvent: ContextEvent,
  category?: string,
  action?: string,
  label?: string,
  data?: Data
): RequestEvent => {
  const shadowedData =
    typeof data === "function"
      ? data(inheritedEvent.data ?? {})
      : data ?? inheritedEvent.data;

  const shadowedEvent = {
    category: category ?? inheritedEvent.category,
    action: action ?? inheritedEvent.action,
    label: label ?? inheritedEvent.label,
    data: shadowedData,
  };

  return shadowedEvent as RequestEvent;
};
