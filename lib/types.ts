import { ReactHTML, ReactText } from "react";

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

export interface GavisProps extends LogEvent {
  children: JSX.Element | JSX.Element[] | ReactText;
  logOnMount?: boolean;
}

export interface GavisElementProps extends GavisProps {
  type: keyof ReactHTML;
  className?: string;
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
