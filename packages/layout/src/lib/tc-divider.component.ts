import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcDividerSpacing } from './tc-layout.types';

@Component({
  selector: 'tc-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="tc-divider"
      [ngClass]="{
        'tc-divider-sm': spacing === 'sm',
        'tc-divider-md': spacing === 'md',
        'tc-divider-lg': spacing === 'lg'
      }"
    >
      @if (label) {
        <span class="tc-divider-label">{{ label }}</span>
      }
    </div>
  `,
  styles: [`
    .tc-divider {
      border-top: 1px solid var(--tc-divider-color, #e5e5e5);
      position: relative;
    }

    .tc-divider-sm {
      margin: 1rem 0;
    }

    .tc-divider-md {
      margin: 1.5rem 0;
    }

    .tc-divider-lg {
      margin: 2rem 0;
    }

    .tc-divider-label {
      font-size: 0.875rem;
      color: #737373;
      position: absolute;
      top: -0.625rem;
      left: 1rem;
      background: #fff;
      padding: 0 0.5rem;
    }
  `]
})
export class TcDividerComponent {
  @Input() label?: string;
  @Input() spacing: TcDividerSpacing = 'md';
}
