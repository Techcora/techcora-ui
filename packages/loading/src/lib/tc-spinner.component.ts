import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcSpinnerSize } from './tc-loading.types';

@Component({
  selector: 'tc-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="tc-spinner" [ngClass]="[sizeClass, variantClass]"></span>`,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .tc-spinner {
      display: inline-block;
      border-radius: 50%;
      border: 2px solid currentColor;
      border-top-color: transparent;
      animation: tc-spin 0.6s linear infinite;
    }

    .tc-spinner-xs {
      width: 0.75rem;
      height: 0.75rem;
    }

    .tc-spinner-sm {
      width: 1rem;
      height: 1rem;
    }

    .tc-spinner-md {
      width: 1.5rem;
      height: 1.5rem;
    }

    .tc-spinner-lg {
      width: 2rem;
      height: 2rem;
    }

    .tc-spinner-xl {
      width: 3rem;
      height: 3rem;
    }

    .tc-spinner-primary {
      color: var(--tc-spinner-primary-color, #4f46e5);
    }

    .tc-spinner-white {
      color: #fff;
    }

    .tc-spinner-muted {
      color: var(--tc-spinner-muted-color, #a3a3a3);
    }

    @keyframes tc-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `],
})
export class TcSpinnerComponent {
  @Input() size: TcSpinnerSize = 'md';
  @Input() variant: 'primary' | 'white' | 'muted' = 'primary';

  get sizeClass(): string {
    return `tc-spinner-${this.size}`;
  }

  get variantClass(): string {
    return `tc-spinner-${this.variant}`;
  }
}
