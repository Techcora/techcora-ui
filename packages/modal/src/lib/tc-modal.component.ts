import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcModalSize } from './tc-modal.types';

@Component({
  selector: 'tc-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="tc-modal-backdrop" (click)="onBackdropClick()">
        <div class="tc-modal" [ngClass]="'tc-modal-' + size" (click)="$event.stopPropagation()">
          <div class="tc-modal-header">
            <h2 class="tc-modal-title">{{ title }}</h2>
            @if (showClose) {
              <button type="button" class="tc-modal-close-btn" (click)="close()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            }
          </div>
          <div class="tc-modal-body" [class.tc-modal-body-scrollable]="scrollable">
            <ng-content></ng-content>
          </div>
          @if (showFooter) {
            <div class="tc-modal-footer">
              <ng-content select="[tc-modal-footer]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .tc-modal-backdrop {
      position: fixed;
      inset: 0;
      background: var(--tc-modal-backdrop, rgba(0, 0, 0, 0.5));
      z-index: var(--tc-modal-z-index, 50);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tc-modal {
      background: var(--tc-modal-bg, #fff);
      border-radius: var(--tc-modal-radius, 0.75rem);
      box-shadow: var(--tc-modal-shadow, 0 25px 50px rgba(0, 0, 0, 0.25));
      width: 100%;
      margin: 1rem;
    }

    .tc-modal-sm { max-width: 24rem; }
    .tc-modal-md { max-width: 32rem; }
    .tc-modal-lg { max-width: 42rem; }
    .tc-modal-xl { max-width: 56rem; }
    .tc-modal-full { max-width: 90vw; max-height: 90vh; }

    .tc-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid var(--tc-modal-border, #e5e5e5);
    }

    .tc-modal-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
    }

    .tc-modal-close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border: none;
      background: none;
      border-radius: 0.375rem;
      cursor: pointer;
      color: var(--tc-modal-close-color, #737373);
    }

    .tc-modal-close-btn:hover {
      background: var(--tc-modal-close-hover-bg, #f5f5f5);
    }

    .tc-modal-body {
      padding: 1.5rem;
    }

    .tc-modal-body-scrollable {
      max-height: 60vh;
      overflow-y: auto;
    }

    .tc-modal-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--tc-modal-border, #e5e5e5);
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }
  `]
})
export class TcModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: TcModalSize = 'md';
  @Input() showClose = true;
  @Input() showFooter = true;
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;
  @Input() scrollable = true;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen && this.closeOnEscape) {
      this.close();
    }
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.closed.emit();
  }
}
