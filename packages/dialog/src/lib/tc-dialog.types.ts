export type TcDialogType = 'error' | 'warning' | 'success' | 'info' | 'confirm';

export interface TcDialogAction {
  label: string;
  onClick: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

export interface TcDialogOptions {
  title: string;
  message: string;
  type?: TcDialogType;
  actions?: TcDialogAction[];
  dismissible?: boolean;
}

export interface TcDialog {
  id: string;
  title: string;
  message: string;
  type: TcDialogType;
  actions?: TcDialogAction[];
  dismissible: boolean;
}
