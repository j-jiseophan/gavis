import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { Gavis } from "../lib/Gavis";
import { GavisConfig } from "../lib/GavisConfig";
import useGavis from "../lib/useGavis";

describe("useGavis", () => {
  const event = {
    category: "c",
    action: "a",
  };

  it("should send event on click", async () => {
    const senderFunction = jest.fn();

    function Page() {
      const send = useGavis();

      return <button onClick={() => send({})}>message</button>;
    }

    render(
      <GavisConfig sender={senderFunction}>
        <Gavis category={event.category} action={event.action}>
          <Page />
        </Gavis>
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    fireEvent.click(screen.getByText("message"));

    expect(senderFunction).toBeCalledWith(event);
  });
});
