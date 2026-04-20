import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TcSelectOption } from './tc-forms.types';

@Component({
  selector: 'tc-native-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TcNativeSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="tc-native-select-wrapper">
      @if (label) {
        <label
          class="tc-input-label"
          [class.tc-input-label-required]="required"
          [attr.for]="selectId"
        >
          {{ label }}
        </label>
      }

      <div class="tc-native-select-field-wrapper">
        <select
          [id]="selectId"
          class="tc-native-select"
          [class.tc-input-error]="error"
          [disabled]="isDisabled"
          [attr.aria-invalid]="error ? true : null"
          [attr.aria-describedby]="error ? selectId + '-error' : hint ? selectId + '-hint' : null"
          (change)="onSelectChange($event)"
          (blur)="onTouched()"
        >
          @if (placeholder) {
            <option value="" disabled [selected]="!value">{{ placeholder }}</option>
          }
          @for (option of options; track option.value) {
            <option
              [value]="option.value"
              [disabled]="option.disabled"
              [selected]="option.value === value"
            >
              {{ option.label }}
            </option>
          }
        </select>
        <span class="tc-native-select-chevron">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>

      @if (hint && !error) {
        <p class="tc-input-hint" [id]="selectId + '-hint'">{{ hint }}</p>
      }
      @if (error) {
        <p class="tc-input-error-text" [id]="selectId + '-error'">{{ error }}</p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .tc-native-select-wrapper {
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

    .tc-native-select-field-wrapper {
      position: relative;
    }

    .tc-native-select {
      width: 100%;
      padding: var(--tc-input-py, 0.625rem) var(--tc-input-px, 0.75rem);
      padding-right: 2.5rem;
      font-size: var(--tc-input-font-size, 0.875rem);
      border: 1px solid var(--tc-input-border, #d4d4d4);
      border-radius: var(--tc-input-radius, 0.5rem);
      background: var(--tc-input-bg, #fff);
      color: var(--tc-input-color, #171717);
      outline: none;
      cursor: pointer;
      font-family: inherit;
      box-sizing: border-box;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    .tc-native-select:focus {
      border-color: var(--tc-input-focus-border, #4f46e5);
      box-shadow: 0 0 0 3px var(--tc-input-focus-ring, rgba(79, 70, 229, 0.1));
    }

    .tc-native-select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tc-input-error {
      border-color: var(--tc-input-error-color, #dc2626);
    }

    .tc-native-select-chevron {
      position: absolute;
      inset-block: 0;
      right: 0;
      padding-right: 0.75rem;
      display: flex;
      align-items: center;
      pointer-events: none;
      color: #a3a3a3;
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
export class TcNativeSelectComponent implements ControlValueAccessor {
  private static idCounter = 0;

  readonly selectId = `tc-native-select-${TcNativeSelectComponent.idCounter++}`;

  @Input() options: TcSelectOption[] = [];
  @Input() label = '';
  @Input() placeholder = 'Select an option';
  @Input() hint = '';
  @Input() error = '';
  @Input() required = false;

  @Output() valueChange = new EventEmitter<string>();

  value = '';
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

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
}
