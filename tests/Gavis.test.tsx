import { fireEvent, render, screen } from "@testing-library/react";
import React, { useState } from "react";

import { Gavis, GavisConfig } from "../lib";

describe("Gavis", () => {
  const event = {
    category: "c",
    action: "a",
  };
  it("should log on mount event", async () => {
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

  it("should log on unmount event", async () => {
    const logger = jest.fn();

    function Page() {
      const [show, setShow] = useState(true);

      if (!show) {
        return null;
      }

      return (
        <Gavis category={event.category} action={event.action} logOnUnmount>
          <div onClick={() => setShow(false)}>unmount</div>
        </Gavis>
      );
    }

    render(
      <GavisConfig logger={logger}>
        <Page />
      </GavisConfig>
    );

    // mount
    const unmount = await screen.findByText("unmount");

    fireEvent.click(unmount);

    expect(screen.queryByText("unmount")).toBeNull();
    expect(logger).toBeCalledWith(event);
    expect(logger).toBeCalledTimes(1);
  });

  it("should log on category update", async () => {
    const logger = jest.fn();

    function Page() {
      const [category, setCategory] = useState("c");

      return (
        <Gavis category={category} action={event.action} logOnUpdate>
          <div onClick={() => setCategory(`${category}${category}`)}>
            message
          </div>
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
    expect(logger).toBeCalledWith({ category: "cc", action: event.action });
    expect(logger).toBeCalledTimes(1);
  });

  it("should log on mount, update, unmount", async () => {
    const logger = jest.fn();

    function Page() {
      const [show, setShow] = useState(true);
      const [category, setCategory] = useState("c");

      if (!show) {
        return null;
      }

      return (
        <Gavis
          category={category}
          action={event.action}
          logOnMount
          logOnUpdate
          logOnUnmount
        >
          <div onClick={() => setCategory(`${category}${category}`)}>
            message
          </div>
          <div onClick={() => setShow(false)}>unmount</div>
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

    expect(logger).toBeCalledWith({ category: "c", action: event.action });
    fireEvent.click(message);
    expect(logger).toBeCalledWith({ category: "cc", action: event.action });

    const unmount = screen.getByText("unmount");
    fireEvent.click(unmount);
    expect(screen.queryByText("unmount")).toBeNull();
    expect(logger).toBeCalledWith({ category: "cc", action: event.action });
    expect(logger).toBeCalledTimes(3);
  });

  it("should deduplicate multiple updates but same event", async () => {
    const logger = jest.fn();

    function Page() {
      const [category, setCategory] = useState("c");
      const [, setTick] = useState(0);

      return (
        <Gavis category={category} action={event.action} logOnUpdate>
          <div onClick={() => setCategory(`${category}${category}`)}>
            message
          </div>
          <div onClick={() => setTick((tick) => tick + 1)}>update tick</div>
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
    expect(logger).toBeCalledWith({ category: "cc", action: event.action });
    expect(logger).toBeCalledTimes(1);

    const tickUpdater = screen.getByText("update tick");
    fireEvent.click(tickUpdater);
    fireEvent.click(tickUpdater);
    expect(logger).toBeCalledTimes(1);
  });

  it("should not deduplicate if prop changes", async () => {
    const logger = jest.fn();

    function Page() {
      const [category, setCategory] = useState("c");
      const [, setTick] = useState(0);

      return (
        <Gavis category={category} action={event.action} logOnUpdate>
          <div onClick={() => setCategory(`${category}${category}`)}>
            message
          </div>
          <div onClick={() => setTick((tick) => tick + 1)}>update tick</div>
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
    fireEvent.click(message);
    expect(logger).toBeCalledTimes(2);
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
