import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { Gavis, GavisConfig, useGavis } from "../lib";

describe("useGavis", () => {
  const event = {
    category: "c",
    action: "a",
  };

  it("should log event on click", async () => {
    const logger = jest.fn();

    function Page() {
      const log = useGavis();

      return <button onClick={() => log({})}>message</button>;
    }

    render(
      <GavisConfig logger={logger}>
        <Gavis category={event.category} action={event.action}>
          <Page />
        </Gavis>
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    fireEvent.click(screen.getByText("message"));

    expect(logger).toBeCalledWith(event);
    expect(logger).toBeCalledTimes(1);
  });

  it("should log shadowed event", async () => {
    const logger = jest.fn();

    function Page() {
      const log = useGavis();

      return <button onClick={() => log({ category: "c2" })}>message</button>;
    }

    render(
      <GavisConfig logger={logger}>
        <Gavis category={event.category} action={event.action}>
          <Page />
        </Gavis>
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    fireEvent.click(screen.getByText("message"));

    expect(logger).toBeCalledWith({ category: "c2", action: "a" });
    expect(logger).toBeCalledTimes(1);
  });

  it("should replace data field", async () => {
    const logger = jest.fn();

    function Page() {
      const log = useGavis();

      return (
        <button onClick={() => log({ data: { lang: "ko" } })}>message</button>
      );
    }

    render(
      <GavisConfig logger={logger}>
        <Gavis
          category={event.category}
          action={event.action}
          data={{ name: "han" }}
        >
          <Page />
        </Gavis>
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    fireEvent.click(screen.getByText("message"));

    expect(logger).toBeCalledWith({
      category: "c",
      action: "a",
      data: { lang: "ko" },
    });
    expect(logger).toBeCalledTimes(1);
  });

  it("should modify data field", async () => {
    const logger = jest.fn();

    function Page() {
      const log = useGavis();

      return (
        <button
          onClick={() => log({ data: (data) => ({ ...data, lang: "ko" }) })}
        >
          message
        </button>
      );
    }

    render(
      <GavisConfig logger={logger}>
        <Gavis
          category={event.category}
          action={event.action}
          data={{ name: "han" }}
        >
          <Page />
        </Gavis>
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    fireEvent.click(screen.getByText("message"));

    expect(logger).toBeCalledWith({
      category: "c",
      action: "a",
      data: { name: "han", lang: "ko" },
    });
    expect(logger).toBeCalledTimes(1);
  });
});
