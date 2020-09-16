import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EditorMessage } from './editor-message.enum';
import { Section } from '../../../shared/model/section.model';
import { SectionsService } from '../../../core/services/sections.service';

@Component({
  selector: 'sn-section-editor',
  templateUrl: './section-editor.component.html',
  styleUrls: ['./section-editor.component.css']
})
export class SectionEditorComponent implements OnInit, OnDestroy {

  notes: string = '';

  private subscription: Subscription;
  private saveTimer: any;
  public saveMessage: EditorMessage;
  topicId: number;
  sectionId: number;
  section: Section;

  constructor(
    private route: ActivatedRoute,
    private sectionsService: SectionsService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        params => {
          this.topicId = +params['id'];
          this.sectionId = +params['sectionId'];
          this.retrieveSection();
        }
      );
  }

  save() {
    this.saveMessage = EditorMessage.SAVING;
    this.sectionsService.update(this.topicId, this.sectionId, this.section)
      .subscribe(
        data => {
          setTimeout(() => this.saveMessage = EditorMessage.SAVED, 1000);
          this.section = data.section;
        },
        error => this.saveMessage = EditorMessage.ERROR
      );
  }

  // figure out a cleaner way to do this, maybe using a directive?
  autoSave() {
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      this.save();
    }, 2000)
  }

  private retrieveSection() {
    this.sectionsService.findById(this.topicId, this.sectionId)
      .subscribe(
        data => this.section = data.section,
        error => console.log("error retrieving section with id: " + this.sectionId + "& topidId: " + this.topicId)
      );
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
