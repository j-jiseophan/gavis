export interface RequestEvent {
  category: string;
  action: string;
  label?: string;
  data?: DataObject;
}

export type ContextEvent = Partial<RequestEvent>;

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

export type Logger = (event: RequestEvent) => void;
export type Log = (event: LogEvent) => void;

export type DataObject = Record<string, unknown>;
export type DataModifier = (data: DataObject) => DataObject;
export type Data = DataObject | DataModifier;
export interface GavisContextValue {
  logger: Logger;
  event: ContextEvent;
}

export interface GavisConfigProps {
  children?: JSX.Element | JSX.Element[];
  logger: Logger;
}
