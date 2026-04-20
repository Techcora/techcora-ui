import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcGridCols, TcGridGap } from './tc-layout.types';

@Component({
  selector: 'tc-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="tc-grid"
      [ngClass]="[
        'tc-grid-cols-' + cols,
        'tc-grid-gap-' + gap
      ]"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tc-grid {
      display: grid;
      grid-template-columns: 1fr;
    }

    .tc-grid-gap-md {
      gap: var(--tc-grid-gap-md, 1rem);
    }

    .tc-grid-gap-lg {
      gap: var(--tc-grid-gap-lg, 1.5rem);
    }

    .tc-grid-gap-xl {
      gap: var(--tc-grid-gap-xl, 2rem);
    }

    @media (min-width: 640px) {
      .tc-grid-cols-2,
      .tc-grid-cols-3,
      .tc-grid-cols-4 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .tc-grid-cols-3,
      .tc-grid-cols-4 {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1280px) {
      .tc-grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `]
})
export class TcGridComponent {
  @Input() cols: TcGridCols = 3;
  @Input() gap: TcGridGap = 'md';
}
