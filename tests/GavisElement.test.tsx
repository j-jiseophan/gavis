import { render, screen } from "@testing-library/react";
import React from "react";

import { GavisConfig, GavisElement } from "../lib";

describe("GavisElement", () => {
  const event = {
    category: "c",
    action: "a",
  };

  it("should create elemenet with classname prop", async () => {
    const logger = jest.fn();

    function Page() {
      return (
        <GavisElement
          type="div"
          className="ge"
          category={event.category}
          action={event.action}
        >
          message
        </GavisElement>
      );
    }

    render(
      <GavisConfig logger={logger}>
        <Page />
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    expect(screen.getByText("message").className).toBe("ge");
  });
  it("should log mount event", async () => {
    const logger = jest.fn();

    function Page() {
      return (
        <GavisElement
          type="div"
          category={event.category}
          action={event.action}
          logOnMount
        >
          message
        </GavisElement>
      );
    }

    render(
      <GavisConfig logger={logger}>
        <Page />
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    expect(logger).toBeCalledWith(event);
    expect(logger).toBeCalledTimes(1);
  });
});
