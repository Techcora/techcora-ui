import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcTabItem } from './tc-tab-nav.types';

@Component({
  selector: 'tc-tab-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tc-tab-wrapper" [class.tc-tab-sticky]="sticky">
      <div class="tc-tab-scroll">
        <nav class="tc-tab-nav" role="tablist">
          @for (tab of tabs; track tab.key) {
            <button type="button" role="tab" [attr.aria-selected]="activeTab === tab.key"
              class="tc-tab-item" [class.tc-tab-item-active]="activeTab === tab.key"
              (click)="selectTab(tab)">
              <span>{{ tab.label }}</span>
              @if (tab.count !== undefined) {
                <span class="tc-tab-count" [class.tc-tab-count-active]="activeTab === tab.key">{{ tab.count }}</span>
              }
            </button>
          }
        </nav>
      </div>
    </div>
  `,
  styles: [`
    .tc-tab-wrapper {
      background: var(--tc-tab-bg, #fff);
      border-bottom: 1px solid var(--tc-tab-border, #e5e5e5);
      z-index: 10;
    }

    .tc-tab-sticky {
      position: sticky;
      top: var(--tc-tab-sticky-top, 0);
    }

    .tc-tab-scroll {
      overflow-x: auto;
    }

    .tc-tab-nav {
      display: flex;
      gap: 0.25rem;
      padding: 0 0.5rem;
      min-width: max-content;
    }

    .tc-tab-item {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      font-size: var(--tc-tab-font-size, 0.875rem);
      font-weight: 500;
      color: var(--tc-tab-text, #737373);
      border-bottom: 2px solid transparent;
      border-top: none;
      border-left: none;
      border-right: none;
      transition: color 0.15s ease, border-bottom-color 0.15s ease;
      white-space: nowrap;
      background: none;
      cursor: pointer;
      font-family: inherit;
    }

    .tc-tab-item:hover {
      color: var(--tc-tab-hover-text, #404040);
      border-bottom-color: var(--tc-tab-hover-border, #d4d4d4);
    }

    .tc-tab-item-active {
      color: var(--tc-tab-active-text, #4f46e5);
      border-bottom-color: var(--tc-tab-active-border, #4f46e5);
    }

    .tc-tab-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding: 0 0.375rem;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 9999px;
      background: var(--tc-tab-count-bg, #f5f5f5);
      color: var(--tc-tab-count-text, #525252);
    }

    .tc-tab-count-active {
      background: var(--tc-tab-count-active-bg, #eef2ff);
      color: var(--tc-tab-count-active-text, #4338ca);
    }
  `]
})
export class TcTabNavComponent {
  @Input() tabs: TcTabItem[] = [];
  @Input() activeTab = '';
  @Input() sticky = false;
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tab: TcTabItem): void {
    this.tabChange.emit(tab.key);
  }
}
