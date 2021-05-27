import React from "react";
import Gavis from "./Gavis";
import { GavisElementProps } from "./types";

const GavisElement = ({
  type,
  children,
  className,
  logOnMount,
  category,
  action,
  label,
  data,
}: GavisElementProps): JSX.Element => {
  return React.createElement(
    type,
    className ? { className } : null,
    <Gavis
      category={category}
      action={action}
      label={label}
      data={data}
      logOnMount={logOnMount}
    >
      {children}
    </Gavis>
  );
};

export default GavisElement;
