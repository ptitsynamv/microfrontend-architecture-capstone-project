# Versioned releases: proposal

How each micro frontend can be released, and rolled back, on its own
without rebuilding or redeploying the shell or the other instruments.

## What it builds on

The shell does not know where the remotes live at build time. When it starts,
it reads one small file, `federation.manifest.json`, which maps every remote to
the address of its `remoteEntry.json`:

```json
{
  "portfolio": "https://cdn.example.com/portfolio/1.2.0/remoteEntry.json",
  "audit": "https://cdn.example.com/audit/2.0.1/remoteEntry.json"
}
```

Locally this file is
[`apps/shell/public/federation.manifest.json`](../apps/shell/public/federation.manifest.json)
and points at `localhost:4201` and `localhost:4202`. The shell loads it in
[`apps/shell/src/main.ts`](../apps/shell/src/main.ts).

So **the version of each instrument that users get is decided by one line in
the manifest.**

## The scheme

1. **Every build gets its own version folder, and that folder never changes.**
   Building `portfolio` 1.3.0 uploads `dist/apps/portfolio/browser` to
   `/portfolio/1.3.0/`. Older folders (`1.2.0`, `1.1.0`, …) stay where they are.
   Because the files in a version folder never change, the browser can cache
   them for a long time.

2. **Releasing a version means changing its line in the manifest.**

   ```diff
   - "portfolio": "https://cdn.example.com/portfolio/1.2.0/remoteEntry.json",
   + "portfolio": "https://cdn.example.com/portfolio/1.3.0/remoteEntry.json",
   ```

   Users get 1.3.0 the next time they open or reload the platform. Nothing
   else is rebuilt or redeployed.

3. **Rolling back means changing that line back.**
   1.2.0 is still deployed, so the rollback takes effect immediately with no
   build. A specific version (for example a hotfix `1.2.1`) is released the same
   way: deploy its folder, then point the manifest at it.

## Rules that make it work

- **The manifest is deployed on its own, not as part of the shell build.** A
  shell release must not overwrite it, and it is served with `no-cache`, so a
  change reaches users on their next page load.
- **Each instrument has its own version number** (e.g. a git tag
  `portfolio@1.3.0`), independent of the shell and of other instruments.
- **Shared libraries must stay compatible.** Angular, RxJS and the shared
  `@fp/shared/auth` library are loaded once and shared, and Native Federation
  checks their versions (`strictVersion`). All apps live in one monorepo with
  one `package.json`, so they are built against the same versions. Upgrading
  Angular is the one change that needs the shell and the remotes released
  together.
- **Users who already have the platform open** keep the version they loaded
  until they reload the page.
