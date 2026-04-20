import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcEmptyStateComponent } from './tc-empty-state.component';

@Component({
  selector: 'tc-error-state',
  standalone: true,
  imports: [CommonModule, TcEmptyStateComponent],
  template: `
    <tc-empty-state [title]="title" [description]="description" [compact]="compact">
      <ng-content select="[tc-empty-state-icon]" tc-empty-state-icon></ng-content>
      @if (showRetry) {
        <button type="button" class="tc-error-retry-btn" (click)="onRetry()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/></svg>
          Try again
        </button>
      }
      <ng-content></ng-content>
    </tc-empty-state>
  `,
  styles: [`
    .tc-error-retry-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      background: var(--tc-btn-secondary-bg, #fff);
      border: 1px solid var(--tc-btn-secondary-border, #e5e5e5);
      border-radius: 0.5rem;
      cursor: pointer;
    }
  `]
})
export class TcErrorStateComponent {
  @Input() title = 'Something went wrong';
  @Input() description = 'An error occurred. Please try again.';
  @Input() showRetry = true;
  @Input() compact = false;
  @Input() retryFn?: () => void;

  onRetry(): void {
    if (this.retryFn) {
      this.retryFn();
    }
  }
}
