import { fireEvent, render, screen } from "@testing-library/react";
import React, { useContext } from "react";

import { GavisContext } from "../lib/context";
import { GavisConfig } from "../lib/GavisConfig";

describe("GavisConfig", () => {
  it("should be initialized with sender", async () => {
    const senderFunction = jest.fn();

    function Page() {
      const { sender } = useContext(GavisContext);

      return (
        <button onClick={() => sender({ category: "", action: "" })}>
          send
        </button>
      );
    }

    render(
      <GavisConfig sender={senderFunction}>
        <Page />
      </GavisConfig>
    );

    // mount
    await screen.findByText("send");

    fireEvent.click(screen.getByText("send"));
    expect(senderFunction).toBeCalledTimes(1);
  });
});
