import { Injectable, signal } from '@angular/core';
import { TcToast, TcToastType } from './tc-toast.types';

@Injectable({ providedIn: 'root' })
export class TcToastService {
  private counter = 0;
  readonly toasts = signal<TcToast[]>([]);

  show(toast: Omit<TcToast, 'id'>): string {
    const id = `toast-${++this.counter}`;
    const duration = toast.duration ?? (toast.type === 'error' ? 8000 : 5000);
    const dismissible = toast.dismissible ?? true;

    const newToast: TcToast = { ...toast, id, duration, dismissible };
    this.toasts.update((current) => [...current, newToast]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }

    return id;
  }

  success(title: string, message?: string): string {
    return this.show({ type: 'success', title, message });
  }

  error(title: string, message?: string): string {
    return this.show({ type: 'error', title, message });
  }

  warning(title: string, message?: string): string {
    return this.show({ type: 'warning', title, message });
  }

  info(title: string, message?: string): string {
    return this.show({ type: 'info', title, message });
  }

  dismiss(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }

  dismissAll(): void {
    this.toasts.set([]);
  }
}
