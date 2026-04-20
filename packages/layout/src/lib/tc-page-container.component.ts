import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcContainerSize } from './tc-layout.types';

@Component({
  selector: 'tc-page-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="tc-page-container"
      [ngClass]="{
        'tc-page-container-default': size === 'default',
        'tc-page-container-narrow': size === 'narrow',
        'tc-page-container-compact': size === 'compact',
        'tc-page-container-full': size === 'full'
      }"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tc-page-container {
      margin: 0 auto;
      width: 100%;
    }

    .tc-page-container-default {
      max-width: var(--tc-container-default, 80rem);
    }

    .tc-page-container-narrow {
      max-width: var(--tc-container-narrow, 64rem);
    }

    .tc-page-container-compact {
      max-width: var(--tc-container-compact, 48rem);
    }

    .tc-page-container-full {
      max-width: 100%;
    }
  `]
})
export class TcPageContainerComponent {
  @Input() size: TcContainerSize = 'default';
}
