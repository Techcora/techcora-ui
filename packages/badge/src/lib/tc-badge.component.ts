import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TcBadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type TcBadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'tc-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="tc-badge"
      [ngClass]="[
        'tc-badge--' + variant,
        'tc-badge--' + size,
        dot ? 'tc-badge--dot' : ''
      ]"
    >
      <ng-content></ng-content>
    </span>
  `,
  styles: [
    `
      .tc-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        border-radius: var(--tc-badge-radius, 9999px);
        font-weight: var(--tc-badge-font-weight, 500);
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
      }

      /* Sizes */
      .tc-badge--sm {
        font-size: var(--tc-badge-sm-font-size, 0.625rem);
        padding: var(--tc-badge-sm-padding, 0.125rem 0.375rem);
      }

      .tc-badge--md {
        font-size: var(--tc-badge-md-font-size, 0.75rem);
        padding: var(--tc-badge-md-padding, 0.25rem 0.5rem);
      }

      .tc-badge--lg {
        font-size: var(--tc-badge-lg-font-size, 0.875rem);
        padding: var(--tc-badge-lg-padding, 0.375rem 0.625rem);
      }

      /* Variants */
      .tc-badge--primary {
        background-color: var(--tc-badge-primary-bg, #eef2ff);
        color: var(--tc-badge-primary-text, #4338ca);
      }

      .tc-badge--secondary {
        background-color: var(--tc-badge-secondary-bg, #fdf4ff);
        color: var(--tc-badge-secondary-text, #9333ea);
      }

      .tc-badge--success {
        background-color: var(--tc-badge-success-bg, #f0fdf4);
        color: var(--tc-badge-success-text, #15803d);
      }

      .tc-badge--warning {
        background-color: var(--tc-badge-warning-bg, #fffbeb);
        color: var(--tc-badge-warning-text, #b45309);
      }

      .tc-badge--error {
        background-color: var(--tc-badge-error-bg, #fef2f2);
        color: var(--tc-badge-error-text, #dc2626);
      }

      .tc-badge--info {
        background-color: var(--tc-badge-info-bg, #eff6ff);
        color: var(--tc-badge-info-text, #1d4ed8);
      }

      .tc-badge--neutral {
        background-color: var(--tc-badge-neutral-bg, #f5f5f5);
        color: var(--tc-badge-neutral-text, #525252);
      }

      /* Dot indicator */
      .tc-badge--dot::before {
        content: '';
        display: inline-block;
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        background-color: currentColor;
        flex-shrink: 0;
      }
    `,
  ],
})
export class TcBadgeComponent {
  @Input() variant: TcBadgeVariant = 'primary';
  @Input() size: TcBadgeSize = 'md';
  @Input() dot = false;
}
