import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcEmptyStateComponent } from './tc-empty-state.component';

@Component({
  selector: 'tc-no-results',
  standalone: true,
  imports: [CommonModule, TcEmptyStateComponent],
  template: `
    <tc-empty-state [title]="title" [description]="description" [compact]="compact">
      <ng-content select="[tc-empty-state-icon]" tc-empty-state-icon></ng-content>
      <ng-content></ng-content>
    </tc-empty-state>
  `
})
export class TcNoResultsComponent {
  @Input() title = 'No results found';
  @Input() description = 'Try adjusting your search or filters.';
  @Input() compact = false;
}
