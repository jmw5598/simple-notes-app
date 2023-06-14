import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'sn-form-control-error,small[sn-form-control-error],div[sn-form-control-error],span[sn-form-control-error]',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss']
})
export class SnFormControlErrorComponent {
  @HostBinding('class')
  public hostClasses: string = `text-danger-500 text-xs ps-2 text-bold`;
}
