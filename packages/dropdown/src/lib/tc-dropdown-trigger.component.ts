import {
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Optional trigger button component.
 *
 * Provides a styled button with an optional icon slot and chevron indicator.
 * The icon is projected via content — bring your own icon library.
 *
 * ```html
 * <tc-dropdown [items]="items">
 *   <tc-dropdown-trigger trigger label="Actions" variant="secondary">
 *     <lucide-icon icon class="h-4 w-4" name="layers"></lucide-icon>
 *   </tc-dropdown-trigger>
 * </tc-dropdown>
 * ```
 */
@Component({
  selector: 'tc-dropdown-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="tc-dd-btn"
      [class.tc-dd-btn-primary]="variant === 'primary'"
      [class.tc-dd-btn-secondary]="variant === 'secondary'"
    >
      <ng-content select="[icon]"></ng-content>
      @if (label) {
        <span>{{ label }}</span>
      }
      <svg
        class="tc-dd-chevron"
        xmlns="http://www.w3.org/2000/svg"
        width="16" height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .tc-dd-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      font-size: var(--tc-dd-btn-font-size, 0.875rem);
      font-weight: 500;
      font-family: inherit;
      border-radius: var(--tc-dd-btn-radius, 0.5rem);
      border: none;
      cursor: pointer;
      transition: background-color 0.15s ease;
      line-height: 1.5;
      box-sizing: border-box;
    }

    .tc-dd-btn-primary {
      background-color: var(--tc-dd-btn-primary-bg, #4f46e5);
      color: var(--tc-dd-btn-primary-text, #ffffff);
    }

    .tc-dd-btn-primary:hover {
      background-color: var(--tc-dd-btn-primary-hover-bg, #4338ca);
    }

    .tc-dd-btn-secondary {
      background-color: var(--tc-dd-btn-secondary-bg, #ffffff);
      color: var(--tc-dd-btn-secondary-text, #404040);
      border: 1px solid var(--tc-dd-btn-secondary-border, #e5e5e5);
    }

    .tc-dd-btn-secondary:hover {
      background-color: var(--tc-dd-btn-secondary-hover-bg, #fafafa);
    }

    .tc-dd-chevron {
      width: 1rem;
      height: 1rem;
      opacity: 0.5;
      flex-shrink: 0;
    }
  `],
})
export class TcDropdownTriggerComponent {
  @Input() label = '';
  @Input() variant: 'primary' | 'secondary' = 'secondary';
}
