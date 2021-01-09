import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SharedModule } from '@sn/shared/shared.module';
import { of } from 'rxjs';

import { ConfigureKeyboardShortcutComponent } from './configure-keyboard-shortcut.component';

describe('ConfigureKeyboardShortcutComponent', () => {
  let component: ConfigureKeyboardShortcutComponent;
  let fixture: ComponentFixture<ConfigureKeyboardShortcutComponent>;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [
        ConfigureKeyboardShortcutComponent
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
    fixture = TestBed.createComponent(ConfigureKeyboardShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
