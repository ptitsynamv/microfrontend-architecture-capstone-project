# shared-ui

Look and feel shared by the shell and every remote (`@fp/shared/ui`), so all
instruments feel like one application.

- `src/styles/_theme.scss`: colour tokens (`--fp-*`) and base element styles.
  Each app's global `styles.scss` does `@use` on it.
- `PageHeader` (`fp-page-header`): heading block for instrument pages.
- `EmptyState` (`fp-empty-state`): placeholder box for sections with no content.
