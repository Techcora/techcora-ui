/**
 * Simple dropdown menu item.
 */
export interface SimpleDropdownItem {
  label: string;
  value?: string | number;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

/**
 * Rich dropdown item with type discriminator for headers, dividers, and detailed items.
 */
export type DropdownItem =
  | { type: 'item'; label: string; icon?: string; description?: string; disabled?: boolean; danger?: boolean; action?: () => void }
  | { type: 'header'; label: string }
  | { type: 'divider' }
  | SimpleDropdownItem;

/**
 * Supported dropdown positioning relative to the trigger element.
 */
export type DropdownPosition = 'bottom-left' | 'bottom-right' | 'bottom-end' | 'top-left' | 'top-right';

// ── Type guards ──

export function isRichItem(item: DropdownItem): item is { type: 'item'; label: string; icon?: string; description?: string; disabled?: boolean; danger?: boolean; action?: () => void } {
  return 'type' in item && item.type === 'item';
}

export function isHeader(item: DropdownItem): item is { type: 'header'; label: string } {
  return 'type' in item && item.type === 'header';
}

export function isDivider(item: DropdownItem): item is { type: 'divider' } {
  return ('type' in item && item.type === 'divider') || ('divider' in item && item.divider === true);
}
