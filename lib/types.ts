export interface GavisEvent {
  category: string;
  action: string;
  label?: string;
  data?: DataObject;
}

export interface LogEvent {
  category?: string;
  action?: string;
  label?: string;
  data?: Data;
}

export interface GavisProps {
  children: JSX.Element | JSX.Element[];
  category?: string;
  action?: string;
  label?: string;
  data?: Data;
  logOnMount?: boolean;
}

export type Logger = (event: GavisEvent) => void;
export type Log = (event: LogEvent) => void;

export type DataObject = Record<string, unknown>;
export type DataModifier = (data: DataObject) => DataObject;
export type Data = DataObject | DataModifier;
export interface GavisContextValue {
  logger: Logger;
  event: Partial<GavisEvent>;
}

export interface GavisConfigProps {
  children?: JSX.Element | JSX.Element[];
  logger: Logger;
}
