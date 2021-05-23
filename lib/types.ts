export interface GavisEvent {
  category: string;
  action: string;
  label?: string;
  data?: any;
}

export interface GavisProps {
  children: JSX.Element | JSX.Element[];
  category?: string;
  action?: string;
  label?: string;
  data?: any;
  logOnMount?: boolean;
}

export type Logger = (event: GavisEvent) => void;
export type Log = (event: Partial<GavisEvent>) => void;

export interface GavisContextValue {
  logger: Logger;
  event: Partial<GavisEvent>;
}

export interface GavisConfigProps {
  children?: JSX.Element | JSX.Element[];
  logger: Logger;
}
