import { ReactHTML, ReactNode } from "react";

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

export interface HistoryEvent extends RequestEvent {
  id: string;
}

export interface GavisProps extends LogEvent {
  children: ReactNode;
  logOnMount?: boolean;
  logOnUnmount?: boolean;
  logOnUpdate?: boolean;
}

export interface UpdateEvent extends LogEvent {
  event: ContextEvent;
}

export interface GavisElementProps extends GavisProps {
  type: keyof ReactHTML;
  className?: string;
  logOnFirstObserve?: boolean;
  logOnClick?: boolean;
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
  children?: ReactNode;
  logger: Logger;
  debug?: boolean;
}
