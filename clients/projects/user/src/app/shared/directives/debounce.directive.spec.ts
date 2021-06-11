import { skip, take } from 'rxjs/operators';
import { DebounceDirective } from './debounce.directive';

describe('DebounceDirective', () => {
  let directive: DebounceDirective;

  beforeEach(() => {
    jasmine.clock().install();
    directive = new DebounceDirective();
    directive.debounceTime = 0;
    directive.ngOnInit();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    directive.ngOnDestroy();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit value when emitChange is called', () => {
    const valueToEmit: string = 'Testing';
    spyOn(directive.onEvent, 'emit');
    directive.emitChange(valueToEmit);
    expect(directive.onEvent.emit).toHaveBeenCalledWith(valueToEmit);
  });

  it('should emit value when onKeyUp is called', () => {
    const mockKeyUpEvent = { target: { value: 'testing' } };
    directive.onEvent
      .pipe(take(1))
      .subscribe(value => {
        expect(value).toEqual(mockKeyUpEvent.target.value);
      });
    directive.onKeyUp(mockKeyUpEvent);
  });
});
