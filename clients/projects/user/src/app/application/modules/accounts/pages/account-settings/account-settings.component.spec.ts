import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AccountSettingsComponent } from './account-settings.component';
import { AccountUserCardComponent } from '../../components/account-user-card/account-user-card.component';
import { PageHeaderComponent } from '@sn/user/shared/components/page-header/page-header.component';

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;
  let router: Router;
  const testStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
  const testRoute = { 
    firstChild: { 
      snapshot: { url: [{ path: 'test' }] } 
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        TabsModule
      ],
      declarations: [
        AccountSettingsComponent,
        AccountUserCardComponent,
        PageHeaderComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        {
          provide: ActivatedRoute,
          useValue: testRoute
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
    component.ngAfterViewInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Router.navigateByUrl when navigateTo is called', () => {
    const testRouteSegment: string = 'test';
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    component.navigateTo(testRouteSegment);
    const navigateByUrlArg = navigateByUrlSpy.calls.first().args[0];
    
    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    expect(navigateByUrlArg).toContain(testRouteSegment);
  });
});