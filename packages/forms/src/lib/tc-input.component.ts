import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TcInputType } from './tc-forms.types';

@Component({
  selector: 'tc-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TcInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="tc-input-wrapper">
      @if (label) {
        <label
          class="tc-input-label"
          [class.tc-input-label-required]="required"
          [attr.for]="inputId"
        >
          {{ label }}
        </label>
      }

      <div class="tc-input-field-wrapper">
        <div class="tc-input-icon-left-wrapper">
          <ng-content select="[tc-input-icon-left]"></ng-content>
        </div>

        @if (type === 'password') {
          <input
            [id]="inputId"
            [type]="showPassword ? 'text' : 'password'"
            class="tc-input"
            [class.tc-input-error]="error"
            [class.tc-input-readonly]="readonly"
            [class.tc-input-has-icon-left]="hasIconLeft"
            [class.tc-input-has-icon-right]="true"
            [placeholder]="placeholder"
            [readonly]="readonly"
            [disabled]="isDisabled"
            [attr.aria-invalid]="error ? true : null"
            [attr.aria-describedby]="error ? inputId + '-error' : hint ? inputId + '-hint' : null"
            [value]="value"
            (input)="onInputChange($event)"
            (blur)="onTouched()"
          />
          <button
            type="button"
            class="tc-input-password-toggle"
            (click)="togglePassword()"
            [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
            tabindex="-1"
          >
            @if (showPassword) {
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
            }
          </button>
        } @else {
          <input
            [id]="inputId"
            [type]="type"
            class="tc-input"
            [class.tc-input-error]="error"
            [class.tc-input-readonly]="readonly"
            [class.tc-input-has-icon-left]="hasIconLeft"
            [class.tc-input-has-icon-right]="hasIconRight"
            [placeholder]="placeholder"
            [readonly]="readonly"
            [disabled]="isDisabled"
            [attr.aria-invalid]="error ? true : null"
            [attr.aria-describedby]="error ? inputId + '-error' : hint ? inputId + '-hint' : null"
            [value]="value"
            (input)="onInputChange($event)"
            (blur)="onTouched()"
          />
        }

        @if (type !== 'password') {
          <div class="tc-input-icon-right-wrapper">
            <ng-content select="[tc-input-icon-right]"></ng-content>
          </div>
        }
      </div>

      @if (hint && !error) {
        <p class="tc-input-hint" [id]="inputId + '-hint'">{{ hint }}</p>
      }
      @if (error) {
        <p class="tc-input-error-text" [id]="inputId + '-error'">{{ error }}</p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .tc-input-wrapper {
      width: 100%;
    }

    .tc-input-label {
      display: block;
      font-size: var(--tc-input-label-size, 0.875rem);
      font-weight: 500;
      color: var(--tc-input-label-color, #404040);
      margin-bottom: 0.375rem;
    }

    .tc-input-label-required::after {
      content: ' *';
      color: var(--tc-input-error-color, #dc2626);
    }

    .tc-input-field-wrapper {
      position: relative;
    }

    .tc-input {
      width: 100%;
      padding: var(--tc-input-py, 0.625rem) var(--tc-input-px, 0.75rem);
      font-size: var(--tc-input-font-size, 0.875rem);
      border: 1px solid var(--tc-input-border, #d4d4d4);
      border-radius: var(--tc-input-radius, 0.5rem);
      background: var(--tc-input-bg, #fff);
      color: var(--tc-input-color, #171717);
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
      font-family: inherit;
      box-sizing: border-box;
    }

    .tc-input:focus {
      border-color: var(--tc-input-focus-border, #4f46e5);
      box-shadow: 0 0 0 3px var(--tc-input-focus-ring, rgba(79, 70, 229, 0.1));
    }

    .tc-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tc-input-error {
      border-color: var(--tc-input-error-color, #dc2626);
    }

    .tc-input-error:focus {
      border-color: var(--tc-input-error-color, #dc2626);
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }

    .tc-input-readonly {
      background: var(--tc-input-readonly-bg, #f5f5f5);
    }

    .tc-input-has-icon-left {
      padding-left: 2.75rem;
    }

    .tc-input-has-icon-right {
      padding-right: 2.75rem;
    }

    .tc-input-icon-left-wrapper {
      position: absolute;
      inset-block: 0;
      left: 0;
      padding-left: 0.75rem;
      display: flex;
      align-items: center;
      pointer-events: none;
    }

    .tc-input-icon-right-wrapper {
      position: absolute;
      inset-block: 0;
      right: 0;
      padding-right: 0.75rem;
      display: flex;
      align-items: center;
      pointer-events: none;
    }

    .tc-input-password-toggle {
      position: absolute;
      inset-block: 0;
      right: 0;
      padding-right: 0.75rem;
      display: flex;
      align-items: center;
      background: none;
      border: none;
      cursor: pointer;
      color: #a3a3a3;
      transition: color 0.15s ease;
    }

    .tc-input-password-toggle:hover {
      color: #525252;
    }

    .tc-input-hint {
      font-size: 0.75rem;
      color: var(--tc-input-hint-color, #737373);
      margin: 0.375rem 0 0;
    }

    .tc-input-error-text {
      font-size: 0.75rem;
      color: var(--tc-input-error-color, #dc2626);
      margin: 0.375rem 0 0;
    }
  `],
})
export class TcInputComponent implements ControlValueAccessor {
  private static idCounter = 0;

  readonly inputId = `tc-input-${TcInputComponent.idCounter++}`;

  @Input() type: TcInputType = 'text';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() error = '';
  @Input() required = false;
  @Input() readonly = false;
  @Input() hasIconLeft = false;
  @Input() hasIconRight = false;

  @Output() valueChange = new EventEmitter<string>();

  value = '';
  showPassword = false;
  isDisabled = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
