import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Placeholder box for a section that has no content yet. */
@Component({
  selector: 'fp-empty-state',
  template: `
    <h2>{{ heading() }}</h2>
    <div class="body"><ng-content /></div>
  `,
  styles: `
    :host {
      display: block;
      max-width: 40rem;
      padding: 2rem;
      text-align: center;
      background: var(--fp-surface);
      border: 1px dashed var(--fp-border);
      border-radius: 0.75rem;
    }
    h2 {
      margin: 0 0 0.5rem;
      font-size: 1.125rem;
    }
    .body {
      color: var(--fp-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
  public readonly heading = input.required<string>();
}
