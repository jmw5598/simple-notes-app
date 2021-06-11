import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ResponseMessage } from '@sn/core/models';
import { showHide } from '@sn/shared/animations';
import { DrawerService } from '@sn/shared/components';
import { FlashcardSet } from '@sn/shared/models';
import { Observable, Subject } from 'rxjs';
import { IFlashcardsState } from '../../store/reducers';

import * as flashcardActions from '@sn/application/modules/flashcards/store/actions';
import * as flashcardSelectors from '@sn/application/modules/flashcards/store/selectors';
import { debounceTime, filter, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'sn-flashcard-set-update',
  templateUrl: './flashcard-set-update.component.html',
  styleUrls: ['./flashcard-set-update.component.scss'],
  animations: [showHide]
})
export class FlashcardSetUpdateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<any> = new Subject<any>();
  public form: FormGroup;

  public flashcardSetBuilder$: Observable<FlashcardSet>;
  public flashcardSetBuilder: FlashcardSet;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _drawerService: DrawerService,
    private _formBuilder: FormBuilder,
    private _store: Store<IFlashcardsState>
  ) { }

  ngOnInit(): void {
    this._initializeFlashcardSetBuilderForm();
    this._selectState();
    this._syncFlashcardSetBuilderStateWithForm();
    this._syncFormChangesWithFlashcardState();
  }

  public onClose(): void {
    this._drawerService.close();
  }

  public onSubmit(formValue: any): void {
    const flashcardSet: FlashcardSet = {
      ...formValue,
      flashcards: formValue.flashcards.map(flashcard => ({
        ...flashcard,
        id: flashcard.id > 0 ? flashcard.id : null
      }))
    } as FlashcardSet;
    this._store.dispatch(flashcardActions.updateFlashcardSet({
      flashcardSetId: this.flashcardSetBuilder.id,
      flashcardSet: flashcardSet
    }));
  }

  private _initializeFlashcardSetBuilderForm(): void {
    this.form = this._formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      flashcards: this._formBuilder.array([])
    });
  }

  private _selectState(): void {
    this.flashcardSetBuilder$ = this._store.select(flashcardSelectors.selectFlashcardSetBuilder);
    this.responseMessage$ = this._store.select(flashcardSelectors.selectUpdateFlashcardSetResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          console.log("got new response message");
          if (message) {
            this.form.reset();
            setTimeout(() => 
              this._store.dispatch(
                flashcardActions.setUpdateFlashcardSetResponseMessage({ message: null })
              ), 3000);
          }
        })
      );
  }

  private _syncFormChangesWithFlashcardState(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this._subscriptionSubject),
        debounceTime(500),
        withLatestFrom(this.flashcardSetBuilder$),
        filter(([values, flashcardSetBuilder]) => {
          return flashcardSetBuilder.title !== values.title
            || flashcardSetBuilder.synopsis !== values.synopsis
        })
      )
      .subscribe(([values, flashcardBuilderSet]) => {
        this._store.dispatch(flashcardActions.setFlashcardSetBuilder({
          flashcardSetBuilder: {
            ...flashcardBuilderSet,
            title: values.title,
            synopsis: values.synopsis
          }
        }));
      })
  }

  private _syncFlashcardSetBuilderStateWithForm(): void {
    this._store.select(flashcardSelectors.selectFlashcardSetBuilder)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(flashcardSet => {
        this.flashcardSetBuilder = flashcardSet;
        this._patchInputFieldValuesToForm(flashcardSet);
        this._patchFlashcardsToForm(flashcardSet);
      });
  }

  private _patchInputFieldValuesToForm(flashcardSet: FlashcardSet): void {
    this.form.patchValue({ ...flashcardSet });
  }

  private _patchFlashcardsToForm(flashcardSet: FlashcardSet): void {
    const flashcardsArray = this._formBuilder.array([]);
    flashcardSet?.flashcards
      .forEach(flashcard => {
        const control = this._formBuilder.group({
        id: [flashcard.id, [Validators.required]],
        frontContent: [flashcard.frontContent, [Validators.required]],
        backContent: [flashcard.backContent, [Validators.required]]
      })
      flashcardsArray.push(control);
    });
    this.form.setControl('flashcards', flashcardsArray);
  }

  ngOnDestroy(): void {
    this._store.dispatch(flashcardActions.setFlashcardSetBuilder({ flashcardSetBuilder: null }));
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
