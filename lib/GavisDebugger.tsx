import React, { useEffect, useState } from "react";
import { logHistory } from "./LogHistory";
import "./GavisDebugger.css";

const GavisDebugger = (): JSX.Element => {
  const [, setTicks] = useState(0);
  const [showDebugger, setShowDebugger] = useState(true);

  useEffect(() => {
    const intervalTimer = setInterval(
      () => setTicks((ticks) => ticks + 1),
      250
    );
    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  if (!showDebugger) {
    return (
      <button
        className="gavis-debugger-hidden"
        onClick={() => setShowDebugger(true)}
      >
        Show Debugger
      </button>
    );
  }

  return (
    <div className="gavis-debugger">
      <div className="gavis-debugger-title">Recent Gavis requests</div>
      <div className="gavis-debugger-buttons">
        <button onClick={logHistory.clear}>Clear</button>
        <button onClick={() => setShowDebugger(false)}>Hide Debugger</button>
      </div>
      <div className="gavis-debugger-history">
        {logHistory.values.map(
          ({ category, action, label, data, id }, index) => {
            const itemClassName =
              index === logHistory.values.length - 1
                ? "gavis-debugger-item last"
                : "gavis-debugger-item";
            return (
              <div key={id} className={itemClassName}>
                <li>
                  <b>Category</b>: {category}
                </li>
                <li>
                  <b>Action</b>: {action}
                </li>
                <li>
                  <b>Label</b>: {label}
                </li>
                <li>
                  <b>Data</b>: {data}
                </li>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default GavisDebugger;
