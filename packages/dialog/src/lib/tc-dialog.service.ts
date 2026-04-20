import { Injectable, signal } from '@angular/core';
import { TcDialog, TcDialogOptions, TcDialogType } from './tc-dialog.types';

@Injectable({ providedIn: 'root' })
export class TcDialogService {
  private counter = 0;
  readonly dialogs = signal<TcDialog[]>([]);

  show(options: TcDialogOptions): string {
    const id = `dialog-${++this.counter}`;
    const dialog: TcDialog = {
      id,
      title: options.title,
      message: options.message,
      type: options.type ?? 'info',
      actions: options.actions,
      dismissible: options.dismissible ?? true,
    };

    this.dialogs.update((current) => [...current, dialog]);
    return id;
  }

  error(title: string, message: string): string {
    return this.show({ title, message, type: 'error' });
  }

  warning(title: string, message: string): string {
    return this.show({ title, message, type: 'warning' });
  }

  success(title: string, message: string): string {
    return this.show({ title, message, type: 'success' });
  }

  confirm(title: string, message: string, actions?: TcDialogOptions['actions']): string {
    return this.show({ title, message, type: 'confirm', actions });
  }

  dismiss(id: string): void {
    this.dialogs.update((current) => current.filter((d) => d.id !== id));
  }

  dismissAll(): void {
    this.dialogs.set([]);
  }
}
