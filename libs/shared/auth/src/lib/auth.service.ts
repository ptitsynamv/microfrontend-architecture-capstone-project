import { computed, Injectable, signal } from '@angular/core';
import { User, USER_GROUPS, UserGroup } from './user';

const STORAGE_KEY = 'fp.user';

/**
 * Fake authentication: there is no backend, the user just picks a name and a
 * group. The user is kept in sessionStorage so a page refresh keeps the session.
 *
 * Shared by the shell and every remote through Native Federation, so there is
 * a single instance and all micro frontends react to the same user signal.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<User | null>(AuthService._restore());

  public readonly user = this._user.asReadonly();
  public readonly isLoggedIn = computed(() => this._user() !== null);

  /** Whether the current user belongs to one of the given groups. */
  public hasAnyGroup(groups: readonly UserGroup[]): boolean {
    const user = this._user();
    return user !== null && groups.includes(user.group);
  }

  public login(user: User): void {
    this._user.set(user);
    AuthService._persist(user);
  }

  public logout(): void {
    this._user.set(null);
    AuthService._persist(null);
  }

  private static _restore(): User | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed: unknown = JSON.parse(raw);
      return AuthService._isUser(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  private static _persist(user: User | null): void {
    try {
      if (user) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Storage can be unavailable (private mode); the session then lasts until reload.
    }
  }

  private static _isUser(value: unknown): value is User {
    if (typeof value !== 'object' || value === null) {
      return false;
    }
    const candidate = value as Record<string, unknown>;
    return (
      typeof candidate['name'] === 'string' &&
      USER_GROUPS.includes(candidate['group'] as User['group'])
    );
  }
}
