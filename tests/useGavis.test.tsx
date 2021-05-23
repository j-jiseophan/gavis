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

  it("should log event on click", async () => {
    const loggerFunction = jest.fn();

    function Page() {
      const log = useGavis();

      return <button onClick={() => log({})}>message</button>;
    }

    render(
      <GavisConfig logger={loggerFunction}>
        <Gavis category={event.category} action={event.action}>
          <Page />
        </Gavis>
      </GavisConfig>
    );

    // mount
    await screen.findByText("message");

    fireEvent.click(screen.getByText("message"));

    expect(loggerFunction).toBeCalledTimes(1);
    expect(loggerFunction).toBeCalledWith(event);
  });
});
