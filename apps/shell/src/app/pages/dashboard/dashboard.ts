import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, USER_GROUP_LABELS } from '@fp/shared/auth';
import { injectAvailableInstruments } from '../../instruments';

@Component({
  selector: 'fp-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  protected readonly user = inject(AuthService).user;

  private readonly _instruments = injectAvailableInstruments();

  protected readonly cards = computed(() =>
    this._instruments().map((instrument) => ({
      ...instrument,
      audience: instrument.groups
        .map((group) => USER_GROUP_LABELS[group])
        .join(', '),
    })),
  );
}
