import { EffectCallback, useEffect } from "react";

const useEffectOnce = (effect: EffectCallback): void => {
  useEffect(() => {
    const cleanup = effect();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useEffectOnce;
