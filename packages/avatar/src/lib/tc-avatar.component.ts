import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcAvatarSize, TcAvatarVariant } from './tc-avatar.types';

@Component({
  selector: 'tc-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tc-avatar"
         role="img"
         [attr.aria-label]="ariaLabel || name || 'Avatar'"
         [ngClass]="[sizeClass, variantClass]"
         [class.tc-avatar-ring]="ring">

      <img *ngIf="src && !imgError"
           [src]="src"
           [alt]="name || 'Avatar'"
           class="tc-avatar-img"
           (error)="onImgError()" />

      <span *ngIf="!src || imgError"
            class="tc-avatar-initials">
        {{ initials }}
      </span>

      <span *ngIf="status"
            class="tc-avatar-status"
            [ngClass]="'tc-avatar-status-' + status">
      </span>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .tc-avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      overflow: visible;
      font-weight: 500;
      user-select: none;
      flex-shrink: 0;
    }

    /* Sizes */
    .tc-avatar-xs {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.625rem;
    }

    .tc-avatar-sm {
      width: 2rem;
      height: 2rem;
      font-size: 0.75rem;
    }

    .tc-avatar-md {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0.875rem;
    }

    .tc-avatar-lg {
      width: 3rem;
      height: 3rem;
      font-size: 1rem;
    }

    .tc-avatar-xl {
      width: 4rem;
      height: 4rem;
      font-size: 1.25rem;
    }

    /* Variants */
    .tc-avatar-primary {
      background-color: var(--tc-avatar-primary-bg, #eef2ff);
      color: var(--tc-avatar-primary-text, #4338ca);
    }

    .tc-avatar-secondary {
      background-color: var(--tc-avatar-secondary-bg, #f5f5f5);
      color: var(--tc-avatar-secondary-text, #525252);
    }

    .tc-avatar-success {
      background-color: var(--tc-avatar-success-bg, #f0fdf4);
      color: var(--tc-avatar-success-text, #166534);
    }

    .tc-avatar-warning {
      background-color: var(--tc-avatar-warning-bg, #fffbeb);
      color: var(--tc-avatar-warning-text, #92400e);
    }

    .tc-avatar-danger {
      background-color: var(--tc-avatar-danger-bg, #fef2f2);
      color: var(--tc-avatar-danger-text, #991b1b);
    }

    /* Ring */
    .tc-avatar-ring {
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--tc-avatar-ring-color, #e5e7eb);
    }

    /* Image */
    .tc-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 9999px;
    }

    /* Initials */
    .tc-avatar-initials {
      line-height: 1;
      white-space: nowrap;
    }

    /* Status indicator */
    .tc-avatar-status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 25%;
      height: 25%;
      min-width: 0.5rem;
      min-height: 0.5rem;
      border-radius: 9999px;
      border: 2px solid #fff;
      box-sizing: content-box;
    }

    .tc-avatar-status-online {
      background-color: var(--tc-avatar-status-online, #22c55e);
    }

    .tc-avatar-status-offline {
      background-color: var(--tc-avatar-status-offline, #a3a3a3);
    }

    .tc-avatar-status-busy {
      background-color: var(--tc-avatar-status-busy, #ef4444);
    }

    .tc-avatar-status-away {
      background-color: var(--tc-avatar-status-away, #f59e0b);
    }
  `]
})
export class TcAvatarComponent {
  @Input() src?: string;
  @Input() name?: string;
  @Input() size: TcAvatarSize = 'md';
  @Input() variant: TcAvatarVariant = 'primary';
  @Input() status?: 'online' | 'offline' | 'busy' | 'away';
  @Input() ring = false;
  @Input() ariaLabel?: string;

  imgError = false;

  get sizeClass(): string {
    return `tc-avatar-${this.size}`;
  }

  get variantClass(): string {
    return `tc-avatar-${this.variant}`;
  }

  get initials(): string {
    if (!this.name) return '?';
    return this.name
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  onImgError(): void {
    this.imgError = true;
  }
}
