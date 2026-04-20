import { Component, Input } from '@angular/core';
import { TcLoadingComponent } from './tc-loading.component';

@Component({
  selector: 'tc-page-loading',
  standalone: true,
  imports: [TcLoadingComponent],
  template: `
    <div class="tc-page-loading">
      <tc-loading [text]="text" size="lg"></tc-loading>
    </div>
  `,
  styles: [`
    .tc-page-loading {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--tc-page-loading-bg, #fafafa);
    }
  `],
})
export class TcPageLoadingComponent {
  @Input() text: string = 'Loading...';
}
