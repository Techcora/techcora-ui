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
  selector: 'tc-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TcToggleComponent),
      multi: true,
    },
  ],
  template: `
    <div class="tc-toggle-wrapper">
      <label class="tc-toggle-container" [attr.for]="toggleId">
        <input
          type="checkbox"
          [id]="toggleId"
          class="tc-toggle-input"
          [checked]="value"
          [disabled]="isDisabled"
          (change)="onToggleChange($event)"
          (blur)="onTouched()"
        />
        <span class="tc-toggle-track"></span>
        @if (label) {
          <span
            class="tc-toggle-label"
            [style.color]="value ? activeColor : inactiveColor"
          >
            {{ label }}
          </span>
        }
      </label>

      @if (hint) {
        <p class="tc-toggle-hint">{{ hint }}</p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .tc-toggle-wrapper {
      width: 100%;
    }

    .tc-toggle-container {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }

    .tc-toggle-input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    .tc-toggle-track {
      width: 2.75rem;
      height: 1.5rem;
      background: var(--tc-toggle-inactive-bg, #d4d4d4);
      border-radius: 9999px;
      position: relative;
      cursor: pointer;
      transition: background-color 0.2s ease;
      flex-shrink: 0;
    }

    .tc-toggle-track::after {
      content: '';
      position: absolute;
      top: 0.125rem;
      left: 0.125rem;
      width: 1.25rem;
      height: 1.25rem;
      background: white;
      border-radius: 50%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    .tc-toggle-input:checked + .tc-toggle-track {
      background: var(--tc-toggle-active-bg, #4f46e5);
    }

    .tc-toggle-input:checked + .tc-toggle-track::after {
      transform: translateX(1.25rem);
    }

    .tc-toggle-input:focus + .tc-toggle-track {
      box-shadow: 0 0 0 4px var(--tc-toggle-focus-ring, rgba(79, 70, 229, 0.1));
    }

    .tc-toggle-input:disabled + .tc-toggle-track {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tc-toggle-label {
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
    }

    .tc-toggle-input:disabled ~ .tc-toggle-label {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tc-toggle-hint {
      font-size: 0.75rem;
      color: var(--tc-input-hint-color, #737373);
      margin: 0.375rem 0 0;
      padding-left: 3.5rem;
    }
  `],
})
export class TcToggleComponent implements ControlValueAccessor {
  private static idCounter = 0;

  readonly toggleId = `tc-toggle-${TcToggleComponent.idCounter++}`;

  @Input() label = '';
  @Input() hint = '';
  @Input() activeColor = 'var(--tc-toggle-active-label-color, #16a34a)';
  @Input() inactiveColor = 'var(--tc-toggle-inactive-label-color, #737373)';

  @Output() valueChange = new EventEmitter<boolean>();

  value = false;
  isDisabled = false;

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.value = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onToggleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.checked;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
}
