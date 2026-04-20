import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TcSkeletonVariant = 'text' | 'avatar' | 'card' | 'table-row' | 'stat-card';

@Component({
  selector: 'tc-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="variant">
      <!-- Text variant -->
      <ng-container *ngSwitchCase="'text'">
        <div class="tc-skeleton-line tc-skeleton-shimmer" [style.width]="width || '100%'"></div>
      </ng-container>

      <!-- Avatar variant -->
      <ng-container *ngSwitchCase="'avatar'">
        <div class="tc-skeleton-avatar tc-skeleton-shimmer"
             [class.tc-skeleton-avatar-md]="size === 'md'"
             [class.tc-skeleton-avatar-lg]="size === 'lg'"
             [class.tc-skeleton-avatar-xl]="size === 'xl'">
        </div>
      </ng-container>

      <!-- Card variant -->
      <ng-container *ngSwitchCase="'card'">
        <div class="tc-skeleton-card">
          <div class="tc-skeleton-card-header tc-skeleton-shimmer"></div>
          <div class="tc-skeleton-card-body">
            <div class="tc-skeleton-line tc-skeleton-shimmer" style="width: 80%"></div>
            <div class="tc-skeleton-line tc-skeleton-shimmer" style="width: 60%"></div>
            <div class="tc-skeleton-line tc-skeleton-shimmer" style="width: 70%"></div>
          </div>
        </div>
      </ng-container>

      <!-- Table row variant -->
      <ng-container *ngSwitchCase="'table-row'">
        <div class="tc-skeleton-table-row">
          <div class="tc-skeleton-table-cell tc-skeleton-shimmer" style="width: 15%"></div>
          <div class="tc-skeleton-table-cell tc-skeleton-shimmer" style="width: 25%"></div>
          <div class="tc-skeleton-table-cell tc-skeleton-shimmer" style="width: 20%"></div>
          <div class="tc-skeleton-table-cell tc-skeleton-shimmer" style="width: 20%"></div>
          <div class="tc-skeleton-table-cell tc-skeleton-shimmer" style="width: 10%"></div>
        </div>
      </ng-container>

      <!-- Stat card variant -->
      <ng-container *ngSwitchCase="'stat-card'">
        <div class="tc-skeleton-stat-card">
          <div class="tc-skeleton-line tc-skeleton-shimmer" style="width: 40%; height: 0.75rem;"></div>
          <div class="tc-skeleton-line tc-skeleton-shimmer" style="width: 60%; height: 1.5rem; margin-top: 0.5rem;"></div>
          <div class="tc-skeleton-line tc-skeleton-shimmer" style="width: 30%; height: 0.75rem; margin-top: 0.5rem;"></div>
        </div>
      </ng-container>
    </ng-container>
  `,
  styles: [`
    :host {
      display: block;
    }

    @keyframes tc-shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    .tc-skeleton-shimmer {
      background: linear-gradient(
        90deg,
        var(--tc-skeleton-bg, #e5e5e5) 25%,
        var(--tc-skeleton-highlight, #f5f5f5) 50%,
        var(--tc-skeleton-bg, #e5e5e5) 75%
      );
      background-size: 200% 100%;
      animation: tc-shimmer 1.5s ease-in-out infinite;
    }

    .tc-skeleton-line {
      height: 0.875rem;
      border-radius: var(--tc-skeleton-radius, 0.25rem);
      margin-bottom: 0.5rem;
    }

    .tc-skeleton-line:last-child {
      margin-bottom: 0;
    }

    /* Avatar */
    .tc-skeleton-avatar {
      border-radius: 9999px;
    }

    .tc-skeleton-avatar-md {
      width: 2.5rem;
      height: 2.5rem;
    }

    .tc-skeleton-avatar-lg {
      width: 4rem;
      height: 4rem;
    }

    .tc-skeleton-avatar-xl {
      width: 6rem;
      height: 6rem;
    }

    /* Card */
    .tc-skeleton-card {
      border-radius: var(--tc-skeleton-radius, 0.25rem);
      overflow: hidden;
    }

    .tc-skeleton-card-header {
      height: 8rem;
      border-radius: var(--tc-skeleton-radius, 0.25rem);
    }

    .tc-skeleton-card-body {
      padding: 1rem 0;
    }

    /* Table row */
    .tc-skeleton-table-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 0;
    }

    .tc-skeleton-table-cell {
      height: 0.875rem;
      border-radius: var(--tc-skeleton-radius, 0.25rem);
    }

    /* Stat card */
    .tc-skeleton-stat-card {
      padding: 1rem;
      border: 1px solid var(--tc-skeleton-bg, #e5e5e5);
      border-radius: var(--tc-skeleton-radius, 0.25rem);
    }
  `]
})
export class TcSkeletonComponent {
  @Input() variant: TcSkeletonVariant = 'text';
  @Input() width?: string;
  @Input() size: 'md' | 'lg' | 'xl' = 'md';
}
