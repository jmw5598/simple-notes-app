import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@sn/shared/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'sn-calendar-event-add-modal',
  templateUrl: './calendar-event-add-modal.component.html',
  styleUrls: ['./calendar-event-add-modal.component.scss']
})
export class CalendarEventAddModalComponent implements OnInit {
  public form: FormGroup;
  public data$: Observable<any>;

  public startTime: any;
  public endTime: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _drawerService: DrawerService
  ) { }

  ngOnInit(): void {
    this.data$ = this._drawerService.onDataChange();
    this.form = this._formBuilder.group({
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  public hide(): void {
    this._drawerService.close()
  }
  
  public onSubmit(value: any): void {
    console.log(value);
  }
}
