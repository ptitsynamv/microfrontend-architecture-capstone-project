import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Standard heading block at the top of every instrument page. */
@Component({
  selector: 'fp-page-header',
  template: `
    @if (badge()) {
      <p class="badge">{{ badge() }}</p>
    }
    <h1>{{ heading() }}</h1>
    @if (lead()) {
      <p class="lead">{{ lead() }}</p>
    }
  `,
  styles: `
    :host {
      display: block;
      margin-bottom: 2rem;
    }
    h1 {
      margin: 0.5rem 0 0;
    }
    .badge {
      display: inline-block;
      margin: 0;
      padding: 0.125rem 0.5rem;
      border-radius: 999px;
      font-size: 0.75rem;
      color: var(--fp-accent);
      background: var(--fp-accent-soft);
    }
    .lead {
      margin-bottom: 0;
      color: var(--fp-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  public readonly heading = input.required<string>();
  public readonly lead = input('');
  /** Small label above the heading, e.g. which micro frontend renders the page. */
  public readonly badge = input('');
}
