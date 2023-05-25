import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { ITopicsState } from '../../store/reducers';
import { updateTopic } from '../../store/actions';
import { Topic } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';
import { ResponseMessage } from '@sn/shared/models';
import { selectUpdateTopicResponseMessage } from '../../store/selectors';
import { setUpdateTopicResponseMessage } from '../../store/actions';
import { buildTopicFormGroup } from '@sn/user/shared/forms';

import { DrawerService } from '@sn/shared/components';

@Component({
  selector: 'sn-user-topic-update',
  templateUrl: './topic-update.component.html',
  styleUrls: ['./topic-update.component.scss'],
  animations: [showHide]
})
export class TopicUpdateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  public form: UntypedFormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _store: Store<ITopicsState>,
    private _drawerService: DrawerService
  ) {
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this.form = buildTopicFormGroup(this._formBuilder);
    this.responseMessage$ = this._store.select(selectUpdateTopicResponseMessage).pipe(
      tap((message: ResponseMessage) => {
        if (message) {
          setTimeout(() => this._store.dispatch(setUpdateTopicResponseMessage({ message: null })), 3000);
        }
      })
    );
    
    this._drawerService.onDataChange()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(data => data ? this.form.patchValue(data) : null);
  }

  public submit(topic: Topic): void {
    this._store.dispatch(updateTopic({ 
      id: topic.id, 
      topic: topic 
    }));
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
