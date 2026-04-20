export type TcInputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export interface TcSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}
