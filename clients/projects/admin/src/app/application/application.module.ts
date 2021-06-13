import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';

import { ApplicationRoutingModule } from './application-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { CoreFramingModule } from '@sn/core/framing';
import { SharedComponentsModule } from '@sn/shared/components';

@NgModule({
  declarations: [
    ApplicationComponent,
    ToolbarComponent
  ],
  imports: [
    CoreFramingModule,
    SharedComponentsModule,
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
