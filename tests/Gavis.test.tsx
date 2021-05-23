import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { Gavis } from "../lib/Gavis";
import { GavisConfig } from "../lib/GavisConfig";

describe("Gavis", () => {
  const event = {
    category: "c",
    action: "a",
  };
  it("should send mount event", async () => {
    const senderFunction = jest.fn();

    function Page() {
      return (
        <Gavis category={event.category} action={event.action}>
          <div>message</div>
        </Gavis>
      );
    }

    render(
      <GavisConfig sender={senderFunction}>
        <Page />
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    expect(senderFunction).toBeCalledWith(event);
  });

  it("should send shadowed event", async () => {
    const senderFunction = jest.fn();

    function Page() {
      return (
        <Gavis category={event.category} action={event.action}>
          <Gavis category="c2">
            <div>message</div>
          </Gavis>
        </Gavis>
      );
    }

    render(
      <GavisConfig sender={senderFunction}>
        <Page />
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    expect(senderFunction).toBeCalledWith({ category: "c2", action: "a" });
  });
});
