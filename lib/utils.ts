import { Data, GavisEvent } from "./types";

export const getShadowedEvent = (
  inheritedEvent: Partial<GavisEvent>,
  category?: string,
  action?: string,
  label?: string,
  data?: Data
): GavisEvent => {
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

  return shadowedEvent as GavisEvent;
};
