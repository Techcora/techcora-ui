import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcButtonVariant, TcButtonSize } from './tc-button.types';

@Component({
  selector: 'tc-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="handleClick($event)"
    >
      @if (loading) {
        <span class="tc-btn-spinner"></span>
      } @else {
        <ng-content select="[tc-button-icon-left]"></ng-content>
      }
      <span [class.tc-btn-sr-only]="iconOnly"><ng-content></ng-content></span>
      @if (!loading) {
        <ng-content select="[tc-button-icon-right]"></ng-content>
      }
    </button>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }

    :host(.tc-btn-full-width) button {
      width: 100%;
    }

    .tc-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      border-radius: var(--tc-btn-radius, 0.5rem);
      transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      cursor: pointer;
      border: none;
      font-family: inherit;
      line-height: 1.5;
      justify-content: center;
    }

    .tc-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tc-btn-primary {
      background-color: var(--tc-btn-primary-bg, #4f46e5);
      color: var(--tc-btn-primary-text, #fff);
    }

    .tc-btn-primary:hover:not(:disabled) {
      background-color: var(--tc-btn-primary-hover-bg, #4338ca);
    }

    .tc-btn-secondary {
      background-color: var(--tc-btn-secondary-bg, #fff);
      color: var(--tc-btn-secondary-text, #404040);
      border: 1px solid var(--tc-btn-secondary-border, #e5e5e5);
    }

    .tc-btn-secondary:hover:not(:disabled) {
      background-color: var(--tc-btn-secondary-hover-bg, #fafafa);
    }

    .tc-btn-ghost {
      background-color: transparent;
      color: var(--tc-btn-ghost-text, #404040);
    }

    .tc-btn-ghost:hover:not(:disabled) {
      background-color: var(--tc-btn-ghost-hover-bg, #f5f5f5);
    }

    .tc-btn-danger {
      background-color: var(--tc-btn-danger-bg, #dc2626);
      color: #fff;
    }

    .tc-btn-danger:hover:not(:disabled) {
      background-color: var(--tc-btn-danger-hover-bg, #b91c1c);
    }

    .tc-btn-success {
      background-color: var(--tc-btn-success-bg, #16a34a);
      color: #fff;
    }

    .tc-btn-success:hover:not(:disabled) {
      background-color: var(--tc-btn-success-hover-bg, #15803d);
    }

    .tc-btn-sm {
      font-size: 0.75rem;
      padding: 0.375rem 0.75rem;
    }

    .tc-btn-md {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }

    .tc-btn-lg {
      font-size: 1rem;
      padding: 0.625rem 1.25rem;
    }

    .tc-btn-icon-only {
      padding: var(--tc-btn-icon-padding, 0.5rem);
    }

    .tc-btn-spinner {
      display: inline-block;
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: tc-spin 0.6s linear infinite;
    }

    @keyframes tc-spin {
      to {
        transform: rotate(360deg);
      }
    }

    .tc-btn-sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }
  `],
})
export class TcButtonComponent {
  @Input() variant: TcButtonVariant = 'primary';
  @Input() size: TcButtonSize = 'md';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() iconOnly: boolean = false;
  @Input() fullWidth: boolean = false;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  @HostBinding('class.tc-btn-full-width')
  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  get buttonClasses(): string {
    const classes = ['tc-btn', `tc-btn-${this.variant}`, `tc-btn-${this.size}`];
    if (this.iconOnly) {
      classes.push('tc-btn-icon-only');
    }
    return classes.join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }
}
