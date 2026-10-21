import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fp-not-found',
  imports: [RouterLink],
  template: `
    <h1>Page not found</h1>
    <p>There is no page at this address.</p>
    <a routerLink="/">Back to the dashboard</a>
  `,
  styles: `
    h1 {
      margin-top: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
