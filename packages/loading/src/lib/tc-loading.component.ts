import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcSpinnerComponent } from './tc-spinner.component';
import { TcSpinnerSize } from './tc-loading.types';

@Component({
  selector: 'tc-loading',
  standalone: true,
  imports: [CommonModule, TcSpinnerComponent],
  template: `
    <div class="tc-loading" [class.tc-loading-compact]="compact">
      <tc-spinner [size]="size"></tc-spinner>
      @if (text) {
        <p class="tc-loading-text">{{ text }}</p>
      }
    </div>
  `,
  styles: [`
    .tc-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      gap: 1rem;
    }

    .tc-loading-compact {
      padding: 1.5rem 1rem;
    }

    .tc-loading-text {
      margin: 0;
      font-size: 0.875rem;
      color: var(--tc-loading-text-color, #737373);
    }
  `],
})
export class TcLoadingComponent {
  @Input() text?: string;
  @Input() size: TcSpinnerSize = 'lg';
  @Input() compact: boolean = false;
}
