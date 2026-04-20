import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcToastService } from './tc-toast.service';

@Component({
  selector: 'tc-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tc-toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="tc-toast" [class]="'tc-toast--' + toast.type">
          <div class="tc-toast__icon" [class]="'tc-toast__icon--' + toast.type">
            @switch (toast.type) {
              @case ('success') {
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              }
              @case ('error') {
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
              }
              @case ('warning') {
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              }
              @case ('info') {
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              }
            }
          </div>
          <div class="tc-toast__content">
            <div class="tc-toast__title">{{ toast.title }}</div>
            @if (toast.message) {
              <div class="tc-toast__message">{{ toast.message }}</div>
            }
          </div>
          @if (toast.dismissible) {
            <button class="tc-toast__dismiss" (click)="toastService.dismiss(toast.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .tc-toast-container {
      position: fixed;
      top: var(--tc-toast-top, 1rem);
      right: var(--tc-toast-right, 1rem);
      z-index: var(--tc-toast-z-index, 100);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: var(--tc-toast-max-width, 24rem);
      width: 100%;
      pointer-events: none;
    }

    .tc-toast {
      pointer-events: auto;
      background: var(--tc-toast-bg, #fff);
      border-radius: var(--tc-toast-radius, 0.5rem);
      box-shadow: var(--tc-toast-shadow, 0 10px 15px rgba(0, 0, 0, 0.1));
      padding: 1rem;
      animation: tc-slide-in-right 0.3s ease-out;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      border-left: 4px solid transparent;
    }

    .tc-toast--success { border-left-color: var(--tc-toast-success-border, #bbf7d0); }
    .tc-toast--error { border-left-color: var(--tc-toast-error-border, #fecaca); }
    .tc-toast--warning { border-left-color: var(--tc-toast-warning-border, #fed7aa); }
    .tc-toast--info { border-left-color: var(--tc-toast-info-border, #bfdbfe); }

    .tc-toast__icon {
      flex-shrink: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tc-toast__icon--success { background: #f0fdf4; color: #16a34a; }
    .tc-toast__icon--error { background: #fef2f2; color: #dc2626; }
    .tc-toast__icon--warning { background: #fffbeb; color: #d97706; }
    .tc-toast__icon--info { background: #eff6ff; color: #2563eb; }

    .tc-toast__content {
      flex: 1;
      min-width: 0;
    }

    .tc-toast__title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--tc-toast-title-color, #171717);
    }

    .tc-toast__message {
      font-size: 0.875rem;
      color: var(--tc-toast-message-color, #737373);
      margin-top: 0.25rem;
    }

    .tc-toast__dismiss {
      flex-shrink: 0;
      padding: 0.25rem;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 0.25rem;
      color: #a3a3a3;
    }

    .tc-toast__dismiss:hover {
      color: #525252;
    }

    @keyframes tc-slide-in-right {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class TcToastContainerComponent {
  readonly toastService = inject(TcToastService);
}
