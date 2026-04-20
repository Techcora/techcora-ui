import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcModalComponent } from './tc-modal.component';
import { TcConfirmVariant } from './tc-modal.types';

@Component({
  selector: 'tc-confirm-modal',
  standalone: true,
  imports: [CommonModule, TcModalComponent],
  template: `
    <tc-modal [isOpen]="isOpen" [title]="title" size="sm" [showFooter]="false"
      (isOpenChange)="onOpenChange($event)" (closed)="onCancel()">
      <div class="tc-confirm-body">
        <div class="tc-confirm-icon-wrapper" [ngClass]="'tc-confirm-icon-' + variant">
          @switch (variant) {
            @case ('danger') {
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            }
            @case ('warning') {
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
            }
            @case ('info') {
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            }
            @case ('success') {
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            }
          }
        </div>
        @if (subtitle) { <h3 class="tc-confirm-subtitle">{{ subtitle }}</h3> }
        @if (message) { <p class="tc-confirm-message">{{ message }}</p> }
        <div class="tc-confirm-actions">
          <button type="button" class="tc-confirm-cancel-btn" (click)="onCancel()">{{ cancelText }}</button>
          <button type="button" class="tc-confirm-btn" [ngClass]="'tc-confirm-btn-' + variant"
            [disabled]="loading" (click)="onConfirm()">
            @if (loading) {
              <span class="tc-confirm-spinner"></span>
            }
            {{ confirmText }}
          </button>
        </div>
      </div>
    </tc-modal>
  `,
  styles: [`
    .tc-confirm-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1rem 0;
    }

    .tc-confirm-icon-wrapper {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .tc-confirm-icon-danger {
      background: #fef2f2;
      color: #dc2626;
    }

    .tc-confirm-icon-warning {
      background: #fffbeb;
      color: #d97706;
    }

    .tc-confirm-icon-info {
      background: #eff6ff;
      color: #2563eb;
    }

    .tc-confirm-icon-success {
      background: #f0fdf4;
      color: #16a34a;
    }

    .tc-confirm-subtitle {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.5rem;
    }

    .tc-confirm-message {
      font-size: 0.875rem;
      color: #737373;
      margin: 0 0 1.5rem;
    }

    .tc-confirm-actions {
      display: flex;
      gap: 0.75rem;
      width: 100%;
      justify-content: center;
    }

    .tc-confirm-cancel-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      cursor: pointer;
      font-family: inherit;
    }

    .tc-confirm-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      color: #fff;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-family: inherit;
    }

    .tc-confirm-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .tc-confirm-btn-danger { background: #dc2626; }
    .tc-confirm-btn-warning { background: #4f46e5; }
    .tc-confirm-btn-info { background: #4f46e5; }
    .tc-confirm-btn-success { background: #16a34a; }

    .tc-confirm-spinner {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: tc-confirm-spin 0.6s linear infinite;
    }

    @keyframes tc-confirm-spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class TcConfirmModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirm';
  @Input() subtitle?: string;
  @Input() message?: string;
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() variant: TcConfirmVariant = 'danger';
  @Input() loading = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onOpenChange(open: boolean): void {
    this.isOpen = open;
    this.isOpenChange.emit(open);
  }

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.cancelled.emit();
  }
}
