import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { ApplicationComponent } from './application.component';
import { NavigationComponent, NavbarSideComponent, NavbarComponent } from '@sn/core/framing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('ApplicationComponent', () => {
  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;

  const testStore = {
    select(selector: any) { return of(null) },
    dispatch(action: any) { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        KeyboardShortcutsModule,
        NoopAnimationsModule
      ],
      declarations: [
        ApplicationComponent,
        NavigationComponent,
        NavbarSideComponent,
        NavbarComponent,
        ToolbarComponent
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
    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
