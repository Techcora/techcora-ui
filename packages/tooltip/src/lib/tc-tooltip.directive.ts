import { Directive, ElementRef, HostListener, Input, OnDestroy, inject } from '@angular/core';

export type TcTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[tcTooltip]',
  standalone: true,
})
export class TcTooltipDirective implements OnDestroy {
  @Input('tcTooltip') tooltipContent = '';
  @Input() tcTooltipPlacement: TcTooltipPlacement = 'top';
  @Input() tcTooltipDelay = 300;

  private static nextId = 0;

  private el = inject(ElementRef);
  private tooltipElement: HTMLElement | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;
  private tooltipId = `tc-tooltip-${TcTooltipDirective.nextId++}`;

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTimeout = setTimeout(() => {
      this.hide();
    }, this.tcTooltipDelay);
  }

  @HostListener('focus')
  onFocus() {
    this.show();
  }

  @HostListener('blur')
  onBlur() {
    this.hide();
  }

  private show() {
    if (!this.tooltipContent) return;

    this.create();
    this.setPosition();

    this.el.nativeElement.setAttribute('aria-describedby', this.tooltipId);
  }

  private hide() {
    if (this.tooltipElement) {
      this.tooltipElement.style.opacity = '0';
      setTimeout(() => {
        if (this.tooltipElement?.parentNode) {
          this.tooltipElement.parentNode.removeChild(this.tooltipElement);
        }
        this.tooltipElement = null;
      }, 150);
    }
    this.el.nativeElement.removeAttribute('aria-describedby');
  }

  private create() {
    if (this.tooltipElement) return;

    this.tooltipElement = document.createElement('div');
    this.tooltipElement.id = this.tooltipId;
    this.tooltipElement.setAttribute('role', 'tooltip');
    this.tooltipElement.textContent = this.tooltipContent;

    Object.assign(this.tooltipElement.style, {
      position: 'absolute',
      zIndex: 'var(--tc-tooltip-z-index, 10000)',
      padding: 'var(--tc-tooltip-padding, 8px 12px)',
      backgroundColor: 'var(--tc-tooltip-bg, #1a202c)',
      color: 'var(--tc-tooltip-color, #ffffff)',
      borderRadius: 'var(--tc-tooltip-radius, 6px)',
      fontSize: 'var(--tc-tooltip-font-size, 12px)',
      fontWeight: 'var(--tc-tooltip-font-weight, 500)',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.15s ease-in-out',
      boxShadow: 'var(--tc-tooltip-shadow, 0 4px 12px rgba(0, 0, 0, 0.25))',
      maxWidth: 'var(--tc-tooltip-max-width, 300px)',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
    });

    document.body.appendChild(this.tooltipElement);
  }

  private setPosition() {
    if (!this.tooltipElement) return;

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    let top = 0;
    let left = 0;
    const offset = 10;

    switch (this.tcTooltipPlacement) {
      case 'top':
        top = hostPos.top - tooltipPos.height - offset;
        left = hostPos.left + hostPos.width / 2 - tooltipPos.width / 2;
        break;
      case 'bottom':
        top = hostPos.bottom + offset;
        left = hostPos.left + hostPos.width / 2 - tooltipPos.width / 2;
        break;
      case 'left':
        top = hostPos.top + hostPos.height / 2 - tooltipPos.height / 2;
        left = hostPos.left - tooltipPos.width - offset;
        break;
      case 'right':
        top = hostPos.top + hostPos.height / 2 - tooltipPos.height / 2;
        left = hostPos.right + offset;
        break;
    }

    const padding = 10;
    if (left < padding) {
      left = padding;
    }
    if (left + tooltipPos.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipPos.width - padding;
    }
    if (top < padding) {
      top = padding;
    }

    this.tooltipElement.style.top = `${top + window.scrollY}px`;
    this.tooltipElement.style.left = `${left + window.scrollX}px`;
    this.tooltipElement.style.opacity = '1';
  }

  ngOnDestroy() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    if (this.tooltipElement?.parentNode) {
      this.tooltipElement.parentNode.removeChild(this.tooltipElement);
    }
  }
}
