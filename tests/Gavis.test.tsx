import { fireEvent, render, screen } from "@testing-library/react";
import React, { useState } from "react";

import { Gavis, GavisConfig } from "../lib";

describe("Gavis", () => {
  const event = {
    category: "c",
    action: "a",
  };
  it("should log mount event", async () => {
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

    expect(logger).toBeCalledWith(event);
    expect(logger).toBeCalledTimes(1);
  });

  it("should log unmount event", async () => {
    const logger = jest.fn();

    function Page() {
      const [show, setShow] = useState(true);

      if (!show) {
        return null;
      }

      return (
        <Gavis category={event.category} action={event.action} logOnUnmount>
          <div onClick={() => setShow(false)}>message</div>
        </Gavis>
      );
    }

    render(
      <GavisConfig logger={logger}>
        <Page />
      </GavisConfig>
    );

    // mount
    const message = await screen.findByText("message");

    fireEvent.click(message);

    expect(screen.queryByText("message")).toBeNull();
    expect(logger).toBeCalledWith(event);
    expect(logger).toBeCalledTimes(1);
  });

  it("should log shadowed event", async () => {
    const logger = jest.fn();

    function Page() {
      return (
        <Gavis category={event.category} action={event.action}>
          <Gavis category="c2" logOnMount>
            <div>message</div>
          </Gavis>
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

    expect(logger).toBeCalledWith({ category: "c2", action: "a" });
    expect(logger).toBeCalledTimes(1);
  });

  it("should replace data field", async () => {
    const logger = jest.fn();

    function Page() {
      return (
        <Gavis
          category={event.category}
          action={event.action}
          data={{ name: "han" }}
        >
          <Gavis category="c2" logOnMount data={{ lang: "ko" }}>
            <div>message</div>
          </Gavis>
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

    expect(logger).toBeCalledWith({
      category: "c2",
      action: "a",
      data: { lang: "ko" },
    });
    expect(logger).toBeCalledTimes(1);
  });

  it("should modify data field", async () => {
    const logger = jest.fn();

    function Page() {
      return (
        <Gavis
          category={event.category}
          action={event.action}
          data={{ name: "han" }}
        >
          <Gavis
            category="c2"
            logOnMount
            data={(data) => ({ ...data, lang: "ko" })}
          >
            <div>message</div>
          </Gavis>
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

    expect(logger).toBeCalledWith({
      category: "c2",
      action: "a",
      data: { name: "han", lang: "ko" },
    });
    expect(logger).toBeCalledTimes(1);
  });
});
