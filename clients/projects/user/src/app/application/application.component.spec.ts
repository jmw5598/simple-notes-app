import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { SharedModule } from '@sn/user/shared/shared.module';
import { ApplicationComponent } from './application.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavbarSideComponent } from './components/navigation/navbar-side/navbar-side.component'; 
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
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
        SharedModule,
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
