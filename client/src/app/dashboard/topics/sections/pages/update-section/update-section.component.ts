import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IAppState } from '@sn/core/store/state';
import { Section } from '@sn/shared/models';
import { updateSection, setUpdateSectionResponseMessage } from '@sn/core/store/actions';
import { selectSelectedSection, selectUpdateSectionResponseMessage } from '@sn/core/store/selectors';
import { ResponseMessage } from '@sn/core/models';
import { buildSectionFormGroup } from '../../components/section-form/section-form.builder';
import { fadeAnimation, showHide } from '@sn/shared/animations';

@Component({
  selector: 'sn-update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.scss'],
  animations: [fadeAnimation, showHide]
})
export class UpdateSectionComponent implements OnInit {
public form: FormGroup;
  private _topicId: number;
  public section$: Observable<Section>;
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
    this.section$ = this._store.select(selectSelectedSection).pipe(
      tap((section: Section) => {
        if (section) {
          this.form.patchValue(section);
        }
      })
    );
    this.responseMessage$ = this._store.select(selectUpdateSectionResponseMessage).pipe(
      tap((message: ResponseMessage) => {
        if (message) {
          setTimeout(() => this._store.dispatch(setUpdateSectionResponseMessage(null)), 3000);
        }
      })
    );
    this.form = buildSectionFormGroup(this._formBuilder);
  }

  public submit(section: Section): void {
    this._store.dispatch(updateSection({
      topicId: this._topicId,
      sectionId: section.id,
      section: section
    }));
  }
}
