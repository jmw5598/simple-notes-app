import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, take, tap, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';

import { EditorMessage } from './editor-message.enum';
import { Section } from '@sn/shared/models';
import { selectSelectedSection, selectUpdateSectionNotesResponseMessage } from '@sn/core/store/selectors';
import { setSelectedSection, updateSectionNotes } from '@sn/core/store/actions';
import { ResponseMessage } from '@sn/core/models';
import { ResponseStatus } from '@sn/core/enums';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss'],
  animations: [fadeAnimation]
})
export class EditSectionComponent implements OnInit, OnDestroy {

  public section$: Observable<Section>;
  public sectionNotes: string = '';  
  private _subscriptionSubject$: Subject<void>;
  private _sectionNoteChangeSubject$: Subject<string>;
  private _topicId: number;
  private _sectionId: number;
  public saveMessage: EditorMessage;

  constructor(
    private _route: ActivatedRoute,
    private _store: Store<IAppState> 
  ) {
    this._subscriptionSubject$ = new Subject<void>();
    this._sectionNoteChangeSubject$ = new Subject<string>();
  }

  ngOnInit() {
    this._store.select(selectUpdateSectionNotesResponseMessage)
      .pipe(
        takeUntil(this._subscriptionSubject$),
        distinctUntilChanged(),
        tap((response: ResponseMessage) => {
          if (response) {
            const successMessage: boolean = response.status === ResponseStatus.SUCCESS;
            this.saveMessage = successMessage ? EditorMessage.SAVED : EditorMessage.ERROR;
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

    this.section$ = this._store.select(selectSelectedSection).pipe(
      tap((section: Section) => this.sectionNotes = section.notes)
    );

    this._route.paramMap.pipe(take(1))
      .subscribe(params => {
          this._topicId = +params.get('topicId');
          this._sectionId = +params.get('sectionId');
        }
      );
  }

  public onSaveSectionNotes(notes: string): void {
    this.saveMessage = EditorMessage.SAVING;
    this._store.dispatch(updateSectionNotes({
      topicId: this._topicId,
      sectionId: this._sectionId,
      notes: this.sectionNotes
    }));
  }

  public onSectionNotesChangeKeyUp($event): void {
    this._sectionNoteChangeSubject$.next($event.target.value);
  }

  private _resetEditorMessage(): void {
    setTimeout(() => {
      if (this.saveMessage !== EditorMessage.SAVING) {
        this.saveMessage = null;
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    this._store.dispatch(setSelectedSection(null));
    this._subscriptionSubject$.next();
    this._subscriptionSubject$.complete();
  }
}
