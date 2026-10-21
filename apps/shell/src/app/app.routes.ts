import { Route } from '@angular/router';
import { authGuard, guestGuard } from './auth/auth.guards';
import { loadRemoteRoutes } from './federation/remote-routes';
import { INSTRUMENTS } from './instruments';
import { Layout } from './layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';

const TITLE = 'Financial Platform';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
    title: `Sign in · ${TITLE}`,
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', component: Dashboard, title: TITLE },
      // Each instrument is a remote micro frontend, loaded only when its route is opened.
      ...INSTRUMENTS.map((instrument): Route => ({
        path: instrument.path,
        loadChildren: loadRemoteRoutes(instrument.remote),
        title: `${instrument.label} · ${TITLE}`,
      })),
      { path: '**', component: NotFound, title: `Not found · ${TITLE}` },
    ],
  },
];
