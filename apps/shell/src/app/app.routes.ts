import { Route } from '@angular/router';
import { authGuard, guestGuard } from './auth/auth.guards';
import { INSTRUMENTS } from './instruments';
import { Layout } from './layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { InstrumentPlaceholder } from './pages/instrument-placeholder/instrument-placeholder';
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
      ...INSTRUMENTS.map((instrument): Route => ({
        path: instrument.path,
        component: InstrumentPlaceholder,
        data: { instrument },
        title: `${instrument.label} · ${TITLE}`,
      })),
      { path: '**', component: NotFound, title: `Not found · ${TITLE}` },
    ],
  },
];
