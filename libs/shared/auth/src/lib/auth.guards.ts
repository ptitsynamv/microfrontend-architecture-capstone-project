import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserGroup } from './user';

/** Lets signed-in users through; sends everyone else to the login page. */
export const authGuard: CanActivateFn = (_route, state) => {
  if (inject(AuthService).isLoggedIn()) {
    return true;
  }
  return inject(Router).createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};

/** Keeps signed-in users away from the login page. */
export const guestGuard: CanActivateFn = () =>
  inject(AuthService).isLoggedIn() ? inject(Router).createUrlTree(['/']) : true;

/**
 * Lets only the given user groups match the route. Used with `canMatch`, so a
 * remote's code is not even downloaded for users who may not open it.
 */
export function groupGuard(
  groups: readonly UserGroup[],
  redirectTo: string,
): CanMatchFn {
  return () => {
    const auth = inject(AuthService);
    if (!auth.isLoggedIn()) {
      // canMatch runs before the parent's canActivate: don't match, and let
      // authGuard send the user to the login page with the original returnUrl.
      return false;
    }
    return auth.hasAnyGroup(groups) || inject(Router).parseUrl(redirectTo);
  };
}
