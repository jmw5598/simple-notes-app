import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IAppState } from '@sn/core/store/state';
import { Section } from '@sn/shared/models';
import { createSection, setCreateSectionResponseMessage } from '@sn/core/store/actions';
import { selectCreateSectionResponseMessage } from '@sn/core/store/selectors';
import { ResponseMessage } from '@sn/core/models';
import { buildSectionFormGroup } from '../../components/section-form/section-form.builder';
import { fadeAnimation, showHide } from '@sn/shared/animations';

@Component({
  selector: 'sn-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss'],
  animations: [fadeAnimation, showHide]
})
export class CreateSectionComponent implements OnInit {
  public form: FormGroup;
  private _topicId: number;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<IAppState>
  ) {
    this._route.paramMap
      .pipe(take(1))
      .subscribe(params => this._topicId = +params.get('topicId'));
  }

  ngOnInit(): void {
    this.responseMessage$ = this._store.select(selectCreateSectionResponseMessage).pipe(
      tap((message: ResponseMessage) => {
        if (message) {
          this.form.reset();
          setTimeout(() => this._store.dispatch(setCreateSectionResponseMessage(null)), 3000);
        }
      })
    );
    this.form = buildSectionFormGroup(this._formBuilder);
  }

  public submit(section: Section): void {
    this._store.dispatch(createSection({
      topicId: this._topicId,
      section: section
    }));
  }
}
