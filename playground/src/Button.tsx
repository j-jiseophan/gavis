import React, { ReactNode } from "react";

import { useGavis } from "../../lib";

const Button = ({ children }: { children: ReactNode }) => {
  const log = useGavis();

  return (
    <button
      type="button"
      onClick={() => log({ action: "click", label: new Date().toISOString() })}
    >
      {children}
    </button>
  );
};

export default Button;
