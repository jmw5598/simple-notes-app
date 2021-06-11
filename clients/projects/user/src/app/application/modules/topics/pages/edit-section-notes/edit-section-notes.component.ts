import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, takeUntil, take, tap, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EditorOption } from 'angular-markdown-editor';
import { ISectionsState } from '../../store/reducers';
import { EditorMessage } from './editor-message.enum';
import { Section } from '@sn/user/shared/models';
import { selectSelectedSection, selectUpdateSectionNotesResponseMessage } from '../../store/selectors';
import { setSelectedSection, updateSectionNotes } from '../../store/actions';
import { ResponseMessage } from '@sn/user/core/models';
import { ResponseStatus } from '@sn/user/core/enums';
import { fadeAnimation } from '@sn/user/shared/animations';
import { DEFAULT_EDITOR_OPTIONS } from '@sn/user/core/defaults';
import { AbstractPageOverlayLoader ,OverlayLoaderService } from '@sn/user/shared/components';

@Component({
  selector: 'sn-user-edit-section-notes',
  templateUrl: './edit-section-notes.component.html',
  styleUrls: ['./edit-section-notes.component.scss'],
  animations: [fadeAnimation]
})
export class EditSectionNotesComponent extends AbstractPageOverlayLoader implements OnInit, OnDestroy {
  public editorOptions: EditorOption;
  public section$: Observable<Section>;
  public sectionNotes: string = '';  
  private _subscriptionSubject$: Subject<void>;
  private _sectionNoteChangeSubject$: Subject<string>;
  private _topicId: number;
  private _sectionId: number;
  public saveMessage: EditorMessage;

  constructor(
    private _route: ActivatedRoute,
    private _store: Store<ISectionsState>,
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
    this._subscriptionSubject$ = new Subject<void>();
    this._sectionNoteChangeSubject$ = new Subject<string>();
    this.editorOptions = {...DEFAULT_EDITOR_OPTIONS};
    this.editorOptions.additionalButtons[0].push(
      {
        name: 'groupMod',
        data: [{
          name: 'cmdSave',
          toggle: false,
          title: 'Save',
          icon: {
            fa: 'fas fa-save',
            glyph: 'glyphicon glyphicon-save'
          },
          callback: (e) => this.onSaveSectionNotes(this.sectionNotes)
        }]
      }
    );
  }

  ngOnInit() {
    this._store.select(selectUpdateSectionNotesResponseMessage)
      .pipe(
        takeUntil(this._subscriptionSubject$),
        distinctUntilChanged(),
        tap((response: ResponseMessage) => {
          if (response) {
            const successMessage: boolean = response.status === ResponseStatus.SUCCESS;
            this.editorOptions.footer = successMessage ? EditorMessage.SAVED : EditorMessage.ERROR;
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

  public hidePreview(): void {
    
  }

  public onSaveSectionNotes(notes: string): void {
    this.editorOptions.footer = EditorMessage.SAVING;
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
        this.editorOptions.footer = '';
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    this._store.dispatch(setSelectedSection({ section: null }));
    this._subscriptionSubject$.next();
    this._subscriptionSubject$.complete();
  }
}
