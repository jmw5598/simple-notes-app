import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { ISectionsState } from '../../store/reducers';
import { DrawerService } from '@sn/user/shared/components';
import { buildSectionFormGroup } from '../section-form/section-form.builder';
import { Section, Topic } from '@sn/user/shared/models';
import { ResponseMessage } from '@sn/user/core/models';
import { selectUpdateSectionResponseMessage } from '../../store/selectors';
import { updateSection } from '../../store/actions';
import { showHide } from '@sn/user/shared/animations';

@Component({
  selector: 'sn-section-update',
  templateUrl: './section-update.component.html',
  styleUrls: ['./section-update.component.scss'],
  animations: [showHide]
})
export class SectionUpdateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;
  public selectedTopic: Topic;
  public selectedSection: Section;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<ISectionsState>,
    private _drawerServie: DrawerService
  ) {
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this.form = buildSectionFormGroup(this._formBuilder);
    this.responseMessage$ = this._store.select(selectUpdateSectionResponseMessage);
    this._drawerServie.onDataChange()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(data => {
        if (data) {
          this.selectedTopic = data.topic;
          this.selectedSection = data.section;
          this.form.patchValue(this.selectedSection);
        }
      });
  }

  public submit(section: Section): void {
    this._store.dispatch(updateSection({ 
      topicId: this.selectedTopic.id,
      sectionId: section.id,
      section: section 
    }));
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
