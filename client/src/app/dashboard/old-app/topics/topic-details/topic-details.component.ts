import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { saveAs } from 'file-saver/FileSaver';

import { FileType } from '../../shared/model/file-type.enum';
import { ModalOptions } from '../topic-export/modal-options.model';
import { SectionsService } from '../../core/services/sections.service';
import { Topic } from '../../shared/model/topic.model';
import { TopicsService } from '../../core/services/topics.service';

@Component({
  selector: 'sn-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit, OnDestroy {

  private params: Subscription;
  private id: number;
  public topic: Topic;
  public exportModalOptions: ModalOptions;

  constructor(
    private route: ActivatedRoute,
    private sectionsService: SectionsService,
    private topicsService: TopicsService
  ) {
    this.exportModalOptions = new ModalOptions(false, false);
  }

  ngOnInit() {
    this.params = this.route.params
      .subscribe(
        params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
          this.retrieveTopic();
        }
      );
  }

  delete(sectionId: number) {
    this.sectionsService.delete(this.topic.id, sectionId)
      .subscribe(
        data => this.retrieveSections(),
        error => console.log("error deleting section with id: " + sectionId)
      );
  }

  export(event: any) {
    if(event.confirm) {
      this.exportModalOptions.isBusy = true;
      this.topicsService.export(this.id, event.options)
        .subscribe(
          data => {
            this.exportModalOptions.isBusy = false;
            saveAs(data.blob, data.filename);
          },
          error => {
            console.log(error);
            this.exportModalOptions.isBusy = false;
          }
        );

    } else {
      this.exportModalOptions.isShown = false;
    }
  }

  showExportModal() {
    this.exportModalOptions.isShown = true;
  }

  retrieveTopic() {
    this.topicsService.findById(this.id)
      .subscribe(
        data => {
          this.topic = data.topic;
          this.retrieveSections();
        }
      );
  }

  retrieveSections() {
    this.sectionsService.findAll(this.id)
      .subscribe(
        data => this.topic.sections = data
      )
  }

  ngOnDestroy() {
    if(this.params)
      this.params.unsubscribe();
  }

}
