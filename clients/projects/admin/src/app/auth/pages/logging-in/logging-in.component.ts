import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sn-admin-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.scss']
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
