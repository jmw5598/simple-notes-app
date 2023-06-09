import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppLoadingComponent } from '@sn/user/auth/components/app-loading/app-loading.component';

import { LoggingInComponent } from './logging-in.component';

describe('LoggingInComponent', () => {
  let component: LoggingInComponent;
  let fixture: ComponentFixture<LoggingInComponent>;
  let routerMock = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
      ], 
      declarations: [
        LoggingInComponent,
        AppLoadingComponent
      ],
      providers: [
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggingInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch logoutUser action after timeout in ngOnInit', () => {
    component.ngOnInit();
    jasmine.clock().tick(500);
    expect(routerMock.navigate).toHaveBeenCalledTimes(1);
  });
});
