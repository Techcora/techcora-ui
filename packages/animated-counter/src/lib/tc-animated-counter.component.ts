import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  signal,
} from '@angular/core';

@Component({
  selector: 'tc-animated-counter',
  standalone: true,
  template: `{{ displayValue() }}`,
  styles: [`:host { display: inline; }`],
})
export class TcAnimatedCounterComponent implements OnChanges, OnDestroy {
  @Input() value = 0;
  @Input() duration = 800;
  @Input() locale?: string;
  @Input() formatter?: (value: number) => string;

  displayValue = signal('0');

  private animationFrame: number | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.animateTo(changes['value'].currentValue);
    }
  }

  private animateTo(target: number) {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }

    const start = performance.now();
    const startValue = 0;
    const duration = this.duration;

    const step = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (target - startValue) * eased);

      if (this.formatter) {
        this.displayValue.set(this.formatter(current));
      } else if (this.locale) {
        this.displayValue.set(current.toLocaleString(this.locale));
      } else {
        this.displayValue.set(current.toLocaleString());
      }

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(step);
      } else {
        this.animationFrame = null;
      }
    };

    this.animationFrame = requestAnimationFrame(step);
  }

  ngOnDestroy() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
