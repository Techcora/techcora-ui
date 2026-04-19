import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Structural directive used to provide a custom icon template to the dropdown.
 *
 * The template receives the icon name and a size class string as context:
 *
 * ```html
 * <tc-dropdown [items]="items">
 *   <button trigger>Menu</button>
 *   <ng-template tcDropdownIcon let-name="name" let-size="size">
 *     <lucide-icon [name]="name" [class]="size"></lucide-icon>
 *   </ng-template>
 * </tc-dropdown>
 * ```
 */
@Directive({
  selector: 'ng-template[tcDropdownIcon]',
  standalone: true,
})
export class TcDropdownIconDirective {
  readonly templateRef = inject(TemplateRef<TcDropdownIconContext>);
}

export interface TcDropdownIconContext {
  /** The icon name string passed from the dropdown item */
  name: string;
  /** CSS class string for sizing, e.g. 'tc-dd-icon-sm' or 'tc-dd-icon-md' */
  size: string;
}
