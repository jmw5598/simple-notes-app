import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

// import { AuthenticationService } from '../../authentication/services/authentication.service';
import { NavbarSideService } from './navbar-side.service';
// import { TopicsSearchService } from '../../core/services/topics-search.service';

@Component({
  selector: 'sn-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  form: FormGroup;
  isShown: boolean;

  constructor(
    private navbarSideService: NavbarSideService,
    // private topicsSearchService: TopicsSearchService,
    // private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      categories: ['']
    });

    this.subscription = this.navbarSideService.shown
      .subscribe(
        data => {this.isShown = data; console.log("new state:" + this.isShown)},
        error => console.log("error subscribing to side nav bar state")
      );
  }

  onAddSearchCategory(item: string) {
    // this.topicsSearchService.addCategory(item);
  }

  onRemoveSearchCategory(item: string) {
    // this.topicsSearchService.removeCategory(item);
  }

  submit(categories: string[]) {
    // this.topicsSearchService.search();
    this.router.navigate(['topics', 'search']);
  }

  logout() {
    // this.authenticationService.unauthenticate();
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
