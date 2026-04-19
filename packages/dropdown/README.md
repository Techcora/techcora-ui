# @techcora/ui-dropdown

Themeable Angular dropdown component. No CSS framework or icon library dependency — bring your own via CSS custom properties and template projection.

## Install

```bash
npm install @techcora/ui-dropdown
```

## Basic Usage

```typescript
import { TcDropdownComponent, DropdownItem } from '@techcora/ui-dropdown';

@Component({
  imports: [TcDropdownComponent],
  template: `
    <tc-dropdown [items]="items" (itemSelected)="onSelect($event)">
      <button trigger>Actions</button>
    </tc-dropdown>
  `,
})
export class MyComponent {
  items: DropdownItem[] = [
    { label: 'Edit', value: 'edit' },
    { label: 'Delete', value: 'delete', danger: true },
  ];

  onSelect(item: DropdownItem) {
    console.log(item);
  }
}
```

See the [full documentation](../../README.md) for icons, theming, and all options.
