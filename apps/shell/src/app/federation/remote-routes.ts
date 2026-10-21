import { inject, InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';

/** Same shape as `loadRemoteModule` returned by `initFederation()` in `main.ts`. */
export type LoadRemoteModule = <T = unknown>(
  remoteName: string,
  exposedModule: string,
) => Promise<T>;

export const LOAD_REMOTE_MODULE = new InjectionToken<LoadRemoteModule>(
  'LOAD_REMOTE_MODULE',
);

/** Contract every instrument remote fulfils: it exposes `./Routes` with a `routes` export. */
export interface RemoteRoutesModule {
  routes: Routes;
}

/**
 * `loadChildren` callback that fetches a remote's routes at navigation time.
 * The remote's URL comes from `federation.manifest.json`, so the shell never
 * has to be rebuilt when a remote is redeployed.
 */
export function loadRemoteRoutes(remoteName: string): () => Promise<Routes> {
  return async () => {
    const loadRemoteModule = inject(LOAD_REMOTE_MODULE);
    const remote = await loadRemoteModule<RemoteRoutesModule>(
      remoteName,
      './Routes',
    );
    return remote.routes;
  };
}
