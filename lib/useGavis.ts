import { useCallback, useContext } from "react";
import { GavisContext } from "./context";
import { GavisEvent, Send } from "./types";

const useGavis = (): Send => {
  const { sender, event } = useContext(GavisContext);

  const send = useCallback(
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
      sender(event as GavisEvent);
    },
    [event, sender]
  );

  return send;
};

export default useGavis;
