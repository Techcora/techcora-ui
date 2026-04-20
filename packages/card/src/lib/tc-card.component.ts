import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcCardVariant, TcCardPadding } from './tc-card.types';

@Component({
  selector: 'tc-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="tc-card"
      [ngClass]="[
        'tc-card--variant-' + variant,
        'tc-card--padding-' + padding
      ]"
    >
      <ng-container *ngIf="!loading; else skeleton">
        <ng-content></ng-content>
      </ng-container>
      <ng-template #skeleton>
        <div class="tc-card__skeleton">
          <div class="tc-card__skeleton-line tc-card__skeleton-line--title"></div>
          <div class="tc-card__skeleton-line tc-card__skeleton-line--text"></div>
          <div class="tc-card__skeleton-line tc-card__skeleton-line--text tc-card__skeleton-line--short"></div>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .tc-card {
      background: var(--tc-card-bg, #ffffff);
      border: 1px solid var(--tc-card-border, #e5e5e5);
      border-radius: var(--tc-card-radius, 0.75rem);
      box-shadow: var(--tc-card-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
      overflow: hidden;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }

    /* Variant: hover */
    .tc-card--variant-hover:hover {
      box-shadow: var(--tc-card-hover-shadow, 0 4px 12px rgba(0, 0, 0, 0.15));
    }

    /* Variant: interactive */
    .tc-card--variant-interactive {
      cursor: pointer;
    }

    .tc-card--variant-interactive:hover {
      box-shadow: var(--tc-card-hover-shadow, 0 4px 12px rgba(0, 0, 0, 0.15));
      transform: translateY(-2px);
    }

    .tc-card--variant-interactive:active {
      transform: translateY(0);
    }

    /* Variant: glass */
    .tc-card--variant-glass {
      background: var(--tc-card-glass-bg, rgba(255, 255, 255, 0.7));
      backdrop-filter: blur(var(--tc-card-glass-blur, 8px));
      -webkit-backdrop-filter: blur(var(--tc-card-glass-blur, 8px));
    }

    /* Padding */
    .tc-card--padding-none {
      padding: 0;
    }

    .tc-card--padding-sm {
      padding: var(--tc-card-padding-sm, 0.75rem);
    }

    .tc-card--padding-md {
      padding: var(--tc-card-padding-md, 1.5rem);
    }

    .tc-card--padding-lg {
      padding: var(--tc-card-padding-lg, 2rem);
    }

    /* Skeleton loading */
    .tc-card__skeleton {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .tc-card__skeleton-line {
      height: 1rem;
      border-radius: 0.25rem;
      background: linear-gradient(
        90deg,
        #e5e5e5 25%,
        #f0f0f0 50%,
        #e5e5e5 75%
      );
      background-size: 200% 100%;
      animation: tc-shimmer 1.5s infinite ease-in-out;
    }

    .tc-card__skeleton-line--title {
      height: 1.25rem;
      width: 60%;
    }

    .tc-card__skeleton-line--text {
      width: 100%;
    }

    .tc-card__skeleton-line--short {
      width: 40%;
    }

    @keyframes tc-shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `]
})
export class TcCardComponent {
  @Input() variant: TcCardVariant = 'default';
  @Input() padding: TcCardPadding = 'md';
  @Input() loading = false;
}
