# Financial Platform: micro frontends

A blueprint for building the "Financial Platform" (Case 2) as micro frontends:
a single shell that hosts separate instruments for investors, auditors and
fund managers, where each instrument is developed and deployed by its own
team.

Scope, as set by the task: website only (no mobile apps), no legacy iframe
integration, two empty micro frontends that run locally, and a written
explanation of build, deployment and versioned releases.

## How it works

- **Nx monorepo** with three Angular apps and shared libraries.
- **Module Federation** through
  [Native Federation](https://www.npmjs.com/package/@angular-architects/native-federation),
  the Module Federation approach Nx now recommends for Angular. Nx's own
  webpack-based Angular Module Federation is deprecated in Nx 23.
- **`shell`** (host, port 4200) owns the layout, navigation and login. It loads
  the instruments at runtime from the addresses in
  [`federation.manifest.json`](apps/shell/public/federation.manifest.json).
- **`portfolio`** (port 4201) and **`audit`** (port 4202) are the two remote
  micro frontends. Each exposes its routes and can also run on its own.
- **Continuous experience:** the header and sidebar stay on screen while only
  the page content changes, with no page reload. Angular and the signed-in user
  (`libs/shared/auth`) are shared once across all apps, and one theme
  (`libs/shared/ui`) keeps every instrument looking the same.
- **User groups:** `audit` is only available to auditors. Other groups don't
  see it, and its code is not even downloaded for them.

## Run it locally

Requirements: Node.js 22 or newer, and ports 4200, 4201 and 4202 free.

```bash
npm install
npm start
```

Open http://localhost:4200. `npm start` serves the shell and both remotes;
the first start takes a little longer while everything compiles.

## What to try

1. Sign in with any name as **Auditor**. Both instruments appear. Switch
   between Portfolio and Audit: only the content changes, and each page says
   which micro frontend renders it and shows the same signed-in user.
2. Log out and sign in as **Investor**. Audit is gone from the sidebar and the
   dashboard, and opening http://localhost:4200/audit shows "No access".
3. Run one micro frontend on its own, as its team would during development:
   `npx nx serve portfolio`, then open http://localhost:4201.

## Project structure

| Path               | What it is                                            |
| ------------------ | ----------------------------------------------------- |
| `apps/shell`       | Host: layout, login, navigation, federation manifest  |
| `apps/portfolio`   | Remote micro frontend (all user groups)               |
| `apps/audit`       | Remote micro frontend (auditors only)                 |
| `libs/shared/auth` | Signed-in user, user groups and route guards (shared) |
| `libs/shared/ui`   | Shared theme                                          |

## Build, deployment and versioning

- [docs/build-and-deploy.md](docs/build-and-deploy.md): how each app is built
  and deployed on its own during feature releases
- [docs/versioning.md](docs/versioning.md): proposal for releasing and
  rolling back individual micro frontend versions

Other commands: `npm run build` builds all apps into `dist/`, and `npm run lint`
lints them.
