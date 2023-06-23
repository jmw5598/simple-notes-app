import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppLoadingComponent } from '../../components/app-loading/app-loading.component';

@Component({
  selector: 'sn-admin-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AppLoadingComponent
  ]
})
export class LoggingInComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['/dashboard', 'overview']);
    }, 500);
  }
}
