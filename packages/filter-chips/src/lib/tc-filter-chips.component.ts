import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcFilterChip } from './tc-filter-chips.types';

@Component({
  selector: 'tc-filter-chips',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tc-filter-chips" role="group">
      <button
        *ngFor="let chip of chips"
        type="button"
        role="option"
        class="tc-chip"
        [class.tc-chip-active]="isActive(chip.key)"
        [attr.aria-pressed]="isActive(chip.key)"
        (click)="onChipClick(chip.key)">
        {{ chip.label }}
        <span *ngIf="chip.count != null"
              class="tc-chip-count"
              [class.tc-chip-count-active]="isActive(chip.key)">
          {{ chip.count }}
        </span>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .tc-filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tc-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: var(--tc-chip-py, 0.375rem) var(--tc-chip-px, 0.875rem);
      font-size: var(--tc-chip-font-size, 0.875rem);
      line-height: 1.25rem;
      font-family: inherit;
      border: 1px solid var(--tc-chip-border, #e5e5e5);
      border-radius: var(--tc-chip-radius, 9999px);
      background-color: var(--tc-chip-bg, #fff);
      color: var(--tc-chip-text, #525252);
      cursor: pointer;
      transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      white-space: nowrap;
    }

    .tc-chip:hover {
      background-color: var(--tc-chip-hover-bg, #fafafa);
    }

    .tc-chip:focus-visible {
      outline: 2px solid var(--tc-chip-active-bg, #4f46e5);
      outline-offset: 2px;
    }

    .tc-chip-active {
      background-color: var(--tc-chip-active-bg, #4f46e5);
      color: var(--tc-chip-active-text, #fff);
      border-color: var(--tc-chip-active-bg, #4f46e5);
    }

    .tc-chip-active:hover {
      background-color: var(--tc-chip-active-bg, #4f46e5);
    }

    .tc-chip-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.375rem;
      font-size: 0.75rem;
      line-height: 1.125rem;
      border-radius: 9999px;
      background-color: var(--tc-chip-count-bg, #f5f5f5);
      min-width: 1.25rem;
    }

    .tc-chip-count-active {
      background-color: var(--tc-chip-count-active-bg, rgba(255, 255, 255, 0.2));
    }
  `]
})
export class TcFilterChipsComponent {
  @Input() chips: TcFilterChip[] = [];
  @Input() active = '';
  @Input() multi = false;

  @Output() chipChange = new EventEmitter<string>();

  private activeSet = new Set<string>();

  isActive(key: string): boolean {
    if (this.multi) {
      return this.activeSet.has(key);
    }
    return this.active === key;
  }

  onChipClick(key: string): void {
    if (this.multi) {
      if (this.activeSet.has(key)) {
        this.activeSet.delete(key);
      } else {
        this.activeSet.add(key);
      }
    } else {
      this.active = this.active === key ? '' : key;
    }
    this.chipChange.emit(key);
  }
}
