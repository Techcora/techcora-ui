import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ContentChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DropdownItem,
  DropdownPosition,
  SimpleDropdownItem,
  isRichItem,
  isHeader,
  isDivider,
} from './tc-dropdown.types';
import { TcDropdownIconDirective } from './tc-dropdown-icon.directive';

@Component({
  selector: 'tc-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tc-dd-wrapper">
      <!-- Trigger -->
      <div (click)="toggle()" class="tc-dd-trigger">
        <ng-content select="[trigger]"></ng-content>
      </div>

      <!-- Dropdown Menu -->
      @if (isOpen()) {
        <div
          class="tc-dd-menu"
          [class.tc-dd-bottom-left]="position === 'bottom-left'"
          [class.tc-dd-bottom-right]="position === 'bottom-right' || position === 'bottom-end'"
          [class.tc-dd-top-left]="position === 'top-left'"
          [class.tc-dd-top-right]="position === 'top-right'"
          [style.min-width]="minWidth"
          role="menu"
          [attr.aria-label]="ariaLabel"
        >
          @for (item of items; track trackItem($index, item)) {
            @if (isDividerItem(item)) {
              <div class="tc-dd-divider" role="separator"></div>
            } @else if (isHeaderItem(item)) {
              <div class="tc-dd-header" role="presentation">
                <p>{{ item.label }}</p>
              </div>
            } @else if (isRichItemType(item)) {
              <button
                type="button"
                class="tc-dd-item-rich"
                [class.tc-dd-danger]="item.danger"
                [class.tc-dd-disabled]="item.disabled"
                [disabled]="item.disabled"
                [attr.aria-disabled]="item.disabled || null"
                role="menuitem"
                (click)="onRichItemClick(item)"
              >
                @if (item.icon && iconTemplate) {
                  <ng-container
                    *ngTemplateOutlet="iconTemplate.templateRef; context: { name: item.icon, size: 'tc-dd-icon-md' }"
                  ></ng-container>
                }
                <div class="tc-dd-item-content">
                  <p class="tc-dd-item-label">{{ item.label }}</p>
                  @if (item.description) {
                    <p class="tc-dd-item-desc">{{ item.description }}</p>
                  }
                </div>
              </button>
            } @else {
              <button
                type="button"
                class="tc-dd-item"
                [class.tc-dd-danger]="item.danger"
                [class.tc-dd-disabled]="item.disabled"
                [disabled]="item.disabled"
                [attr.aria-disabled]="item.disabled || null"
                role="menuitem"
                (click)="onItemClick(item)"
              >
                @if (item.icon && iconTemplate) {
                  <ng-container
                    *ngTemplateOutlet="iconTemplate.templateRef; context: { name: item.icon, size: 'tc-dd-icon-sm' }"
                  ></ng-container>
                }
                <span>{{ item.label }}</span>
              </button>
            }
          }

          <!-- Custom content slot -->
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    /* ── CSS Custom Properties (defaults match original component) ── */

    :host {
      --tc-dd-bg: #ffffff;
      --tc-dd-border: #e5e5e5;
      --tc-dd-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
      --tc-dd-radius: 0.5rem;
      --tc-dd-z-index: 50;
      --tc-dd-py: 0.25rem;

      --tc-dd-item-text: #404040;
      --tc-dd-item-hover-bg: #fafafa;
      --tc-dd-item-px: 1rem;
      --tc-dd-item-py: 0.5rem;
      --tc-dd-item-font-size: 0.875rem;
      --tc-dd-item-gap: 0.75rem;

      --tc-dd-item-rich-py: 0.625rem;

      --tc-dd-header-text: #737373;
      --tc-dd-header-font-size: 0.75rem;

      --tc-dd-divider-color: #e5e5e5;

      --tc-dd-danger-text: #dc2626;
      --tc-dd-danger-hover-bg: #fef2f2;

      --tc-dd-desc-text: #737373;
      --tc-dd-desc-font-size: 0.75rem;

      --tc-dd-disabled-opacity: 0.5;

      --tc-dd-label-font-weight: 500;

      display: inline-block;
    }

    /* ── Layout ── */

    .tc-dd-wrapper {
      position: relative;
      display: inline-block;
    }

    .tc-dd-trigger {
      cursor: pointer;
    }

    /* ── Menu panel ── */

    .tc-dd-menu {
      position: absolute;
      margin-top: 0.5rem;
      background: var(--tc-dd-bg);
      border-radius: var(--tc-dd-radius);
      box-shadow: var(--tc-dd-shadow);
      border: 1px solid var(--tc-dd-border);
      z-index: var(--tc-dd-z-index);
      padding: var(--tc-dd-py) 0;
      overflow: hidden;
      box-sizing: border-box;
    }

    /* ── Positioning ── */

    .tc-dd-bottom-left  { left: 0;  top: 100%; }
    .tc-dd-bottom-right { right: 0; top: 100%; }
    .tc-dd-top-left     { left: 0;  bottom: 100%; margin-top: 0; margin-bottom: 0.5rem; }
    .tc-dd-top-right    { right: 0; bottom: 100%; margin-top: 0; margin-bottom: 0.5rem; }

    /* ── Simple item ── */

    .tc-dd-item {
      display: flex;
      align-items: center;
      gap: var(--tc-dd-item-gap);
      padding: var(--tc-dd-item-py) var(--tc-dd-item-px);
      font-size: var(--tc-dd-item-font-size);
      color: var(--tc-dd-item-text);
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      transition: background-color 0.15s ease;
      box-sizing: border-box;
      font-family: inherit;
      line-height: 1.5;
    }

    .tc-dd-item:hover:not(:disabled) {
      background-color: var(--tc-dd-item-hover-bg);
    }

    /* ── Rich item ── */

    .tc-dd-item-rich {
      display: flex;
      align-items: center;
      gap: var(--tc-dd-item-gap);
      padding: var(--tc-dd-item-rich-py) var(--tc-dd-item-px);
      color: var(--tc-dd-item-text);
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      transition: background-color 0.15s ease;
      box-sizing: border-box;
      font-family: inherit;
      line-height: 1.5;
    }

    .tc-dd-item-rich:hover:not(:disabled) {
      background-color: var(--tc-dd-item-hover-bg);
    }

    .tc-dd-item-content {
      flex: 1;
      min-width: 0;
    }

    .tc-dd-item-label {
      font-weight: var(--tc-dd-label-font-weight);
      font-size: var(--tc-dd-item-font-size);
      margin: 0;
    }

    .tc-dd-item-desc {
      font-size: var(--tc-dd-desc-font-size);
      color: var(--tc-dd-desc-text);
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ── Header ── */

    .tc-dd-header {
      padding: var(--tc-dd-item-py) var(--tc-dd-item-px);
    }

    .tc-dd-header p {
      font-size: var(--tc-dd-header-font-size);
      font-weight: 600;
      color: var(--tc-dd-header-text);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0;
    }

    /* ── Divider ── */

    .tc-dd-divider {
      border-top: 1px solid var(--tc-dd-divider-color);
      margin: 0.25rem 0;
    }

    /* ── Danger variant ── */

    .tc-dd-danger {
      color: var(--tc-dd-danger-text) !important;
    }

    .tc-dd-danger:hover:not(:disabled) {
      background-color: var(--tc-dd-danger-hover-bg) !important;
    }

    /* ── Disabled state ── */

    .tc-dd-disabled {
      opacity: var(--tc-dd-disabled-opacity);
      cursor: not-allowed !important;
    }
  `],
})
export class TcDropdownComponent {
  private elementRef = inject(ElementRef);

  @ContentChild(TcDropdownIconDirective) iconTemplate?: TcDropdownIconDirective;

  @Input() items: DropdownItem[] = [];
  @Input() position: DropdownPosition = 'bottom-right';
  @Input() minWidth = '200px';
  @Input() closeOnSelect = true;
  @Input() ariaLabel = 'Dropdown menu';

  @Output() itemSelected = new EventEmitter<DropdownItem>();

  isOpen = signal(false);

  // Template helpers
  isDividerItem = isDivider;
  isHeaderItem = isHeader;
  isRichItemType = isRichItem;

  trackItem(index: number, item: DropdownItem): string {
    if ('type' in item) {
      if (item.type === 'divider') return `divider-${index}`;
      if (item.type === 'header') return `header-${item.label}`;
      return `item-${item.label}`;
    }
    if (item.divider) return `divider-${index}`;
    return `item-${item.label}`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    this.close();
  }

  toggle() {
    this.isOpen.update(v => !v);
  }

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  onItemClick(item: SimpleDropdownItem) {
    if (item.disabled) return;
    this.itemSelected.emit(item);
    if (this.closeOnSelect) this.close();
  }

  onRichItemClick(item: { type: 'item'; label: string; icon?: string; description?: string; disabled?: boolean; danger?: boolean; action?: () => void }) {
    if (item.disabled) return;
    if (item.action) item.action();
    this.itemSelected.emit(item);
    if (this.closeOnSelect) this.close();
  }
}
