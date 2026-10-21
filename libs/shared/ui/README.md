# shared-ui

Look and feel shared by the shell and every remote, so all instruments feel
like one application.

- `src/styles/_theme.scss`: colour tokens (`--fp-*`) and base element styles.
  Each app's global `styles.scss` imports it with `@use`.
