import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fp-audit-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
