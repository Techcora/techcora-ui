import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcPageTitleIconVariant } from './tc-page-header.types';

@Component({
  selector: 'tc-page-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tc-page-title-wrapper">
      <div class="tc-page-title-left">
        <div
          class="tc-page-title-icon-wrapper"
          [ngClass]="{
            'tc-page-title-icon-primary': iconVariant === 'primary',
            'tc-page-title-icon-secondary': iconVariant === 'secondary',
            'tc-page-title-icon-gradient': iconVariant === 'gradient'
          }"
        >
          <ng-content select="[tc-page-title-icon]"></ng-content>
        </div>
        <div>
          <h2 class="tc-page-title-heading">{{ title }}</h2>
          @if (subtitle) {
            <p class="tc-page-title-subtitle">{{ subtitle }}</p>
          }
        </div>
      </div>
      <div class="tc-page-title-actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .tc-page-title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }

    .tc-page-title-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .tc-page-title-icon-wrapper {
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tc-page-title-icon-primary {
      background: var(--tc-page-title-primary-bg, #eef2ff);
    }

    .tc-page-title-icon-secondary {
      background: var(--tc-page-title-secondary-bg, #fdf4ff);
    }

    .tc-page-title-icon-gradient {
      background: var(--tc-page-title-gradient-bg, linear-gradient(135deg, #4f46e5, #7c3aed));
    }

    .tc-page-title-heading {
      font-size: var(--tc-page-title-size, 1.5rem);
      font-weight: 700;
      color: var(--tc-page-title-color, #171717);
      margin: 0;
    }

    .tc-page-title-subtitle {
      font-size: 0.875rem;
      color: var(--tc-page-title-subtitle-color, #737373);
      margin: 0.25rem 0 0;
    }

    .tc-page-title-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
  `]
})
export class TcPageTitleComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() iconVariant: TcPageTitleIconVariant = 'primary';
}
