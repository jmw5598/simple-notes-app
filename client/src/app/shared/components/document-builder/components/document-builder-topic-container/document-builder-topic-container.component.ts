import { Component, Input, OnInit } from '@angular/core';
import { Section, Topic } from '@sn/shared/models';

@Component({
  selector: 'sn-document-builder-topic-container',
  templateUrl: './document-builder-topic-container.component.html',
  styleUrls: ['./document-builder-topic-container.component.scss']
})
export class DocumentBuilderTopicContainerComponent implements OnInit {
  @Input()
  public topic: Topic = {
    id: 123,
    title: 'Testing',
    synopsis: 'Lorem ipsum topic description',
    sections: [
      {
        id: 1234,
        title: 'Testing Section 1',
        synopsis: 'Lorem ipsum....1',
        notes: ''
      } as Section,
      {
        id: 1234,
        title: 'Testing Section 2',
        synopsis: 'Lorem ipsum....2',
        notes: ''
      } as Section,
      {
        id: 1234,
        title: 'Testing Section 3',
        synopsis: 'Lorem ipsum....3',
        notes: ''
      } as Section,
      {
        id: 1234,
        title: 'Testing Section 4',
        synopsis: 'Lorem ipsum....4',
        notes: ''
      } as Section,
    ]
  } as Topic;

  constructor() { }

  ngOnInit(): void {
  }

}
