import { TemplateRef } from '@angular/core';

export interface TcTableColumn<T = unknown> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  template?: TemplateRef<{ $implicit: T; row: T; index: number }>;
}

export interface TcSortEvent {
  column: string;
  direction: 'asc' | 'desc' | null;
}

export interface TcPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
