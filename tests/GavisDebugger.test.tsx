import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { Gavis, GavisConfig, useGavis } from "../lib";
import { logHistory } from "../lib/LogHistory";

describe("GavisDebugger", () => {
  const event = {
    category: "c",
    action: "mount",
  };

  beforeEach(() => {
    logHistory.clear();
  });

  it("should push an event to logHistory", async () => {
    const logger = jest.fn();

    function Page() {
      return (
        <Gavis category={event.category} action={event.action} logOnMount>
          <div>message</div>
        </Gavis>
      );
    }

    render(
      <GavisConfig logger={logger}>
        <Page />
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    expect(logHistory.getLast() === event);
    expect(logger).toBeCalledWith(event);
    expect(logger).toBeCalledTimes(1);
  });

  it("should be rendered", async () => {
    const logger = jest.fn();

    function Page() {
      return (
        <Gavis category={event.category} action={event.action} logOnMount>
          <div>message</div>
        </Gavis>
      );
    }

    render(
      <GavisConfig logger={logger} debug>
        <Page />
      </GavisConfig>
    );

    // mount
    await screen.findByText("Recent Gavis requests");
  });

  it("should show recent two logs", async () => {
    const logger = jest.fn();

    function Page() {
      const log = useGavis();

      return <div onClick={() => log({ action: "click" })}>message</div>;
    }

    render(
      <GavisConfig logger={logger} debug>
        <Gavis category={event.category} action={event.action} logOnMount>
          <Page />
        </Gavis>
      </GavisConfig>
    );

    // mount
    const message = await screen.findByText("message");

    fireEvent.click(message);

    expect(logHistory.values.length).toBe(2);
    await screen.findByText(`: ${event.action}`);
    await screen.findByText(`: click`);
  });
});
