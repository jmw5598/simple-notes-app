import { ChangeDetectorRef, Component, HostBinding } from '@angular/core';

type CalendarEventCreateView = 'menu' | 'event' | 'todo-list';

@Component({
  selector: 'sn-user-calendar-event-create-menu',
  templateUrl: './calendar-event-create-menu.component.html',
  styleUrls: ['./calendar-event-create-menu.component.scss']
})
export class CalendarEventCreateMenuComponent {
  @HostBinding('class')
  public hostClasses: string = 'relative'

  public calendarEventCreateView: CalendarEventCreateView = 'menu';

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public switchView(view: CalendarEventCreateView): void {
    this.calendarEventCreateView = view;
    this.changeDetectorRef.markForCheck();
  }
}
