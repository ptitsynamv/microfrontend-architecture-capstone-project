import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, USER_GROUP_LABELS } from '@fp/shared/auth';

@Component({
  selector: 'fp-no-access',
  imports: [RouterLink],
  template: `
    <h1>No access</h1>
    <p>
      This instrument is not available for the
      <strong>{{ groupLabel }}</strong> user group.
    </p>
    <a routerLink="/">Back to the dashboard</a>
  `,
  styles: `
    h1 {
      margin-top: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoAccess {
  private readonly _user = inject(AuthService).user();

  protected readonly groupLabel = this._user
    ? USER_GROUP_LABELS[this._user.group]
    : '';
}
