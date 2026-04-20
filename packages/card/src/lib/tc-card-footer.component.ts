import { Component } from '@angular/core';

@Component({
  selector: 'tc-card-footer',
  standalone: true,
  template: `
    <div class="tc-card-footer">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tc-card-footer {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--tc-card-border, #e5e5e5);
    }
  `]
})
export class TcCardFooterComponent {}
