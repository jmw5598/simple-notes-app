import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-admin-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeAnimation]
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
