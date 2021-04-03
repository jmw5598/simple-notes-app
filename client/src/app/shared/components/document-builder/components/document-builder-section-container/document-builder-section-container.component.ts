import { Component, Input, OnInit } from '@angular/core';
import { Section } from '@sn/shared/models';

@Component({
  selector: 'sn-document-builder-section-container',
  templateUrl: './document-builder-section-container.component.html',
  styleUrls: ['./document-builder-section-container.component.scss']
})
export class DocumentBuilderSectionContainerComponent implements OnInit {
  @Input()
  public section: Section;

  constructor() { }

  ngOnInit(): void {
  }
}
