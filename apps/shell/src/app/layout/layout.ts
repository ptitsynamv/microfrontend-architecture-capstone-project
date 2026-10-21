import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { Header } from './header';
import { Sidebar } from './sidebar';

/**
 * The frame that stays on screen while the user moves between instruments.
 * Only the content of the outlet changes, which keeps the experience continuous.
 */
@Component({
  selector: 'fp-layout',
  imports: [Header, Sidebar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  /** True while a remote's code is being downloaded for the current navigation. */
  protected readonly loadingRemote = toSignal(
    inject(Router).events.pipe(
      filter(Layout._isLoadBoundary),
      map((event) => event instanceof RouteConfigLoadStart),
    ),
    { initialValue: false },
  );

  private static _isLoadBoundary(event: Event): boolean {
    return (
      event instanceof RouteConfigLoadStart ||
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    );
  }
}
