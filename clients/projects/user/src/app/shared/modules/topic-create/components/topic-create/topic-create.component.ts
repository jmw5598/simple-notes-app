import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITopicsState } from '@sn/user/application/modules/topics/store/reducers';
import { createTopic } from '@sn/user/application/modules/topics/store/actions';
import { Topic } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';
import { ResponseMessage } from '@sn/shared/models';
import { selectCreateTopicResponseMessage } from '@sn/user/application/modules/topics/store/selectors';
import { setCreateTopicResponseMessage } from '@sn/user/application/modules/topics/store/actions';
import { buildTopicFormGroup } from '../topic-form/topic-form.builder';
import { SnTopicFormComponent } from '../topic-form/topic-form.component';

@Component({
  selector: 'sn-user-topic-create',
  templateUrl: './topic-create.component.html',
  styleUrls: ['./topic-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHide]
})
export class SnTopicCreateComponent implements OnInit {
  @ViewChild(SnTopicFormComponent, { static: true })
  public topicFormComponent!: SnTopicFormComponent;

  public form: UntypedFormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _store: Store<ITopicsState>
  ) { }

  ngOnInit(): void {
    this.responseMessage$ = this._store.select(selectCreateTopicResponseMessage).pipe(
      tap((message: ResponseMessage) => {
        if (message) {
          this._resetForm();
          setTimeout(() => this._store.dispatch(setCreateTopicResponseMessage({ message: null })), 3000);
        }
      })
    );
    this.form = buildTopicFormGroup(this._formBuilder);
  }

  public submit(topic: Topic): void {
    const { id, ...newTopic } = topic;
    this._store.dispatch(createTopic({ topic: newTopic as Topic }));
  }

  private _resetForm(): void {
    const defaultFormValue = buildTopicFormGroup(this._formBuilder).value;
    this.form.reset();
    this.form.patchValue({ ...defaultFormValue });
    this.topicFormComponent?.reset();
  }
}
