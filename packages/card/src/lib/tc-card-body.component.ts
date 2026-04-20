import { Component } from '@angular/core';

@Component({
  selector: 'tc-card-body',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class TcCardBodyComponent {}
