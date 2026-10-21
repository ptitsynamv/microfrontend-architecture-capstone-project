import { inject, InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import { RemoteUnavailable } from '../pages/remote-unavailable/remote-unavailable';

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
 *
 * If the remote can't be loaded (server down, network error, bad deploy), the
 * instrument's URL still opens, but shows a fallback page inside the layout.
 * The rest of the platform keeps working, and reloading the page retries.
 */
export function loadRemoteRoutes(remoteName: string): () => Promise<Routes> {
  return async () => {
    const loadRemoteModule = inject(LOAD_REMOTE_MODULE);
    try {
      const remote = await loadRemoteModule<RemoteRoutesModule>(
        remoteName,
        './Routes',
      );
      return remote.routes;
    } catch (error) {
      console.error(`Remote "${remoteName}" could not be loaded`, error);
      return [
        {
          path: '**',
          component: RemoteUnavailable,
          data: { remote: remoteName },
        },
      ];
    }
  };
}
