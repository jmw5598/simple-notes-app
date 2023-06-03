import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sn-user-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoggingInComponent implements OnInit {
  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['/dashboard', 'overview']);
    }, 200);
  }
}
