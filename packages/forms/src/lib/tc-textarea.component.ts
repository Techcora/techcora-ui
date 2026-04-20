import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tc-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TcTextareaComponent),
      multi: true,
    },
  ],
  template: `
    <div class="tc-textarea-wrapper">
      @if (label) {
        <label
          class="tc-input-label"
          [class.tc-input-label-required]="required"
          [attr.for]="textareaId"
        >
          {{ label }}
        </label>
      }

      <textarea
        [id]="textareaId"
        class="tc-textarea"
        [class.tc-input-error]="error"
        [class.tc-input-readonly]="readonly"
        [placeholder]="placeholder"
        [rows]="rows"
        [readonly]="readonly"
        [disabled]="isDisabled"
        [attr.maxlength]="maxLength || null"
        [attr.aria-invalid]="error ? true : null"
        [attr.aria-describedby]="error ? textareaId + '-error' : hint ? textareaId + '-hint' : null"
        [value]="value"
        (input)="onInputChange($event)"
        (blur)="onTouched()"
      ></textarea>

      <div class="tc-textarea-footer">
        @if (hint && !error) {
          <p class="tc-input-hint" [id]="textareaId + '-hint'">{{ hint }}</p>
        }
        @if (error) {
          <p class="tc-input-error-text" [id]="textareaId + '-error'">{{ error }}</p>
        }
        @if (maxLength) {
          <p class="tc-textarea-counter" [class.tc-textarea-counter-error]="value.length >= maxLength">
            {{ value.length }} / {{ maxLength }}
          </p>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .tc-textarea-wrapper {
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

    .tc-textarea {
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
      resize: vertical;
      line-height: 1.5;
    }

    .tc-textarea:focus {
      border-color: var(--tc-input-focus-border, #4f46e5);
      box-shadow: 0 0 0 3px var(--tc-input-focus-ring, rgba(79, 70, 229, 0.1));
    }

    .tc-textarea:disabled {
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

    .tc-textarea-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
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

    .tc-textarea-counter {
      font-size: 0.75rem;
      color: var(--tc-input-hint-color, #737373);
      margin: 0.375rem 0 0;
      margin-left: auto;
    }

    .tc-textarea-counter-error {
      color: var(--tc-input-error-color, #dc2626);
    }
  `],
})
export class TcTextareaComponent implements ControlValueAccessor {
  private static idCounter = 0;

  readonly textareaId = `tc-textarea-${TcTextareaComponent.idCounter++}`;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() error = '';
  @Input() required = false;
  @Input() readonly = false;
  @Input() rows = 4;
  @Input() maxLength = 0;

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

  onInputChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
}
