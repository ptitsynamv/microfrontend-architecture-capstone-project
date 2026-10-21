import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, USER_GROUP_LABELS } from '@fp/shared/auth';

@Component({
  selector: 'fp-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);

  protected readonly user = this._auth.user;
  protected readonly groupLabel = computed(() => {
    const user = this._auth.user();
    return user ? USER_GROUP_LABELS[user.group] : '';
  });

  protected logout(): void {
    this._auth.logout();
    void this._router.navigateByUrl('/login');
  }
}
