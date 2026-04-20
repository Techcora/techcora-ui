import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tc-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="tc-page-header">
      <div class="tc-page-header-container">
        <div class="tc-page-header-inner">
          <div class="tc-page-header-left">
            @if (backLink) {
              <a [routerLink]="backLink" class="tc-page-header-back">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              </a>
            }
            <div>
              <h1 class="tc-page-header-title">{{ title }}</h1>
              @if (subtitle) {
                <p class="tc-page-header-subtitle">{{ subtitle }}</p>
              }
            </div>
          </div>
          <div class="tc-page-header-actions">
            <ng-content select="[actions]"></ng-content>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .tc-page-header {
      border-bottom: 1px solid var(--tc-page-header-border, #e5e5e5);
    }

    .tc-page-header-container {
      max-width: var(--tc-page-header-max-width, 80rem);
      margin: 0 auto;
      width: 100%;
      padding: 0 1.5rem;
    }

    .tc-page-header-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 4rem;
    }

    .tc-page-header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .tc-page-header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .tc-page-header-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--tc-page-header-title-color, #171717);
      margin: 0;
    }

    .tc-page-header-subtitle {
      font-size: 0.875rem;
      color: var(--tc-page-header-subtitle-color, #737373);
      margin: 0;
    }

    .tc-page-header-back {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      border-radius: 0.375rem;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--tc-page-header-back-color, #737373);
      text-decoration: none;
    }

    .tc-page-header-back:hover {
      color: #404040;
      background: #f5f5f5;
    }
  `]
})
export class TcPageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() backLink?: string;
}
