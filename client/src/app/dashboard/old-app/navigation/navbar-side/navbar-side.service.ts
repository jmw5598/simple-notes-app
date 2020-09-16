import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavbarSideService {

  private _shown: boolean = false;
  private shownSubject = new Subject<boolean>();
  public shown = this.shownSubject.asObservable();

  constructor() { }

  toggle() {
    this._shown = !this._shown;
    this.shownSubject.next(this._shown);
  }

}
