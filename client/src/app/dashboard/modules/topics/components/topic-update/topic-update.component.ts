import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { IAppState } from '@sn/core/store/state';
import { updateTopic } from '@sn/core/store/actions';
import { Topic } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';
import { ResponseMessage } from '@sn/core/models';
import { selectUpdateTopicResponseMessage } from '@sn/core/store/selectors';
import { setUpdateTopicResponseMessage } from '@sn/core/store/actions';
import { buildTopicFormGroup } from '@sn/shared/forms';
import { DrawerService } from '@sn/shared/components';

@Component({
  selector: 'sn-topic-update',
  templateUrl: './topic-update.component.html',
  styleUrls: ['./topic-update.component.scss'],
  animations: [showHide]
})
export class TopicUpdateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private _drawerService: DrawerService
  ) {
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this.form = buildTopicFormGroup(this._formBuilder);
    this.responseMessage$ = this._store.select(selectUpdateTopicResponseMessage).pipe(
      tap((message: ResponseMessage) => {
        console.log("updat emessage?", message);
        if (message) {
          setTimeout(() => this._store.dispatch(setUpdateTopicResponseMessage({ message: null })), 3000);
        }
      })
    );
    this._drawerService.onDataChange()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(data => this.form.patchValue(data));
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
