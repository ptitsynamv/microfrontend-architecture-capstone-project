# shared-auth

Current user and user-group state, shared by the shell and every remote
(`@fp/shared/auth`).

- `AuthService`: signal-based fake login. There is one instance across all micro frontends.
- `authGuard`, `guestGuard`, `groupGuard(groups, redirectTo)`: route guards.
- `User`, `UserGroup`, `USER_GROUP_LABELS`: the user model.
