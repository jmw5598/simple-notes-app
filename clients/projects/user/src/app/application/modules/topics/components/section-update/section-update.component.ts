import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { ISectionsState } from '../../store/reducers';
import { buildSectionFormGroup } from '../section-form/section-form.builder';
import { Section, Topic } from '@sn/shared/models';
import { ResponseMessage } from '@sn/shared/models';
import { selectUpdateSectionResponseMessage } from '../../store/selectors';
import { setUpdateSectionResponseMessage, updateSection } from '../../store/actions';
import { showHide } from '@sn/shared/animations';

import { DrawerService } from '@sn/shared/components';

@Component({
  selector: 'sn-user-section-update',
  templateUrl: './section-update.component.html',
  styleUrls: ['./section-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHide]
})
export class SectionUpdateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  public form: UntypedFormGroup;
  public responseMessage$: Observable<ResponseMessage>;
  public selectedTopic: Topic;
  public selectedSection: Section;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _store: Store<ISectionsState>,
    private _drawerServie: DrawerService
  ) {
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this.form = buildSectionFormGroup(this._formBuilder);
    this.responseMessage$ = this._store.select(selectUpdateSectionResponseMessage)
      .pipe(tap(message => {
        if (message) {
          setTimeout(() => 
            this._store.dispatch(setUpdateSectionResponseMessage({ message: null })), 
            2000
          )
        }
      }));
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
