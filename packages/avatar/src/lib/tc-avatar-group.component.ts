import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tc-avatar-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tc-avatar-group">
      <ng-content></ng-content>
      <div *ngIf="overflow > 0"
           class="tc-avatar-overflow"
           [ngClass]="'tc-avatar-overflow-' + size"
           role="img"
           [attr.aria-label]="'+' + overflow + ' more'">
        +{{ overflow }}
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .tc-avatar-group {
      display: flex;
      align-items: center;
    }

    .tc-avatar-group ::ng-deep tc-avatar:not(:first-child) {
      margin-left: -0.5rem;
    }

    .tc-avatar-group ::ng-deep tc-avatar .tc-avatar {
      box-shadow: 0 0 0 2px #fff;
    }

    .tc-avatar-overflow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      background-color: var(--tc-avatar-overflow-bg, #f5f5f5);
      color: var(--tc-avatar-overflow-text, #525252);
      font-weight: 500;
      margin-left: -0.5rem;
      box-shadow: 0 0 0 2px #fff;
      flex-shrink: 0;
    }

    .tc-avatar-overflow-xs {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.5rem;
    }

    .tc-avatar-overflow-sm {
      width: 2rem;
      height: 2rem;
      font-size: 0.625rem;
    }

    .tc-avatar-overflow-md {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0.75rem;
    }

    .tc-avatar-overflow-lg {
      width: 3rem;
      height: 3rem;
      font-size: 0.875rem;
    }

    .tc-avatar-overflow-xl {
      width: 4rem;
      height: 4rem;
      font-size: 1rem;
    }
  `]
})
export class TcAvatarGroupComponent {
  @Input() overflow = 0;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}
