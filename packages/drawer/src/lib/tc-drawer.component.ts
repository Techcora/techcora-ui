import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcDrawerWidth } from './tc-drawer.types';

@Component({
  selector: 'tc-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="tc-drawer-backdrop" (click)="close()"></div>
      <div
        class="tc-drawer-panel"
        [ngClass]="'tc-drawer-' + width"
        role="dialog"
        aria-modal="true"
      >
        <div class="tc-drawer-header">
          <h2 class="tc-drawer-title">{{ title }}</h2>
          <button class="tc-drawer-close" (click)="close()" aria-label="Close drawer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div class="tc-drawer-body">
          <ng-content></ng-content>
        </div>
        <div class="tc-drawer-footer">
          <ng-content select="[tc-drawer-footer]"></ng-content>
        </div>
      </div>
    }
  `,
  styles: [`
    .tc-drawer-backdrop {
      position: fixed;
      inset: 0;
      background: var(--tc-drawer-backdrop, rgba(23, 23, 23, 0.4));
      backdrop-filter: blur(4px);
      z-index: var(--tc-drawer-z-index, 50);
    }

    .tc-drawer-panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      background: var(--tc-drawer-bg, #fff);
      border-left: 1px solid var(--tc-drawer-border, #e5e5e5);
      box-shadow: var(--tc-drawer-shadow, -4px 0 24px rgba(0, 0, 0, 0.1));
      display: flex;
      flex-direction: column;
      height: 100%;
      z-index: calc(var(--tc-drawer-z-index, 50) + 1);
      animation: tc-slide-in-right 0.2s ease-out;
    }

    .tc-drawer-sm {
      width: var(--tc-drawer-width-sm, 380px);
      max-width: 90vw;
    }

    .tc-drawer-md {
      width: var(--tc-drawer-width-md, 520px);
      max-width: 90vw;
    }

    .tc-drawer-lg {
      width: var(--tc-drawer-width-lg, 680px);
      max-width: 90vw;
    }

    .tc-drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--tc-drawer-border, #e5e5e5);
      flex-shrink: 0;
    }

    .tc-drawer-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--tc-drawer-title-color, #171717);
      margin: 0;
    }

    .tc-drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 1.5rem;
    }

    .tc-drawer-footer {
      flex-shrink: 0;
    }

    .tc-drawer-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      color: var(--tc-drawer-close-color, #a3a3a3);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tc-drawer-close:hover {
      color: #525252;
    }

    @keyframes tc-slide-in-right {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }
  `],
})
export class TcDrawerComponent {
  @Input() isOpen: boolean = false;
  @Input() width: TcDrawerWidth = 'md';
  @Input() title: string = '';

  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }
}
