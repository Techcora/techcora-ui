import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcDialogService } from './tc-dialog.service';

@Component({
  selector: 'tc-dialog-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (dialog of dialogService.dialogs(); track dialog.id) {
      <div class="tc-dialog-backdrop" (click)="dialog.dismissible ? dialogService.dismiss(dialog.id) : null"></div>
      <div class="tc-dialog-wrapper">
        <div class="tc-dialog" (click)="$event.stopPropagation()">
          <div class="tc-dialog__header">
            <div class="tc-dialog__icon" [class]="'tc-dialog__icon--' + dialog.type">
              @switch (dialog.type) {
                @case ('error') {
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                }
                @case ('warning') {
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                }
                @case ('success') {
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                }
                @case ('info') {
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                }
                @case ('confirm') {
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                }
              }
            </div>
            <div class="tc-dialog__text">
              <h3 class="tc-dialog__title">{{ dialog.title }}</h3>
              <p class="tc-dialog__message">{{ dialog.message }}</p>
            </div>
            @if (dialog.dismissible) {
              <button class="tc-dialog__close" (click)="dialogService.dismiss(dialog.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            }
          </div>
          @if (dialog.actions && dialog.actions.length > 0) {
            <div class="tc-dialog__actions">
              @for (action of dialog.actions; track action.label) {
                <button
                  class="tc-dialog__btn"
                  [class]="'tc-dialog__btn--' + (action.style || 'secondary')"
                  (click)="action.onClick(); dialogService.dismiss(dialog.id)"
                >
                  {{ action.label }}
                </button>
              }
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .tc-dialog-backdrop {
      position: fixed;
      inset: 0;
      background: var(--tc-dialog-backdrop, rgba(0, 0, 0, 0.5));
      backdrop-filter: blur(4px);
      z-index: 40;
    }

    .tc-dialog-wrapper {
      position: fixed;
      inset: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .tc-dialog {
      pointer-events: auto;
      background: var(--tc-dialog-bg, #fff);
      border-radius: var(--tc-dialog-radius, 0.5rem);
      box-shadow: var(--tc-dialog-shadow, 0 25px 50px rgba(0, 0, 0, 0.25));
      max-width: 24rem;
      width: 100%;
      margin: 1rem;
      overflow: hidden;
      animation: tc-scale-in 0.2s ease-out;
    }

    .tc-dialog__header {
      padding: 1.5rem 1.5rem 1rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .tc-dialog__icon {
      flex-shrink: 0;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tc-dialog__icon--error { background: #fef2f2; color: #dc2626; }
    .tc-dialog__icon--warning { background: #fffbeb; color: #d97706; }
    .tc-dialog__icon--success { background: #f0fdf4; color: #16a34a; }
    .tc-dialog__icon--info { background: #eff6ff; color: #2563eb; }
    .tc-dialog__icon--confirm { background: #fff7ed; color: #ea580c; }

    .tc-dialog__text {
      flex: 1;
      min-width: 0;
    }

    .tc-dialog__title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--tc-dialog-title-color, #171717);
      margin: 0;
    }

    .tc-dialog__message {
      font-size: 0.875rem;
      color: var(--tc-dialog-message-color, #737373);
      margin: 0.5rem 0 0;
      line-height: 1.5;
    }

    .tc-dialog__close {
      flex-shrink: 0;
      padding: 0.25rem;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 0.25rem;
      color: #a3a3a3;
    }

    .tc-dialog__close:hover {
      color: #525252;
    }

    .tc-dialog__actions {
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--tc-dialog-border, #e5e5e5);
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    .tc-dialog__btn {
      padding: 0.5rem 1rem;
      font-weight: 500;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.15s ease;
    }

    .tc-dialog__btn--primary {
      background: #2563eb;
      color: white;
    }

    .tc-dialog__btn--primary:hover {
      background: #1d4ed8;
    }

    .tc-dialog__btn--secondary {
      background: #e5e5e5;
      color: #171717;
    }

    .tc-dialog__btn--secondary:hover {
      background: #d4d4d4;
    }

    .tc-dialog__btn--danger {
      background: #dc2626;
      color: white;
    }

    .tc-dialog__btn--danger:hover {
      background: #b91c1c;
    }

    @keyframes tc-scale-in {
      from {
        transform: scale(0.95);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  `]
})
export class TcDialogContainerComponent {
  readonly dialogService = inject(TcDialogService);
}
