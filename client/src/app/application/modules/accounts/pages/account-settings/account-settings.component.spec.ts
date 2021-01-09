import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AccountSettingsComponent } from './account-settings.component';

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;
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
        AccountSettingsComponent
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
