import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Section, Topic } from '@sn/shared/models';

@Component({
  selector: 'sn-document-builder-topic-container',
  templateUrl: './document-builder-topic-container.component.html',
  styleUrls: ['./document-builder-topic-container.component.scss']
})
export class DocumentBuilderTopicContainerComponent implements OnInit {
  @Input()
  public topic: Topic;

  @Input()
  public actionButtonsTemplate: TemplateRef<any>;

  public currentActionButtonsTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
    this.currentActionButtonsTemplate = this.actionButtonsTemplate;
  }
}
