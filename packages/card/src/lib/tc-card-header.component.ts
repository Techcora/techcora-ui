import { Component } from '@angular/core';

@Component({
  selector: 'tc-card-header',
  standalone: true,
  template: `
    <div class="tc-card-header">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tc-card-header {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--tc-card-border, #e5e5e5);
    }
  `]
})
export class TcCardHeaderComponent {}
