import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IFlashcardsState } from '@sn/application/modules/flashcards/store/reducers';
import { ResponseMessage } from '@sn/core/models';
import { showHide } from '@sn/shared/animations';
import { Observable, Subject } from 'rxjs';
import { DrawerService } from '../drawer/drawer.service';

import * as flashcardActions from '@sn/application/modules/flashcards/store/actions';
import * as flashcardSelectors from '@sn/application/modules/flashcards/store/selectors';
import { debounce, debounceTime, filter, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { FlashcardSet } from '@sn/shared/models';

@Component({
  selector: 'sn-flashcard-set-create',
  templateUrl: './flashcard-set-create.component.html',
  styleUrls: ['./flashcard-set-create.component.scss'],
  animations: [showHide]
})
export class FlashcardSetCreateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<any> = new Subject<any>();
  public form: FormGroup;

  public flashcardSetBuilder$: Observable<FlashcardSet>;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _drawerService: DrawerService,
    private _formBuilder: FormBuilder,
    private _store: Store<IFlashcardsState>
  ) { }

  ngOnInit(): void {
    this.initializeFlashcardSetBuilderForm();
    this.selectState();
    this.syncFlashcardSetBuilderStateWithForm();
    this.syncFormChangesWithFlashcardState();
  }

  public onClose(): void {
    this._drawerService.close();
  }

  public onSubmit(formValue: any): void {
    console.log('creating flashcard set ', this.form.value, formValue);
  }

  private initializeFlashcardSetBuilderForm(): void {
    this.form = this._formBuilder.group({
      title: ['', [Validators.required]],
      flashcards: this._formBuilder.array([], [Validators.required])
    });
  }

  private selectState(): void {
    this.flashcardSetBuilder$ = this._store.select(flashcardSelectors.selectFlashcardSetBuilder);
    this.responseMessage$ = this._store.select(flashcardSelectors.selectCreateFlashcardSetResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.form.reset();
            setTimeout(() => this._store.dispatch(flashcardActions.setCreateFlashcardSettResponseMessage({ message: null })), 3000);
          }
        })
      );
  }

  private syncFormChangesWithFlashcardState(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this._subscriptionSubject),
        debounceTime(500),
        withLatestFrom(this.flashcardSetBuilder$),
        filter(([values, flashcardSetBuilder]) => flashcardSetBuilder.title !== values.title)
      )
      .subscribe(([values, flashcardBuilderSet]) => {
        this._store.dispatch(flashcardActions.setFlashcardSetBuilder({
          flashcardSetBuilder: {
            ...flashcardBuilderSet,
            title: values.title
          }
        }));
      })
  }

  private syncFlashcardSetBuilderStateWithForm(): void {
    this._store.select(flashcardSelectors.selectFlashcardSetBuilder)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(flashcardSet => {
        const flashcardsArray = this.form.get('flashcards') as FormArray;
        flashcardsArray.clear();
        flashcardsArray.patchValue(flashcardSet.flashcards.map(flashcard => this._formBuilder.group({...flashcard})))
        this.form.patchValue({
          ...flashcardSet,
          flashcards: flashcardsArray
        })
        console.log('flashcardsetbuilder changed in store, updating form');
      });
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
