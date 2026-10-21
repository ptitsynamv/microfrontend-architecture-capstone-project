import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Instrument } from '../../instruments';

/**
 * Stands in for an instrument until its remote micro frontend is wired in (Phase 3).
 * The instrument comes from the route's `data` through component input binding.
 */
@Component({
  selector: 'fp-instrument-placeholder',
  template: `
    <h1>{{ instrument().label }}</h1>
    <p>{{ instrument().description }}</p>
    <p class="note">This instrument's micro frontend is not connected yet.</p>
  `,
  styles: `
    h1 {
      margin-top: 0;
    }
    .note {
      color: var(--fp-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstrumentPlaceholder {
  public readonly instrument = input.required<Instrument>();
}
