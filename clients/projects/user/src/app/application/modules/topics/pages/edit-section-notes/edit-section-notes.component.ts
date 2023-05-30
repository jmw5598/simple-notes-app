import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, take, tap, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ISectionsState } from '../../store/reducers';
import { EditorMessage } from './editor-message.enum';
import { selectSelectedSection, selectUpdateSectionNotesResponseMessage } from '../../store/selectors';
import { setSelectedSection, updateSectionNotes } from '../../store/actions';
import { fadeAnimation } from '@sn/shared/animations';

import { AbstractPageOverlayLoader, OverlayLoaderService } from '@sn/shared/components';
import { ResponseMessage, ResponseStatus, Section } from '@sn/shared/models';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'sn-user-edit-section-notes',
  templateUrl: './edit-section-notes.component.html',
  styleUrls: ['./edit-section-notes.component.scss'],
  animations: [fadeAnimation]
})
export class EditSectionNotesComponent extends AbstractPageOverlayLoader implements OnInit, OnDestroy {
  public section$: Observable<Section>;
  private _subscriptionSubject$: Subject<void>;
  private _sectionNoteChangeSubject$: Subject<string>;
  private _topicId: number;
  private _sectionId: number;
  public saveMessage: EditorMessage;

  public formGroup: FormGroup = new FormGroup({
    notes: new FormControl('')
  });

  constructor(
    private _route: ActivatedRoute,
    private _store: Store<ISectionsState>,
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
    this._subscriptionSubject$ = new Subject<void>();
    this._sectionNoteChangeSubject$ = new Subject<string>();
  }

  options: any = {
    lineWrapping: true,
    toolbar: false,
  };

  ngOnInit() {
    this._store.select(selectUpdateSectionNotesResponseMessage)
      .pipe(
        takeUntil(this._subscriptionSubject$),
        distinctUntilChanged(),
        tap((response: ResponseMessage) => {
          if (response) {
            const successMessage: boolean = response.status === ResponseStatus.SUCCESS;
            this._resetEditorMessage();
          }
        })
      ).subscribe();

    this._sectionNoteChangeSubject$
      .pipe(
        takeUntil(this._subscriptionSubject$),
        debounceTime(2000),
        distinctUntilChanged(),
        tap(notes => this.onSaveSectionNotes(notes))
      ).subscribe();

    this.section$ = this._store.select(selectSelectedSection)
      .pipe(
        tap((section: Section) => 
          this.formGroup.patchValue({ notes: section.notes })
        ));

    this._route.paramMap.pipe(take(1))
      .subscribe(params => {
          this._topicId = +params.get('topicId');
          this._sectionId = +params.get('sectionId');
        }
      );

    this.formGroup
      .valueChanges
      .pipe(takeUntil(this._subscriptionSubject$))
      .subscribe(formValue => this._sectionNoteChangeSubject$.next(formValue?.notes))
  }

  public hidePreview(): void {
    
  }

  public onSaveSectionNotes(notes: string): void {
    // this.editorOptions.footer = EditorMessage.SAVING;
    this._store.dispatch(updateSectionNotes({
      topicId: this._topicId,
      sectionId: this._sectionId,
      notes: this.formGroup?.value?.notes || null
    }));
  }

  public onSectionNotesChangeKeyUp($event): void {
    this._sectionNoteChangeSubject$.next($event.target.value);
  }

  private _resetEditorMessage(): void {
    setTimeout(() => {
      if (this.saveMessage !== EditorMessage.SAVING) {
        // this.editorOptions.footer = '';
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    this._store.dispatch(setSelectedSection({ section: null }));
    this._subscriptionSubject$.next();
    this._subscriptionSubject$.complete();
  }
}
