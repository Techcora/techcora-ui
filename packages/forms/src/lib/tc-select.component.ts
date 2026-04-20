import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TcSelectOption } from './tc-forms.types';

@Component({
  selector: 'tc-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TcSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="tc-select-wrapper">
      @if (label) {
        <label
          class="tc-input-label"
          [class.tc-input-label-required]="required"
          [id]="selectId + '-label'"
        >
          {{ label }}
        </label>
      }

      <div class="tc-select-field-wrapper">
        <button
          type="button"
          class="tc-select-trigger"
          [class.tc-input-error]="error"
          [class.tc-select-open]="isOpen()"
          [disabled]="isDisabled"
          [attr.aria-haspopup]="'listbox'"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-labelledby]="label ? selectId + '-label' : null"
          (click)="toggle()"
          (keydown)="onTriggerKeydown($event)"
        >
          <span class="tc-select-value" [class.tc-select-placeholder]="!selectedOption">
            {{ selectedOption ? selectedOption.label : placeholder }}
          </span>
          <span class="tc-select-chevron" [class.tc-select-chevron-open]="isOpen()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </span>
        </button>

        @if (isOpen()) {
          <div
            class="tc-select-dropdown"
            role="listbox"
            [attr.aria-labelledby]="label ? selectId + '-label' : null"
          >
            @for (option of options; track option.value; let i = $index) {
              <div
                class="tc-select-option"
                [class.tc-select-option-selected]="option.value === value"
                [class.tc-select-option-focused]="i === focusedIndex"
                [class.tc-select-option-disabled]="option.disabled"
                role="option"
                [attr.aria-selected]="option.value === value"
                [attr.aria-disabled]="option.disabled || null"
                (click)="selectOption(option)"
                (mouseenter)="focusedIndex = i"
              >
                <div class="tc-select-option-content">
                  <span class="tc-select-option-label">{{ option.label }}</span>
                  @if (option.description) {
                    <span class="tc-select-option-desc">{{ option.description }}</span>
                  }
                </div>
                @if (option.value === value) {
                  <span class="tc-select-check">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                }
              </div>
            }
          </div>
        }
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

    .tc-select-wrapper {
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

    .tc-select-field-wrapper {
      position: relative;
    }

    .tc-select-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--tc-input-py, 0.625rem) var(--tc-input-px, 0.75rem);
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
      text-align: left;
    }

    .tc-select-trigger:focus {
      border-color: var(--tc-input-focus-border, #4f46e5);
      box-shadow: 0 0 0 3px var(--tc-input-focus-ring, rgba(79, 70, 229, 0.1));
    }

    .tc-select-trigger:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tc-input-error {
      border-color: var(--tc-input-error-color, #dc2626);
    }

    .tc-select-value {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tc-select-placeholder {
      color: var(--tc-input-placeholder-color, #a3a3a3);
    }

    .tc-select-chevron {
      display: flex;
      align-items: center;
      color: #a3a3a3;
      transition: transform 0.2s ease;
      flex-shrink: 0;
      margin-left: 0.5rem;
    }

    .tc-select-chevron-open {
      transform: rotate(180deg);
    }

    .tc-select-dropdown {
      position: absolute;
      top: calc(100% + 0.25rem);
      left: 0;
      right: 0;
      background: var(--tc-input-bg, #fff);
      border: 1px solid var(--tc-input-border, #d4d4d4);
      border-radius: var(--tc-input-radius, 0.5rem);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
      z-index: 50;
      max-height: 15rem;
      overflow-y: auto;
      padding: 0.25rem 0;
      box-sizing: border-box;
    }

    .tc-select-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.75rem;
      font-size: var(--tc-input-font-size, 0.875rem);
      color: var(--tc-input-color, #171717);
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .tc-select-option:hover:not(.tc-select-option-disabled) {
      background-color: var(--tc-input-hover-bg, #fafafa);
    }

    .tc-select-option-focused:not(.tc-select-option-disabled) {
      background-color: var(--tc-input-hover-bg, #fafafa);
    }

    .tc-select-option-selected {
      font-weight: 500;
      color: var(--tc-input-focus-border, #4f46e5);
    }

    .tc-select-option-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tc-select-option-content {
      flex: 1;
      min-width: 0;
    }

    .tc-select-option-label {
      display: block;
    }

    .tc-select-option-desc {
      display: block;
      font-size: 0.75rem;
      color: var(--tc-input-hint-color, #737373);
      margin-top: 0.125rem;
    }

    .tc-select-check {
      display: flex;
      align-items: center;
      color: var(--tc-input-focus-border, #4f46e5);
      flex-shrink: 0;
      margin-left: 0.5rem;
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
export class TcSelectComponent implements ControlValueAccessor {
  private static idCounter = 0;

  private elementRef = inject(ElementRef);

  readonly selectId = `tc-select-${TcSelectComponent.idCounter++}`;

  @Input() options: TcSelectOption[] = [];
  @Input() label = '';
  @Input() placeholder = 'Select an option';
  @Input() hint = '';
  @Input() error = '';
  @Input() required = false;

  @Output() valueChange = new EventEmitter<string>();

  value = '';
  isDisabled = false;
  isOpen = signal(false);
  focusedIndex = -1;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get selectedOption(): TcSelectOption | undefined {
    return this.options.find(o => o.value === this.value);
  }

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

  toggle(): void {
    if (this.isDisabled) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      const idx = this.options.findIndex(o => o.value === this.value);
      this.focusedIndex = idx >= 0 ? idx : 0;
    }
  }

  open(): void {
    if (this.isDisabled) return;
    this.isOpen.set(true);
    const idx = this.options.findIndex(o => o.value === this.value);
    this.focusedIndex = idx >= 0 ? idx : 0;
  }

  close(): void {
    this.isOpen.set(false);
    this.focusedIndex = -1;
    this.onTouched();
  }

  selectOption(option: TcSelectOption): void {
    if (option.disabled) return;
    this.value = option.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.moveFocus(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.moveFocus(-1);
        }
        break;
      case 'Home':
        event.preventDefault();
        if (this.isOpen()) {
          this.focusedIndex = this.findNextEnabled(0, 1);
        }
        break;
      case 'End':
        event.preventDefault();
        if (this.isOpen()) {
          this.focusedIndex = this.findNextEnabled(this.options.length - 1, -1);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen() && this.focusedIndex >= 0 && this.focusedIndex < this.options.length) {
          this.selectOption(this.options[this.focusedIndex]);
        } else if (!this.isOpen()) {
          this.open();
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }

  private moveFocus(direction: 1 | -1): void {
    const next = this.findNextEnabled(this.focusedIndex + direction, direction);
    if (next >= 0) {
      this.focusedIndex = next;
    }
  }

  private findNextEnabled(start: number, direction: 1 | -1): number {
    let index = start;
    while (index >= 0 && index < this.options.length) {
      if (!this.options[index].disabled) {
        return index;
      }
      index += direction;
    }
    return this.focusedIndex;
  }
}
