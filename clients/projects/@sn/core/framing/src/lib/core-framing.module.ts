import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgIconsModule } from '@ng-icons/core';
import { heroBars4 } from '@ng-icons/heroicons/outline';

import { LayoutComponent } from './components/layout/layout.component';
import { LayoutService } from './components/layout/layout.service';

import { NavigationComponent } from './components/navigation/navigation.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { NavbarSideComponent } from './components/navigation/navbar-side/navbar-side.component';

import { OnDemandPreloadService } from './preloading-strategies/on-demand-preload.service';
import { OnDemandPreloadStrategy } from './preloading-strategies/on-demand-preload.strategy';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    NavbarSideComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgIconsModule.withIcons({ heroBars4 })
  ],
  providers: [
    
  ],
  exports: [
    LayoutComponent,
    NavbarSideComponent,
    NavbarComponent,
    NavigationComponent
  ]
})
export class CoreFramingModule {
  public static forRoot(): ModuleWithProviders<CoreFramingModule> {
    return {
      ngModule: CoreFramingModule,
      providers: [
        OnDemandPreloadService,
        {
          provide: OnDemandPreloadStrategy,
          useClass: OnDemandPreloadStrategy,
          deps: [OnDemandPreloadService]
        },
        LayoutService,
        {
          provide: Window,
          useValue: window
        }
      ]
    }
  }
}
