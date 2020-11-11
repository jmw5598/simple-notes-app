import { Component } from '@angular/core';
import { LayoutSidePanelState } from '@sn/shared/components';

@Component({
  selector: 'sn-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  public LayoutSidePanelState = LayoutSidePanelState;
}
