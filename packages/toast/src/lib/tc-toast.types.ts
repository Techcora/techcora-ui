export type TcToastType = 'success' | 'error' | 'warning' | 'info';

export interface TcToast {
  id: string;
  type: TcToastType;
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
}
