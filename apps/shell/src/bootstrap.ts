import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {
  LOAD_REMOTE_MODULE,
  LoadRemoteModule,
} from './app/federation/remote-routes';

export function bootstrap(
  loadRemoteModule: LoadRemoteModule,
): Promise<ApplicationRef> {
  return bootstrapApplication(App, {
    ...appConfig,
    providers: [
      ...appConfig.providers,
      { provide: LOAD_REMOTE_MODULE, useValue: loadRemoteModule },
    ],
  });
}
