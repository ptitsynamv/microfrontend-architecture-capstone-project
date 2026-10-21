import { Route } from '@angular/router';
import { Home } from './home/home';

/**
 * Public entry point of the audit micro frontend, exposed as `./Routes`.
 * The shell mounts these routes under `/audit`; standalone mode mounts them at `/`.
 */
export const routes: Route[] = [{ path: '', component: Home }];
