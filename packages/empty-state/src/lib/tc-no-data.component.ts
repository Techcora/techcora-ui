import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcEmptyStateComponent } from './tc-empty-state.component';

@Component({
  selector: 'tc-no-data',
  standalone: true,
  imports: [CommonModule, TcEmptyStateComponent],
  template: `
    <tc-empty-state [title]="title" [description]="description" [variant]="'primary'" [compact]="compact">
      <ng-content select="[tc-empty-state-icon]" tc-empty-state-icon></ng-content>
      <ng-content></ng-content>
    </tc-empty-state>
  `
})
export class TcNoDataComponent {
  @Input() title = 'No data yet';
  @Input() description = 'Get started by creating your first item.';
  @Input() compact = false;
}
