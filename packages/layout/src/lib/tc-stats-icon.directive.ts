import { Directive, TemplateRef, inject } from '@angular/core';

export interface TcStatsIconContext {
  $implicit: string;
  icon: string;
}

@Directive({
  selector: 'ng-template[tcStatsIcon]',
  standalone: true,
})
export class TcStatsIconDirective {
  readonly templateRef = inject(TemplateRef<TcStatsIconContext>);
}
