import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IAppState } from '@sn/core/store/state';
import { Section } from '@sn/shared/models';
import { createSection } from '@sn/core/store/actions';

@Component({
  selector: 'sn-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {
  public form: FormGroup;
  private _topicId: number;

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
    this.form = this._formBuilder.group({
      title: ['', Validators.required],
      synopsis: ['', Validators.required]
    })
  }

  public submit(section: Section): void {
    console.log('create section');
    this._store.dispatch(createSection({
      topicId: this._topicId,
      section: section
    }));
  }
}
