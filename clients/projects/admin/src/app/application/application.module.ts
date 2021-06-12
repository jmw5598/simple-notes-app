import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';

import { ApplicationRoutingModule } from './application-routing.module';
import { CoreFramingModule } from '@sn/core/framing';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    ApplicationComponent
  ],
  imports: [
    CoreFramingModule,
    ApplicationRoutingModule,
    CommonModule,
    TooltipModule.forRoot()
  ],
  providers:  [
    {
      provide: Window,
      useValue: window
    }
  ]
})
export class ApplicationModule { }
