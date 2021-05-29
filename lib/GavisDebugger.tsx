import React, { useEffect, useState } from "react";
import { logHistory } from "./LogHistory";
import "./GavisDebugger.css";

const GavisDebugger = (): JSX.Element => {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const intervalTimer = setInterval(
      () => setTicks((ticks) => ticks + 1),
      250
    );
    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  useEffect(() => {
    const historyElem = document.querySelector(".gavis-debugger-history");
    document
      .querySelector(".gavis-debugger-history")
      ?.scrollTo(0, historyElem?.scrollHeight ?? 0);
  }, [ticks]);

  return (
    <div className="gavis-debugger">
      <div className="gavis-debugger-title">Recent logger requests</div>
      <div className="gavis-debugger-buttons">
        <button onClick={logHistory.clear}>Clear</button>
      </div>
      <div className="gavis-debugger-history">
        {logHistory.values.map(({ category, action, label, data, id }) => {
          return (
            <div key={id} className="gavis-debugger-item">
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
        })}
      </div>
    </div>
  );
};

export default GavisDebugger;
