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

export const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
