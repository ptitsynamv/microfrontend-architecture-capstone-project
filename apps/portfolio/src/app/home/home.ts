import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { AuthService, USER_GROUP_LABELS } from '@fp/shared/auth';
import { EmptyState, PageHeader } from '@fp/shared/ui';

@Component({
  selector: 'fp-portfolio-home',
  imports: [PageHeader, EmptyState],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  /** Same AuthService instance as the shell's: shared through Native Federation. */
  protected readonly user = inject(AuthService).user;
  protected readonly groupLabel = computed(() => {
    const user = this.user();
    return user ? USER_GROUP_LABELS[user.group] : '';
  });
}
