import React, { useEffect, useState } from "react";
import { logHistory } from "./LogHistory";

const GavisDebugger = (): JSX.Element => {
  const [, setTicks] = useState(0);

  useEffect(() => {
    const intervalTimer = setInterval(
      () => setTicks((ticks) => ticks + 1),
      250
    );
    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  return (
    <div className="gavis-debugger">
      <div className="gavis-debugger-title">Recent logger requests</div>
      {logHistory.values.map(({ category, action, label, data, id }) => {
        const value = JSON.stringify({ category, action, label, data });
        return <div key={id}>{value}</div>;
      })}
    </div>
  );
};

export default GavisDebugger;
