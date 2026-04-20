import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tc-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tc-empty-state" [class.tc-empty-state-compact]="compact">
      <div class="tc-empty-state-icon-wrapper" [ngClass]="iconBgClass">
        <ng-content select="[tc-empty-state-icon]"></ng-content>
      </div>
      @if (title) { <h3 class="tc-empty-state-title">{{ title }}</h3> }
      @if (description) { <p class="tc-empty-state-desc">{{ description }}</p> }
      <div class="tc-empty-state-actions"><ng-content></ng-content></div>
    </div>
  `,
  styles: [`
    .tc-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--tc-empty-state-py, 4rem) 1rem;
    }

    .tc-empty-state-compact {
      padding: 2rem 1rem;
    }

    .tc-empty-state-icon-wrapper {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .tc-empty-state-compact .tc-empty-state-icon-wrapper {
      width: 3rem;
      height: 3rem;
    }

    .tc-empty-state-icon-bg-default {
      background: var(--tc-empty-state-icon-bg, #f5f5f5);
    }

    .tc-empty-state-icon-bg-primary {
      background: var(--tc-empty-state-primary-icon-bg, #eef2ff);
    }

    .tc-empty-state-icon-bg-muted {
      background: var(--tc-empty-state-muted-icon-bg, #fafafa);
    }

    .tc-empty-state-title {
      font-size: var(--tc-empty-state-title-size, 1rem);
      font-weight: 600;
      color: var(--tc-empty-state-title-color, #171717);
      margin: 0 0 0.5rem;
    }

    .tc-empty-state-desc {
      font-size: var(--tc-empty-state-desc-size, 0.875rem);
      color: var(--tc-empty-state-desc-color, #737373);
      margin: 0 0 1rem;
      max-width: 24rem;
    }
  `]
})
export class TcEmptyStateComponent {
  @Input() title?: string;
  @Input() description?: string;
  @Input() variant: 'default' | 'primary' | 'muted' = 'default';
  @Input() compact = false;

  get iconBgClass(): string {
    return `tc-empty-state-icon-bg-${this.variant}`;
  }
}
