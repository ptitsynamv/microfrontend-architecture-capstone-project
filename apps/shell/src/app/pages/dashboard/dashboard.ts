import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { USER_GROUP_LABELS } from '../../auth/user';
import { INSTRUMENTS } from '../../instruments';

@Component({
  selector: 'fp-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  protected readonly user = inject(AuthService).user;

  protected readonly cards = INSTRUMENTS.map((instrument) => ({
    ...instrument,
    audience: instrument.groups
      .map((group) => USER_GROUP_LABELS[group])
      .join(', '),
  }));
}
