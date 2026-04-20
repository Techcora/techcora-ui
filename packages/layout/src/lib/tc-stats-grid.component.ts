import { Component, ContentChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcStatItem } from './tc-layout.types';
import { TcStatsIconDirective } from './tc-stats-icon.directive';

@Component({
  selector: 'tc-stats-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tc-stats-grid">
      @for (stat of stats; track stat.label) {
        <div class="tc-stat-card">
          @if (stat.icon && iconTemplate) {
            <div
              class="tc-stat-icon"
              [style.background-color]="stat.bgColor"
              [style.color]="stat.iconColor"
            >
              <ng-container
                *ngTemplateOutlet="iconTemplate.templateRef; context: { $implicit: stat.icon, icon: stat.icon }"
              ></ng-container>
            </div>
          }
          <div class="tc-stat-content">
            <p class="tc-stat-label">{{ stat.label }}</p>
            <p class="tc-stat-value">{{ formatValue(stat.value) }}</p>
            @if (stat.change) {
              <p
                class="tc-stat-change"
                [ngClass]="{
                  'tc-stat-trend-up': stat.changeType === 'positive' || stat.trendDirection === 'up',
                  'tc-stat-trend-down': stat.changeType === 'negative' || stat.trendDirection === 'down'
                }"
              >
                @if (stat.trend) {
                  <span>{{ stat.trend }}</span>
                }
                {{ stat.change }}
              </p>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .tc-stats-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr;
    }

    @media (min-width: 640px) {
      .tc-stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .tc-stats-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1280px) {
      .tc-stats-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .tc-stat-card {
      background: var(--tc-stat-bg, #fff);
      border-radius: var(--tc-stat-radius, 0.5rem);
      border: 1px solid var(--tc-stat-border, #e5e5e5);
      padding: 1.25rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      transition: box-shadow 0.15s;
    }

    .tc-stat-card:hover {
      box-shadow: var(--tc-stat-hover-shadow, 0 4px 6px rgba(0, 0, 0, 0.07));
    }

    .tc-stat-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .tc-stat-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--tc-stat-value-color, #171717);
      margin: 0;
    }

    .tc-stat-label {
      font-size: 0.875rem;
      color: var(--tc-stat-label-color, #737373);
      margin: 0;
    }

    .tc-stat-change {
      font-size: 0.75rem;
      margin-top: 0.25rem;
      margin-bottom: 0;
    }

    .tc-stat-trend-up {
      color: var(--tc-stat-trend-up, #16a34a);
    }

    .tc-stat-trend-down {
      color: var(--tc-stat-trend-down, #dc2626);
    }
  `]
})
export class TcStatsGridComponent {
  @Input() stats: TcStatItem[] = [];
  @ContentChild(TcStatsIconDirective) iconTemplate?: TcStatsIconDirective;

  formatValue(value: string | number): string {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  }
}
