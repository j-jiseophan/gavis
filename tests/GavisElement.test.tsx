import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

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

  it("should log firstObserve event", async () => {
    const logger = jest.fn();

    function Page() {
      return (
        <GavisElement
          type="div"
          category={event.category}
          action={event.action}
          logOnFirstObserve
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

    mockAllIsIntersecting(true);
    mockAllIsIntersecting(false);
    mockAllIsIntersecting(true);

    expect(logger).toBeCalledWith(event);
    expect(logger).toBeCalledTimes(1);
  });

  it("should log click event", async () => {
    const logger = jest.fn();

    function Page() {
      return (
        <GavisElement
          type="div"
          category={event.category}
          action={event.action}
          logOnClick
        >
          <button>message</button>
        </GavisElement>
      );
    }

    render(
      <GavisConfig logger={logger}>
        <Page />
      </GavisConfig>
    );

    // mount
    const button = await screen.findByText("message");

    fireEvent.click(button);

    expect(logger).toBeCalledWith(event);
    expect(logger).toBeCalledTimes(1);
  });

  it("should not log on unpropagated click event", async () => {
    const logger = jest.fn();

    function Page() {
      return (
        <GavisElement
          type="div"
          category={event.category}
          action={event.action}
          logOnClick
        >
          <button onClick={(e) => e.stopPropagation()}>message</button>
        </GavisElement>
      );
    }

    render(
      <GavisConfig logger={logger}>
        <Page />
      </GavisConfig>
    );

    // mount
    const button = await screen.findByText("message");

    fireEvent.click(button);

    expect(logger).toBeCalledTimes(0);
  });
});
