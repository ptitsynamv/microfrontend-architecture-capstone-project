import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { INSTRUMENTS } from '../../instruments';

/**
 * Fallback shown inside the layout when a remote can't be loaded. The rest of
 * the platform keeps working; only this instrument is affected.
 */
@Component({
  selector: 'fp-remote-unavailable',
  imports: [RouterLink],
  template: `
    <h1>{{ label() }} is temporarily unavailable</h1>
    <p>
      This instrument could not be loaded. The other instruments keep working.
    </p>
    <div class="actions">
      <button type="button" (click)="retry()">Try again</button>
      <a routerLink="/">Back to the dashboard</a>
    </div>
  `,
  styles: `
    h1 {
      margin-top: 0;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteUnavailable {
  private readonly _document = inject(DOCUMENT);

  /** Remote name, from the fallback route's `data` (see `loadRemoteRoutes`). */
  public readonly remote = input.required<string>();

  protected readonly label = computed(
    () =>
      INSTRUMENTS.find((instrument) => instrument.remote === this.remote())
        ?.label ?? 'This instrument',
  );

  /**
   * Remotes are registered when the shell starts, so a full reload of the
   * instrument's URL (still in the address bar) is the reliable retry.
   */
  protected retry(): void {
    this._document.location.reload();
  }
}
