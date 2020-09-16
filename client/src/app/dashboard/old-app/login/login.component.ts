import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication/services/authentication.service';
import { User } from '../authentication/model/user.model';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService : AuthenticationService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(user: User) {
    this.authenticationService.authenticate(user)
      .subscribe(
        data => this.router.navigate(['topics']),
        error => this.message = error
      );
  }

}
