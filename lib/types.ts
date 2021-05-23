interface GavisEvent {
  category: string;
  action: string;
  label?: string;
  data?: any;
}

interface GavisProps {
  category?: string;
  action?: string;
  label?: string;
  data?: any;
}
type Sender = (event: GavisEvent) => void;

export interface GavisContextValue {
  sender: Sender;
}

export interface GavisConfigProps {
  children?: JSX.Element | JSX.Element[];
  sender: Sender;
}
