import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EditorMessage } from './editor-message.enum';
import { Section } from '@sn/shared/models';
// import { SectionsService } from '../../../core/services/sections.service';

@Component({
  selector: 'sn-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

  notes: string = 'testing';

  private subscription: Subscription;
  private saveTimer: any;
  public saveMessage: EditorMessage;
  topicId: number;
  sectionId: number;
  section: Section = {
    title: 'testig',
    synopsis: 'testing syn',
    notes: 'testing notes'
  } as Section;

  constructor(
    private route: ActivatedRoute,
    // private sectionsService: SectionsService
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
    // this.sectionsService.update(this.topicId, this.sectionId, this.section)
    //   .subscribe(
    //     data => {
    //       setTimeout(() => this.saveMessage = EditorMessage.SAVED, 1000);
    //       this.section = data.section;
    //     },
    //     error => this.saveMessage = EditorMessage.ERROR
    //   );
  }

  // figure out a cleaner way to do this, maybe using a directive?
  autoSave() {
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      this.save();
    }, 2000)
  }

  private retrieveSection() {
    // this.sectionsService.findById(this.topicId, this.sectionId)
    //   .subscribe(
    //     data => this.section = data.section,
    //     error => console.log("error retrieving section with id: " + this.sectionId + "& topidId: " + this.topicId)
    //   );
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
