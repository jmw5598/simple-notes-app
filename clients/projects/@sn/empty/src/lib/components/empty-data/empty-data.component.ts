import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sn-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnEmptyDataComponent implements OnInit {
  @Input()
  public message: string;

  @Input()
  public extraContent: TemplateRef<any>;

  public currentExtraContent: TemplateRef<any>;

  constructor() {
    this.message = `No data to display`;
  }

  ngOnInit(): void {
    this.currentExtraContent = this.extraContent;
  }
}
