import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tc-content-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="tc-content-section"
      [ngClass]="{ 'tc-content-section-padded': padded }"
    >
      @if (title) {
        <div class="tc-content-section-header">
          <div>
            <h3 class="tc-content-section-title">{{ title }}</h3>
            @if (description) {
              <p class="tc-content-section-desc">{{ description }}</p>
            }
          </div>
          <div class="tc-content-section-actions">
            <ng-content select="[section-actions]"></ng-content>
          </div>
        </div>
      }
      <ng-content></ng-content>
    </section>
  `,
  styles: [`
    .tc-content-section {
      margin-bottom: 2rem;
    }

    .tc-content-section-padded {
      background: var(--tc-section-bg, #fff);
      border-radius: 0.5rem;
      border: 1px solid var(--tc-section-border, #e5e5e5);
      padding: 1.5rem;
    }

    .tc-content-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .tc-content-section-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #171717;
      margin: 0;
    }

    .tc-content-section-desc {
      font-size: 0.875rem;
      color: #737373;
      margin: 0.25rem 0 0;
    }
  `]
})
export class TcContentSectionComponent {
  @Input() title?: string;
  @Input() description?: string;
  @Input() padded = false;
}
