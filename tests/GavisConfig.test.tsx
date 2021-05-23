import { fireEvent, render, screen } from "@testing-library/react";
import React, { useContext } from "react";

import { GavisContext } from "../lib/context";
import { GavisConfig } from "../lib/GavisConfig";

describe("GavisConfig", () => {
  it("should be initialized with logger", async () => {
    const loggerFunction = jest.fn();

    function Page() {
      const { logger: _logger } = useContext(GavisContext);

      return (
        <button onClick={() => _logger({ category: "", action: "" })}>
          log
        </button>
      );
    }

    render(
      <GavisConfig logger={loggerFunction}>
        <Page />
      </GavisConfig>
    );

    // mount
    await screen.findByText("log");

    fireEvent.click(screen.getByText("log"));
    expect(loggerFunction).toBeCalledTimes(1);
  });
});
