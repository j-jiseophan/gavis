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
  sendMount?: boolean;
}

export type Sender = (event: GavisEvent) => void;
export type Send = (event: Partial<GavisEvent>) => void;

export interface GavisContextValue {
  sender: Sender;
  event: Partial<GavisEvent>;
}

export interface GavisConfigProps {
  children?: JSX.Element | JSX.Element[];
  sender: Sender;
}
