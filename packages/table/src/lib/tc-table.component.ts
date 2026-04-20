import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcTableColumn, TcSortEvent, TcPaginationMeta } from './tc-table.types';

@Component({
  selector: 'tc-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tc-table-wrapper">
      <div class="tc-table-scroll">
        <table class="tc-table">
          <thead>
            <tr>
              @for (column of columns; track column.key) {
                <th
                  [style.width]="column.width"
                  [class.tc-text-left]="column.align !== 'center' && column.align !== 'right'"
                  [class.tc-text-center]="column.align === 'center'"
                  [class.tc-text-right]="column.align === 'right'"
                  [class.tc-table-clickable]="column.sortable"
                  (click)="column.sortable && onSort(column.key)"
                >
                  <div class="tc-table-header-cell" [class.tc-justify-center]="column.align === 'center'" [class.tc-justify-end]="column.align === 'right'">
                    {{ column.label }}
                    @if (column.sortable) {
                      <div class="tc-sort-indicators">
                        <span [class.tc-sort-active]="sortColumn === column.key && sortDirection === 'asc'" [class.tc-sort-inactive]="sortColumn !== column.key || sortDirection !== 'asc'">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                        </span>
                        <span [class.tc-sort-active]="sortColumn === column.key && sortDirection === 'desc'" [class.tc-sort-inactive]="sortColumn !== column.key || sortDirection !== 'desc'">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </span>
                      </div>
                    }
                  </div>
                </th>
              }
            </tr>
          </thead>

          <tbody>
            @if (loading) {
              @for (i of skeletonRows; track i) {
                <tr>
                  @for (column of columns; track column.key) {
                    <td>
                      <div class="tc-table-skeleton"></div>
                    </td>
                  }
                </tr>
              }
            } @else if (data.length === 0) {
              <tr>
                <td [attr.colspan]="columns.length">
                  <div class="tc-table-empty">
                    <ng-content select="[tc-table-empty]"></ng-content>
                    <p class="tc-table-empty-default" *ngIf="!hasCustomEmpty">
                      <span class="tc-table-empty-title">{{ emptyTitle }}</span>
                      <span class="tc-table-empty-description">{{ emptyDescription }}</span>
                    </p>
                  </div>
                </td>
              </tr>
            } @else {
              @for (row of data; track trackBy ? trackBy(i, row) : i; let i = $index) {
                <tr
                  [class.tc-table-clickable]="clickable"
                  (click)="clickable && rowClick.emit(row)"
                >
                  @for (column of columns; track column.key) {
                    <td
                      [class.tc-text-left]="column.align !== 'center' && column.align !== 'right'"
                      [class.tc-text-center]="column.align === 'center'"
                      [class.tc-text-right]="column.align === 'right'"
                    >
                      @if (column.template) {
                        <ng-container
                          [ngTemplateOutlet]="column.template"
                          [ngTemplateOutletContext]="{ $implicit: getValue(row, column.key), row: row, index: i }"
                        ></ng-container>
                      } @else {
                        {{ getValue(row, column.key) }}
                      }
                    </td>
                  }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      @if (pagination && pagination.totalPages > 1) {
        <div class="tc-table-pagination">
          <div class="tc-table-pagination-info">
            Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} to {{ minValue(pagination.page * pagination.limit, pagination.total) }} of {{ pagination.total }} results
          </div>
          <div class="tc-table-pagination-buttons">
            <button
              type="button"
              (click)="onPageChange(pagination.page - 1)"
              [disabled]="pagination.page <= 1"
              class="tc-table-pagination-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Previous
            </button>
            <button
              type="button"
              (click)="onPageChange(pagination.page + 1)"
              [disabled]="pagination.page >= pagination.totalPages"
              class="tc-table-pagination-btn"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .tc-table-wrapper {
      background: var(--tc-table-bg, #fff);
      border-radius: var(--tc-table-radius, 0.75rem);
      border: 1px solid var(--tc-table-border, #e5e5e5);
      overflow: hidden;
      box-shadow: var(--tc-table-shadow, 0 1px 3px rgba(0, 0, 0, 0.05));
    }

    .tc-table-scroll {
      overflow-x: auto;
    }

    .tc-table {
      width: 100%;
      border-collapse: collapse;
    }

    .tc-table thead {
      background: var(--tc-table-header-bg, #fafafa);
    }

    .tc-table th {
      padding: var(--tc-table-header-py, 0.75rem) var(--tc-table-header-px, 1.5rem);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--tc-table-header-text, #737373);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--tc-table-border, #e5e5e5);
      text-align: left;
    }

    .tc-table td {
      padding: var(--tc-table-cell-py, 1rem) var(--tc-table-cell-px, 1.5rem);
      font-size: 0.875rem;
      color: var(--tc-table-cell-text, #404040);
      border-bottom: 1px solid var(--tc-table-row-border, #f5f5f5);
    }

    .tc-table tbody tr:hover {
      background: var(--tc-table-row-hover-bg, #fafafa);
    }

    .tc-table-clickable {
      cursor: pointer;
    }

    .tc-table-header-cell {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .tc-justify-center {
      justify-content: center;
    }

    .tc-justify-end {
      justify-content: flex-end;
    }

    .tc-sort-indicators {
      display: flex;
      flex-direction: column;
    }

    .tc-sort-indicators span {
      display: flex;
      line-height: 0;
    }

    .tc-sort-indicators span:first-child {
      margin-bottom: -2px;
    }

    .tc-sort-indicators span:last-child {
      margin-top: -2px;
    }

    .tc-sort-active {
      color: var(--tc-table-sort-active, #4f46e5);
    }

    .tc-sort-inactive {
      color: var(--tc-table-sort-inactive, #d4d4d4);
    }

    .tc-table-skeleton {
      height: 1rem;
      width: 75%;
      background: #e5e5e5;
      border-radius: 0.25rem;
      animation: tc-shimmer 1.5s infinite;
    }

    @keyframes tc-shimmer {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        opacity: 1;
      }
    }

    .tc-table-empty {
      padding: 3rem 1.5rem;
      text-align: center;
    }

    .tc-table-empty-default {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      margin: 0;
    }

    .tc-table-empty-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #404040;
    }

    .tc-table-empty-description {
      font-size: 0.8125rem;
      color: #737373;
    }

    .tc-table-pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--tc-table-border, #e5e5e5);
    }

    .tc-table-pagination-info {
      font-size: 0.875rem;
      color: #737373;
    }

    .tc-table-pagination-buttons {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .tc-table-pagination-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      background: var(--tc-btn-secondary-bg, #fff);
      border: 1px solid var(--tc-btn-secondary-border, #e5e5e5);
      border-radius: 0.5rem;
      cursor: pointer;
    }

    .tc-table-pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tc-text-left {
      text-align: left;
    }

    .tc-text-center {
      text-align: center;
    }

    .tc-text-right {
      text-align: right;
    }
  `],
})
export class TcTableComponent<T = unknown> {
  @Input() columns: TcTableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Input() loading = false;
  @Input() pagination?: TcPaginationMeta;
  @Input() sortColumn?: string;
  @Input() sortDirection?: 'asc' | 'desc' | null;
  @Input() clickable = false;
  @Input() emptyTitle = 'No data found';
  @Input() emptyDescription = 'There are no items to display.';
  @Input() trackBy?: (index: number, item: T) => unknown;
  @Input() hasCustomEmpty = false;

  @Output() sort = new EventEmitter<TcSortEvent>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() rowClick = new EventEmitter<T>();

  skeletonRows = Array(5).fill(0);

  minValue(a: number, b: number): number {
    return Math.min(a, b);
  }

  getValue(row: T, key: string): unknown {
    const keys = key.split('.');
    let value: unknown = row;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return undefined;
      }
    }
    return value;
  }

  onSort(column: string) {
    let direction: 'asc' | 'desc' | null = 'asc';

    if (this.sortColumn === column) {
      if (this.sortDirection === 'asc') {
        direction = 'desc';
      } else if (this.sortDirection === 'desc') {
        direction = null;
      }
    }

    this.sort.emit({ column, direction });
  }

  onPageChange(page: number) {
    if (this.pagination && page >= 1 && page <= this.pagination.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
