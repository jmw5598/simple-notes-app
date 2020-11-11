import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { ISectionsState } from '../../store/reducers';
import { DrawerService } from '@sn/shared/components';
import { buildSectionFormGroup } from '../section-form/section-form.builder';
import { Section, Topic } from '@sn/shared/models';
import { ResponseMessage } from '@sn/core/models';
import { selectCreateSectionResponseMessage } from '../../store/selectors';
import { createSection } from '../../store/actions';
import { showHide } from '@sn/shared/animations';

@Component({
  selector: 'sn-section-create',
  templateUrl: './section-create.component.html',
  styleUrls: ['./section-create.component.scss'],
  animations: [showHide]
})
export class SectionCreateComponent implements OnInit {
  private _subscriptionSubject: Subject<void>;
  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;
  public selectedTopic: Topic;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<ISectionsState>,
    private _drawerServie: DrawerService
  ) {
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this.form = buildSectionFormGroup(this._formBuilder);
    this.responseMessage$ = this._store.select(selectCreateSectionResponseMessage);
    this._drawerServie.onDataChange()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(data => {
        if (data) {
          this.selectedTopic = data.topic
        }
      });
  }

  public submit(section: Section): void {
    const { id, ...newSection } = section;
    this._store.dispatch(createSection({ 
      topicId: this.selectedTopic.id, 
      section: newSection as Section
    }));
  }
}