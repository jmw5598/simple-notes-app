import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { logoutUser } from '@sn/auth/store/actions';
import { SharedModule } from '@sn/shared/shared.module';
import { of } from 'rxjs';

import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  const testStore = {
    select: (selector: any) => of(),
    dispatch: (action:any ) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule
      ],
      declarations: [
        LogoutComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    spyOn(testStore, 'dispatch');
    component.ngOnInit();
    jasmine.clock().tick(1000);
    expect(testStore.dispatch).toHaveBeenCalledWith(logoutUser());
  });
});
