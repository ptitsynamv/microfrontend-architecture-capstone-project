import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component for standalone mode only (`nx serve audit`), so the team can
 * develop without the shell. Inside the shell only the exposed routes are used.
 */
@Component({
  imports: [RouterOutlet],
  selector: 'fp-root',
  template: `
    <p class="standalone">Standalone mode: running without the shell.</p>
    <main class="content"><router-outlet /></main>
  `,
  styles: `
    .standalone {
      margin: 0;
      padding: 0.5rem 2rem;
      font-size: 0.875rem;
      color: var(--fp-text-muted);
      background: var(--fp-surface);
      border-bottom: 1px solid var(--fp-border);
    }
    .content {
      padding: 2rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
